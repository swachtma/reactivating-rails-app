/* global expect */
import * as actions from './user'

let test_user = {
  avatar: 'https://avatars0.githubusercontent.com/u/shiba',
  github_email: 'awesome@wow.com',
  id: 9000,
  token: 'wow.much.secret',
  username: 'doge'
}

describe('User actionCreators', () => {
  test('setUser() assigns active user', () => {
    expect(actions.setUser(test_user)).toMatchSnapshot()
  })

  test('clearUser wipes user', () => {
    expect(actions.clearUser()).toMatchSnapshot()
  })
})
