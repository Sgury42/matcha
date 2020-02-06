export const setObject = (objectName, object) => {
    return {
        type: 'SET_OBJECT',
        object,
        objectName
    }
}