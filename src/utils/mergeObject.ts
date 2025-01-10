/* eslint-disable @typescript-eslint/no-explicit-any */
export function merge<T extends Record<string, any>>(target: T, source: any) {
    const result = { ...source };

    for (const key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {

            if (result[key] === undefined || result[key] === null) {
                result[key] = target[key] as T[typeof key];
            }
        }
    }

    return result;
}