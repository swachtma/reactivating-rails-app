import React, { Component } from 'react';

import MenuBar from './menu_bar';
import SideBarPopout from './side_bar_popout';

class NavigationMenus extends Component {
  constructor(props){
    super(props);
    this.sideBarRef = React.createRef();
  }
  
  handleSidebarVisibility = (e,t) => {
    let tgl = this.sideBarRef.current.toggleVisibility;
    ["sideMenuIcon","sideMenuButton"].includes(e.target.id) ? tgl() : tgl(false);
  };
  
  render() {
    return [
        <SideBarPopout ref={this.sideBarRef} {...this.props} key="sidebar" />,
        <MenuBar handleSidebarVisibility={this.handleSidebarVisibility} {...this.props} key="menubar" />
    ];
  }
}

export default NavigationMenus;