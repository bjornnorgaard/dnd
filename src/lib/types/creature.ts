import { Class } from "$lib/constants/classes";
import { defaultSpellCharges, type SpellCharges } from "$lib/types/spell-charges";

export interface Creature {
    // Custom Fields
    id: string;
    is_player: number;
    current_hit_points: number;
    initiative: number;
    level: number;
    class: Class;
    spellCharges: SpellCharges[]

    // API Fields
    slug: string;
    desc: string;
    name: string;
    size: string;
    type: string;
    subtype: string;
    group: "";
    alignment: string;
    armor_class: number;
    armor_desc: string;
    hit_points: number;
    hit_dice: string;
    speed: Speed;

    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;

    strength_save: number;
    dexterity_save: number;
    constitution_save: number;
    intelligence_save: number;
    wisdom_save: number;
    charisma_save: number;

    perception: number;
    skills: Skills;

    damage_vulnerabilities: string;
    damage_resistances: string;
    damage_immunities: string;
    condition_immunities: string;

    senses: string;
    languages: string;
    challenge_rating: string;
    cr: number;

    actions: Action[];
    bonus_actions: any;
    reactions: Reaction[];
    legendary_desc: string;
    legendary_actions: LegendaryAction[];
    special_abilities: SpecialAbility[];
    spell_list: any[];

    page_no: number;
    environments: string[];
    img_main: string;
    document__slug: string;
    document__title: string;
    document__license_url: string;
    document__url: string;
}

export function defaultCreature(): Creature {
    return {
        id: "",
        is_player: 0,
        current_hit_points: 0,
        initiative: 0,
        level: 1,
        class: Class.Bard,
        spellCharges: defaultSpellCharges(),
        slug: "",
        desc: "",
        name: "",
        size: "",
        type: "",
        subtype: "",
        group: "",
        alignment: "",
        armor_class: 0,
        armor_desc: "",
        hit_points: 0,
        hit_dice: "",
        speed: {},
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
        strength_save: 0,
        dexterity_save: 0,
        constitution_save: 0,
        intelligence_save: 0,
        wisdom_save: 0,
        charisma_save: 0,
        perception: 0,
        skills: {},
        damage_vulnerabilities: "",
        damage_resistances: "",
        damage_immunities: "",
        condition_immunities: "",
        senses: "",
        languages: "",
        challenge_rating: "",
        cr: 0,
        actions: [],
        bonus_actions: {},
        reactions: [],
        legendary_desc: "",
        legendary_actions: [],
        special_abilities: [],
        spell_list: [],
        page_no: 0,
        environments: [],
        img_main: "",
        document__slug: "",
        document__title: "",
        document__license_url: "",
        document__url: "",
    };
}

export interface Speed {
    [speed: string]: number;
}

export interface Skills {
    [skill: string]: number;
}

export interface Reaction {
    name: string;
    desc: string;
}

export interface Action {
    name: string;
    desc: string;
    attack_bonus?: number;
    damage_dice?: string;
    damage_bonus?: number;
}

export interface LegendaryAction {
    name: string;
    desc: string;
}

export interface SpecialAbility {
    name: string;
    desc: string;
}
