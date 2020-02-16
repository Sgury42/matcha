import _ from 'lodash'

const initialState = {
  auth: false,
  currentUser: {},
  error: null,
  profileStep: 'picture',
};

const objectsReducer = (state = initialState, action) => {
  const { objectName, object, type } = action
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

    // case 'ALERT': {
    //   newState = {
    //     error: action.error,
    //   };
    //   return Object.assign({}, state, newState);
    // }

    default:
      return state
  }
  return state
}

export default objectsReducer