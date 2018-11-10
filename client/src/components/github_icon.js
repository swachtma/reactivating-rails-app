import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { BASE_AUTH_PATH } from '../constants/settings';

const styles = {
  githubIcon: {marginRight: 0}
};

class GithubIcon extends Component {
  buildRedirect = (loc = this.props.location) => {
    let bounce_path = JSON.stringify({type: loc.type, payload: loc.payload});
    return encodeURIComponent(BASE_AUTH_PATH + "?bounce_path=" + bounce_path);
  }
  
  render() {
    let rd = this.buildRedirect();
    return (
      <Menu.Item 
        href={"https://github.com/login/oauth/authorize?client_id=a86bc65853ae65d3be52&redirect_uri=" + rd}
        name='Sign in with GitHub'
        fitted
      >
        <Icon name='github' style={styles.githubIcon} size="big" />
      </Menu.Item>
    );
  }
}

export default GithubIcon;