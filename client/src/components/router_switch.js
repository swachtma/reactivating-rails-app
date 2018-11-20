import React from 'react'
import { shape, string } from 'prop-types'

import ReaderPane from './reader_pane'
import ErrorPane from './error_pane'
import * as routes from '../constants/settings'

RouterSwitch.propTypes = {
  location: shape({ type: string })
}

export default function RouterSwitch (props) {
  const { location } = props

  switch (location.type) {
    case (routes.ERROR_ROUTE):
      return (<ErrorPane />)
    case (routes.CHAPTER_ROUTE):
      return (<ReaderPane />)
    case (routes.HOME_ROUTE):
      return (<ReaderPane />)
    default:
      return (<ErrorPane />)
  }
}
