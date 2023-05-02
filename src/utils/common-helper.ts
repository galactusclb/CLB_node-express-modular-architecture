export const excludeProperties = <T>(obj: T, excludedProperties: (keyof T)[]): Omit<T, keyof typeof excludedProperties[number]> => {
    const newObj = {} as T;
    for (const key in obj) {
        if (!excludedProperties.includes(key as keyof T)) {
            newObj[key as keyof T] = obj[key as keyof T];
        }
    }
    return newObj;
}