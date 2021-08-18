import { InferActionsTypes } from './redux-store'
import { getAuthUserData } from './auth-reducer'

let initialState = {
  initialized: false,
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/APP/INITIALIZED_SUCCES':
      return {
        ...state,
        initialized: true,
      }
    default:
      return state
  }
}

export const actions = {
  initializedSucces: () => ({ type: 'SN/APP/INITIALIZED_SUCCES' } as const),
}

export const initializeApp = () => (dispatch: any) => {
  const promise = dispatch(getAuthUserData())
  promise.then(() => {
    dispatch(actions.initializedSucces())
  })
}

export default appReducer
