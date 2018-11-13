import React, { Component } from 'react';
import { array, shape, number, string, func } from 'prop-types';
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

export default class SideBarPopout extends Component {
  static propTypes = {
    chapters: array,
    active_chapter: shape({id: number, title: string}),
    dispatchRouteChapter: func
  }
  
  constructor(props){
    super(props);
    this.state = { visible: false };
  }
  
  toggleVisibility = (bool) => {
    let vis = bool === undefined ? !this.state.visible : bool;
    this.setState(()=>({ visible: vis}));
  };
  
  handleLink = (e,t) => {
    this.props.dispatchRouteChapter(e,t);
    this.toggleVisibility();
  };
  
  handleClose = () => this.toggleVisibility();
  
  render() {
    const {chapters, active_chapter} = this.props;
    let { visible } = this.state;
    
    const chapter_links = chapters.map((chapter) => {
      let status = chapter.id === active_chapter.id;
      let key = "chapter" + chapter.id;
      return <Menu.Item key={key} name={key} link={!status} onClick={!status ? this.handleLink : null}
      disabled={status} value={chapter.id} children={chapter.title} />;
    });
    
    return (
      <div style={styles.popoutLayer} onBlur={this.handleBlur} id="sideBarPopout">
        <Sidebar.Pushable style={visible ? styles.pusher : null}>
          <Sidebar as={Menu} animation='overlay' width='wide' visible={visible} 
          style={styles.sideBar} inverted vertical>
            { chapter_links }
            <ConnectedSidebarSignOut handleCloseClick={this.handleClose} />
            <Menu.Item link={true} onClick={this.handleClose} name='Close Menu'>
              <div><Icon name='cancel' />Close Menu</div>
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher onClick={this.handleClose} style={visible ? styles.pusher : null} dimmed />
        </Sidebar.Pushable>
      </div>
    );
  }
}