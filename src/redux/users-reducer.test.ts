import usersReducer, { actions, InitialStateType } from './users-reducer'

let state: InitialStateType

beforeEach(() => {
  state = {
    users: [
      { id: 0, name: 'Alexey', followed: false, status: 'status 0', photos: { small: null, large: null } },
      { id: 1, name: 'Alexey', followed: false, status: 'status 1', photos: { small: null, large: null } },
      { id: 2, name: 'Alexey', followed: true, status: 'status 2', photos: { small: null, large: null } },
      { id: 3, name: 'Alexey', followed: true, status: 'status 3', photos: { small: null, large: null } },
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
  }
})

test('users should be followed', () => {
  const newState = usersReducer(state, actions.followSuccess(1))

  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[1].followed).toBeTruthy()
})

test('users should be unfollowed', () => {
  const newState = usersReducer(state, actions.unfollowSuccess(3))

  expect(newState.users[2].followed).toBeTruthy()
  expect(newState.users[3].followed).toBeFalsy()
})
