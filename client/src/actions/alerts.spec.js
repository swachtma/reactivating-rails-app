/* global expect */
import * as actions from './alerts'

describe('Alerts actionCreators', () => {
  describe('addAlerts(message, level, scope)', () => {
    test('assigns defaults for scope and level', () => {
      let fsa = actions.addAlert('hello world')
      expect(fsa.payload.scope).toBeDefined()
      expect(fsa.payload.level).toBeDefined()
    })

    test('matches snapshot', () => {
      let snap = actions.addAlert('hello world')
      snap.payload.timestamp = 0
      expect(snap).toMatchSnapshot()
    })
  })

  describe('clearAlerts()', () => {
    test('matches snapshot', () => {
      expect(actions.clearAlerts()).toMatchSnapshot()
    })
  })
})
