import FlexSearch from "flexsearch";
import { performance } from "node:perf_hooks";
import { join } from "path";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

console.log("Start building index");
const start = performance.now();

const index = new FlexSearch.Document({
    language: "en",
    document: {
        id: "name",
        store: true,
        index: [
            {field: "name", tokenize: "full"},
            {field: "entries", tokenize: "full"},
        ],
    },
});

const spellsLocation = join("src", "data", "spells");
const spellOverview = JSON.parse(readFileSync(join(spellsLocation, "index.json"), "utf-8"));
const files = Object.values(spellOverview);

files.forEach(file => {
    const now = performance.now();
    const filePath = join(spellsLocation, file);
    const fileData = JSON.parse(readFileSync(filePath, "utf-8"))
    fileData.spell.forEach((s, i) => {
        index.add(`spells/${s.source}/${i}`, s);
    });
    console.log("Added", fileData.spell.length, "spells from", file, "in", performance.now() - now, "ms");
})

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

console.log("Built and saved full index in", performance.now() - start, "ms");
