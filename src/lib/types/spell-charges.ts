// Charge value explanation:
// -1: Not available
// 0: Used
// 1: Available
export interface SpellCharges {
    level: number;
    charges: number[];
}

export function defaultSpellCharges(): SpellCharges[] {
    return [
        { level: 1, charges: [ -1, -1, -1, -1 ] },
        { level: 2, charges: [ -1, -1, -1 ] },
        { level: 3, charges: [ -1, -1, -1 ] },
        { level: 4, charges: [ -1, -1, -1 ] },
        { level: 5, charges: [ -1, -1, -1 ] },
        { level: 6, charges: [ -1, -1 ] },
        { level: 7, charges: [ -1, -1 ] },
        { level: 8, charges: [ -1 ] },
        { level: 9, charges: [ -1 ] },
    ];
}
