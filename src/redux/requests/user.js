export const fetchUser = (userId) => {
    return (dispatch) => { // <-- faut utiliser redux-thunk qui te permet de return une fonction qui te fourni (dispatch, getState) sinon tu peux pas faire des actions avec des fonctions asynchrone (req)
      req('/api/user/' + userId)
      .then(user => {
        dispatch(setObject('user', user)) // <-- la j'appelle une autre action avec dispatch qui me met mon user dans mon state.objects.user
      })
      .catch(() => null)
    }
}

export const createUser = (signUpform) => {
    return (dispatch) => {
        req('/api/accounts/register/')
        // how to pass form?? 
        .catch(() => null) // display msg if error?
    }
}