export function setSingleObject<T>(state: T[], object: T, index: number): T[] {
    if (object instanceof Object) {
        if (state[index]) {
            state[index] = { ...state[index], ...object };
        } else {
            state[index] = { ...object };
        }
    }
    return [...state];
}

export function setMultipleObjects<T>(state: T[], array: T[], IDName: string): T[] {
    if (array instanceof Array) {
        array.forEach((object: any) => {
            const ID = object[IDName];
            if (ID) {
                if (state[ID]) {
                    state[ID] = { ...state[ID], ...object };
                } else {
                    state[ID] = { ...object };
                }
            }
        });
    }
    return [...state];
}

export function deleteSingleObject<T>(state: any[], ID: number): T[] {
    if (state[ID]) {
        delete state[ID];
    }
    return [...state];
}
