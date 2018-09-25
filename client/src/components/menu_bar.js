import React, { Component } from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';
import rrLogo from '../assets/images/reactivating-rails.png';
import ChapterMenuItems from '../containers/chapter_menu_items';

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
  paddingTop: "8px",
  paddingBottom: "8px"
};

class MenuBar extends Component {
  render() {
    return (
        <Menu borderless stackable fixed="top" style={ fixedMenuStyle }>
          <Container>
            <Menu.Item><Image width='200' src={rrLogo} /></Menu.Item>

            <Menu.Menu position='right'>
              <ChapterMenuItems />
            </Menu.Menu>
          </Container>
        </Menu>
    );
  }
}

export default MenuBar;