import React, { Component } from 'react';
import { Menu, Sidebar, Icon } from 'semantic-ui-react';

import { ConnectedSidebarSignOut } from '../containers/user_provider';

const styles = {
  popoutLayer: {
    position: "fixed",
    top: "0px",
    left: "0px",
  },
  pusher: { minHeight: "100vh", minWidth: "100vw" },
  sideBar: { 
    minWidth: "320px",
    maxWidth: "320px",
    minHeight: "100vh",
    maxHeight: "100vh",
    padding: "45px 0 0 5px", 
    zIndex: 100
  }
};

class SideBarPopout extends Component {
  state = { visible: false };
  
  toggleVisibility = (bool) => {
    let vis = bool === undefined ? !this.state.visible : bool;
    this.setState({ visible: vis});
  };
  
  handleLink = (e,t) => {
    this.props.dispatchRouteChapter(e,t);
    this.toggleVisibility();
  };
  
  handleCloseClick = () => this.toggleVisibility();
  
  renderChapterLinks = () => {
    let { chapters, active_chapter } = this.props;
    return chapters.map((chapter)=>{
      let key = "chapter"+chapter.id;
      let status = chapter.id === active_chapter.id;
      return(
        <Menu.Item link={!status} onClick={this.handleLink} disabled={status}
        name={key} key={key} value={chapter.id}>
          {chapter.title}
        </Menu.Item>
      );
    });
  };
  
  render() {
    let { visible } = this.state;
    return (
      <div style={styles.popoutLayer} onBlur={this.handleBlur} id="sideBarPopout">
        <Sidebar.Pushable style={visible ? styles.pusher : null}>
          <Sidebar as={Menu} animation='overlay' width='wide' visible={visible} 
          style={styles.sideBar} inverted vertical>
            { this.renderChapterLinks() }
            <ConnectedSidebarSignOut handleCloseClick={this.handleCloseClick} />
            <Menu.Item link={true} onClick={this.handleCloseClick} name='Close Menu'>
              <div><Icon name='cancel' />Close Menu</div>
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher onClick={this.handleCloseClick} style={visible ? styles.pusher : null} dimmed />
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default SideBarPopout;