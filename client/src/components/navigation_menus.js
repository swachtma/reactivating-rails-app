import React from 'react'

import MenuBar from './menu_bar'
import SideBarPopout from './side_bar_popout'

export default function NavigationMenus (props) {
  const sideBarRef = React.createRef()

  const handleSidebarVisibility = (e) => {
    let tgl = sideBarRef.current.toggleVisibility;
    ['side-menu-button', 'side-menu-icon'].includes(e.target.id) ? tgl() : tgl(false)
  }

  return [
    <SideBarPopout ref={sideBarRef} {...props} key="sidebar" />,
    <MenuBar handleSidebarVisibility={handleSidebarVisibility} {...props} key="menubar" />
  ]
}
