import React from 'react'
import { string, func } from 'prop-types'
import { Menu, Icon } from 'semantic-ui-react'

const styles = { signout: { color: '#cc0000' } }

SideBarSignout.propTypes = {
  username: string,
  handleCloseClick: func,
  dispatchSignalSignout: func
}

export default function SideBarSignout (props) {
  let { username, handleCloseClick, dispatchSignalSignout } = props

  const handleSignout = () => {
    handleCloseClick()
    dispatchSignalSignout()
  }

  return username
    ? <Menu.Item link={true} onClick={handleSignout} name='Sign Out'>
      <div style={styles.signout}><Icon name='cancel' />Sign Out</div>
    </Menu.Item> : null
}
