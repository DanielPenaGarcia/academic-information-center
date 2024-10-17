export function innerStringParser(innerQueries) {
    let innerString = '';
    if (innerQueries.length === 0) {
        return '';
    }
    innerQueries.forEach((innerQuery) => {
        innerString += ` ${innerQuery.toString()} `;
    });
    return innerString;
}