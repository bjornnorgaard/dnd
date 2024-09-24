export function appendSign(n: number): string {
    return n > 0 ? `+${n}` : `${n}`;
}

export function convertAttributeScoreToModifier(score: number): string {
    const modifier = Math.floor((score - 10) / 2);
    return appendSign(modifier);
}

