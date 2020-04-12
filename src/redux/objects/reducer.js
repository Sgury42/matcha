import _ from 'lodash'

const initialState = {
  auth: false,
  alert: null,
  profileStep: 'picture',
  location: {},
  index: 0,
  notifications: [],
};

const objectsReducer = (state = initialState, action) => {
  const { objectName, object, type, item, data, index } = action
  let edited;
  switch(type) {

    case 'RESET_APP': {
      return initialState;
    }

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
    
    case 'ADD_ITEM': {
      edited = [...state[objectName][item]];
      edited.push(data);
      return {
        ...state,
        [objectName] : {
          ...state[objectName],
          [item]: edited,
        }
      }
    }

      case 'REMOVE_ITEM': {
        edited = [...state[objectName][item]];
        let index = edited.indexOf(data);
        if (index > -1) {
          edited.splice(index, 1);
        }
        return {
          ...state,
          [objectName] : {
            ...state[objectName],
            [item]: edited,
          }
        }
      }

      case 'REMOVE_LIKED': {
        let newCibles = [...state[objectName]];
        newCibles.splice(index, 1);
        return {
          ...state,
          [objectName] : newCibles
        }
      }

    default:
      return state
  }
  return state
}

export default objectsReducer