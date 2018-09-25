import { connect } from 'react-redux';
import NodesList from '../components/nodes_list';

const mapStateToProps = (state) => ({
  nodes: state.nodes
});

export default connect(
  mapStateToProps,
  null
)(NodesList);