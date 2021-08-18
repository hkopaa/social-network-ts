import { InferActionsTypes } from './redux-store'

type DialogType = {
  id: number
  name: string
}
type MessageType = {
  id: number
  message: string
}

let initialState = {
  dialogs: [
    { id: 1, name: 'Vasya' },
    { id: 2, name: 'Petya' },
    { id: 3, name: 'Vanya' },
    { id: 4, name: 'Alesya' },
    { id: 5, name: 'Anya' },
    { id: 6, name: 'Kiril' },
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How are you?' },
    { id: 3, message: 'Yo' },
    { id: 4, message: 'Yo' },
    { id: 5, message: 'Yo' },
  ] as Array<MessageType>,
}

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SN/DIALOGS/SEND_MESSAGE':
      let body = action.newMessageBody
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: body }],
      }
    default:
      return state
  }
}

export const actions = {
  sendMessage: (newMessageBody: string) =>
    ({
      type: 'SN/DIALOGS/SEND_MESSAGE',
      newMessageBody,
    } as const),
}

export default dialogsReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
