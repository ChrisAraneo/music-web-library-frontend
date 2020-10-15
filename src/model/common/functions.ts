export const compareByProperty = (a: any, b: any, propName: string) => {
    if (typeof a === "object" && typeof b === "object") {
        const p1 = a[propName];
        const p2 = b[propName];
        if (p1 && p2) {
            if (p1 > p2) {
                return 1;
            } else if (p2 > p1) {
                return -1;
            } else {
                return 0;
            }
        }
    } else if (a === undefined && b !== undefined) {
        return -1;
    } else if (b === undefined && a !== undefined) {
        return 1;
    }
    return 0;
}