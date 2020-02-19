import _ from 'lodash'

const initialState = {
  auth: false,
  currentUser: {},
  error: null,
  profileStep: 'picture',
  location: {}
};

const objectsReducer = (state = initialState, action) => {
  const { objectName, object, type, listName, item, idField, data } = action
  let added, edited;
  switch(type) {

    case 'SET_OBJECT': {
      if (!_.isEqual(state[objectName], object)) {
        console.log('set_object', objectName);
        return {
          ...state,
          [objectName]: object
        }
      }
      break
    }
      
    case 'UPDATE_OBJECT': {
      if (state[objectName] && !_.isEqual(state[objectName], object)) {
        console.log('update_object', objectName);
        return {
          ...state,
          [objectName]: {
            ...state[objectName],
            ...object
          }
        }
      }
      break
    }
      
    case 'REMOVE_OBJECT': {
      console.log('remove_object: ', objectName);
      return {
        ...state,
        [objectName]: null
      }
    }
    
    case 'ADD_ITEM':
      edited = [...state[objectName][item]];
      edited.push(data);
      console.log(edited);
      return {
        ...state,
        [objectName] : {
          ...state[objectName],
          [item]: edited,
        }
      }

      case 'REMOVE_ITEM':
        edited = [...state[objectName][item]];
        let index;
        if (index = edited.indexOf(data) > -1)
          edited.splice(index, 1);
        return {
          ...state,
          [objectName] : {
            ...state[objectName],
            [item]: edited,
          }
        }

    default:
      return state
  }
  return state
}

export default objectsReducer