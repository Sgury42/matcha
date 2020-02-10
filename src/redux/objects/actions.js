export const setObject = (objectName, object) => {
    return {
        type: 'SET_OBJECT',
        object,
        objectName
    }
}
export const updateObject = (objectName, object) => {
  return {
    type: 'UPDATE_OBJECT',
    object,
    objectName
  }
}
export const deleteObject = (objectName) => {
  return {
    type: 'REMOVE_OBJECT',
    objectName
  }
}