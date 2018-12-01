import React from 'react'
import { object, string, shape } from 'prop-types'
import { Menu, Icon } from 'semantic-ui-react'

import { BASE_AUTH_PATH } from '../constants/settings'

const styles = {
  githubIcon: { marginRight: 0 }
}

GithubIcon.propTypes = {
  location: shape({ type: string, payload: object })
}

export default function GithubIcon (props) {
  const { location } = props
  const base_path = 'https://github.com/login/oauth/authorize?client_id=81fc568e20ee9f3f7105&redirect_uri='
  const bounce_path = JSON.stringify({ type: location.type, payload: location.payload })
  const rd = encodeURIComponent(BASE_AUTH_PATH + '?bounce_path=' + bounce_path)

  return (
    <Menu.Item href={base_path + rd} name='Sign in with GitHub' fitted>
      <Icon name='github' style={styles.githubIcon} size="big" />
    </Menu.Item>
  )
}
