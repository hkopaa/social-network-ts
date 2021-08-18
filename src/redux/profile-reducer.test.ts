import profileReducer, { actions } from './profile-reducer'

let state = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 23 },
  ],
  profile: null,
  status: '',
  newPostText: '',
}

test('length of posts should be incremented', () => {
  // 1. test data
  let action = actions.addPostActionCreator('it-incubator.by')

  // 2. action
  let newState = profileReducer(state, action)

  // 3. expectations
  expect(newState.posts.length).toBe(3)
})

test('message of new post should be correct', () => {
  // 1. test data
  let action = actions.addPostActionCreator('it-incubator.by')

  // 2. action
  let newState = profileReducer(state, action)

  // 3. expectations
  expect(newState.posts[2].message).toBe('it-incubator.by')
})

test('after deleting length of messages should be decrement', () => {
  // 1. test data
  let action = actions.deletePost(1)

  // 2. action
  let newState = profileReducer(state, action)

  // 3. expectations
  expect(newState.posts.length).toBe(1)
})
