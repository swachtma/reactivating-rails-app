import React from 'react';
import { shape, string, number, func } from 'prop-types';
import { Container, Image, Menu, Icon, Responsive } from 'semantic-ui-react';

import rrLogo from '../assets/images/reactivating-rails.png';import * as BREAKPOINTS from '../constants/breakpoints';
import ChapterMenuItems from './chapter_menu_items';
import { ConnectedUserBadge } from '../containers/user_provider';

const styles = {
  fixedMenuStyle: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
    paddingLeft: "1em",
    paddingRight: "1em",
    maxWidth: "100vw" // new code
  },
  menuIcon: {margin: "0"},
  logo: {
    margin: "auto 1.5em", 
    maxWidth: "230px",
    verticalAlign: "middle"
  }
};

MenuBar.propTypes = {
  active_chapter: shape({id: number, title: string}),
  handleSidebarVisibility: func,
};

export default function MenuBar(props){
  let { active_chapter, handleSidebarVisibility } = props;
  return (
    <Menu id="menu-bar" onClick={handleSidebarVisibility} size="huge" borderless fixed="top" style={ styles.fixedMenuStyle }>
      <Container>
        <Menu.Item id="side-menu-button" link={true} fitted name='Main Menu'>
          <Icon id="side-menu-icon" style={styles.menuIcon} color="black" name='content' size="large" />
        </Menu.Item>
          <Image fluid wrapped style={styles.logo} alt="Reactivating Rails" src={rrLogo} />
        <Menu.Menu position='right' value={active_chapter}>
          <Responsive {...BREAKPOINTS.aboveMobile } >
            <ChapterMenuItems {...props} />
          </Responsive>
          <ConnectedUserBadge handleSidebarVisibility={handleSidebarVisibility} />
        </Menu.Menu>
      </Container>
    </Menu>
  );
}