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

export const addItem = (objectName, item, data) => {
  return {
    type: 'ADD_ITEM',
    item,
    objectName, 
    data
  }
}

export const removeItem = (objectName, item, data) => {
  return {
    type: 'REMOVE_ITEM',
    item, objectName,
    data
  }
}