/* global expect */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

export default configure({ adapter: new Adapter() });

//helper method for the many prescence checks we want to perform
export const expectXInY = (e,w) => expect(w.find(e).exists()).toBe(true);