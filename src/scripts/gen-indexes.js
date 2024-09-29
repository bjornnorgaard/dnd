import FlexSearch from "flexsearch";
import { performance } from "node:perf_hooks";
import { join } from "path";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const dataLocation = join("src", "data");

console.log("Building index");
const now = performance.now();
let index = createDocumentIndex();
index = addSpells(index);
index = addBeasts(index);
await exportDocumentIndex(index);
console.log("Built index in", performance.now() - now, "ms");

/**
 * @returns {FlexSearch.Document<unknown, boolean>}
 */
function createDocumentIndex() {
    return new FlexSearch.Document({
        language: "en",
        document: {
            id: "name",
            store: true,
            index: [
                {field: "name", tokenize: "full"},
            ],
        },
    });
}

/**
 * @param {FlexSearch.Document<any, true>} index
 * @returns {FlexSearch.Document<any, true>}
 */
function addSpells(index) {
    const start = performance.now();

    const spellsLocation = join(dataLocation, "spells");
    const spellOverview = JSON.parse(readFileSync(join(spellsLocation, "index.json"), "utf-8"));
    const files = Object.values(spellOverview);

    files.forEach(file => {
        const filePath = join(spellsLocation, file);
        const fileData = JSON.parse(readFileSync(filePath, "utf-8"))
        fileData.spell.forEach((/** @type {{ source: any; }} */ s, /** @type {any} */ i) => {
            index.add(`spells/${s.source}/${i}`, s);
        });
    })

    console.log("Built spell index in", performance.now() - start, "ms");
    return index;
}

/**
 * @param {FlexSearch.Document<unknown, boolean>} index
 */
function addBeasts(index) {
    const start = performance.now();

    const beastsLocation = join(dataLocation, "bestiary");
    const beastOverview = JSON.parse(readFileSync(join(beastsLocation, "index.json"), "utf-8"));
    const files = Object.values(beastOverview);

    files.forEach(file => {
        const filePath = join(beastsLocation, file);
        const fileData = JSON.parse(readFileSync(filePath, "utf-8"))
        fileData.monster.forEach((/** @type {{ source: any; }} */ s, /** @type {any} */ i) => {
            index.add(`bestiary/${s.source}/${i}`, s);
        });
    })

    console.log("Built bestiary index in", performance.now() - start, "ms");
    return index;
}

/**
 * @param {{ export: (arg0: (k: any, v: any) => void) => any; }} index
 */
async function exportDocumentIndex(index) {
    const start = performance.now();

    const exportMap = new Map();
    await index.export(function (k, v) {
        exportMap.set(k, v)
    })

    const exportObject = Object.fromEntries(exportMap);
    const exportJson = JSON.stringify(exportObject);

    const outputDir = join("src", "indexes");
    const outputFile = join(outputDir, "full.json");

    mkdirSync(outputDir, {recursive: true});
    writeFileSync(outputFile, exportJson);

    console.log("Exported document index in", performance.now() - start, "ms");
}
