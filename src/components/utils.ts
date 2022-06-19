export const cloneDeep = (obj: Record<string | number | symbol, any> | Array<any>) => {
    let objClone: Record<string | number | symbol, any> | Array<any> = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === "object") {
                    objClone[key] = cloneDeep(obj[key]);
                } else {
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}
