/* global expect, jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import config, { expectXInY } from '../../test_helper';
import AlertList from '../../components/alert_list';

let test_props = {
  scope: "application",
  alerts: [
    {
      message: "Sign out successful",
      level: "warning",
      scope: "application",
      timestamp: 1529324313949,
    },
    {
      message: "Cylons are among us",
      level: "danger",
      scope: "battlestar",
      timestamp: 1529324313939,
    }
  ]
};

describe("<AlertList /> renders",()=>{
  let w = shallow(<AlertList {...test_props} />);
  it("renders a list for the scope", () => expectXInY(".alert_list_"+test_props.scope,w));
  it("doesn't render alerts out of scope", ()=> { expect(w.find(".alert").length).toBe(1)});
  it("according to snapshot", () => expect(w).toMatchSnapshot());
});
