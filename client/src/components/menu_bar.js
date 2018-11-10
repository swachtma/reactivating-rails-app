import React, { Component } from 'react';
import { Container, Image, Menu, Icon, Responsive } from 'semantic-ui-react';
import rrLogo from '../assets/images/reactivating-rails.png';

import * as BREAKPOINTS from '../constants/breakpoints';
import ChapterMenuItems from './chapter_menu_items';
import { ConnectedUserBadge } from '../containers/user_provider';

const styles = {
  fixedMenuStyle: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
    paddingLeft: "1em",
    paddingRight: "1em",
    maxWidth: "100vw"
  },
  menuIcon: {margin: "0"},
  logo: {
    margin: "auto 1.5em", 
    maxWidth: "230px",
    verticalAlign: "middle"
  }
};

class MenuBar extends Component {
  render() {
    let { active_chapter, handleSidebarVisibility } = this.props;
    return (
        <Menu id="menu_bar" onClick={handleSidebarVisibility} size="huge" borderless fixed="top" style={ styles.fixedMenuStyle }>
          <Container>
            <Menu.Item id="sideMenuButton" link={true} fitted name='Main Menu'>
              <Icon id="sideMenuIcon" style={styles.menuIcon} color="black" name='content' size="large" />
            </Menu.Item>
              <Image fluid wrapped style={styles.logo} alt="Reactivating Rails" src={rrLogo} />
            <Menu.Menu position='right'value={active_chapter}>
              <Responsive {...BREAKPOINTS.aboveMobile } >
                <ChapterMenuItems {...this.props} />
              </Responsive>
              <ConnectedUserBadge handleSidebarVisibility={handleSidebarVisibility} />
            </Menu.Menu>
          </Container>
        </Menu>
    );
  }
}

export default MenuBar;