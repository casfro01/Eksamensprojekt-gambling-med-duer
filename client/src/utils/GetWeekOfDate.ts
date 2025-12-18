export function getWeekOfDate(year: number, month: number, day: number): number {
    const a = (14 - month) / 12;
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    const JD = day + (153 * m + 2)/5 + 365*y + y/4 - y/100 + y/400 - 32045;
    const d4 = (((JD + 31741 - JD % 7) % 146097) % 36524) % 1461;
    const L = d4 / 1460;
    const d1 = ((d4 - L) % 365) + L;
    return parseInt("" + (d1 / 7 + 1)) as number;
}