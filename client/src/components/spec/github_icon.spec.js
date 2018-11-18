/* global expect, jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import config from '../../test_helper';
import GithubIcon from '../github_icon';

let test_props = {
  location: {
    pathname: '/chapter/15',
    type: 'CHAPTER_ROUTE',
    payload: {
      chapter_id: 15
    },
    prev: {
      pathname: '',
      type: '',
      payload: {}
    },
    kind: 'load',
    routesMap: {
      HOME_ROUTE: '/',
      CHAPTER_ROUTE: '/chapter/:chapter_id',
      AUTH_ROUTE: '/auth/:token/:bounce_path',
      ERROR_ROUTE: '/error'
    }
  }
};

let w = shallow(<GithubIcon {...test_props} />);

describe("<GithubIcon /> renders",()=>{
  it("according to snapshot", () => expect(w).toMatchSnapshot());
});