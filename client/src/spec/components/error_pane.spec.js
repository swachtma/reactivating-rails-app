/* global expect, jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import config from '../../test_helper';
import ErrorPane from '../../components/error_pane';

let w = shallow(<ErrorPane />);

describe("<ErrorPane /> renders",()=>{
  it("according to snapshot", () => expect(w).toMatchSnapshot());
});