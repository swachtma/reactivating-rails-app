import { connect } from 'react-redux';
import NodesList from '../components/nodes_list';

const filtered_nodes = (nodes, chapter) => {
  return nodes.filter((node) => { return node.chapter_id === chapter });
};

const mapStateToProps = (state) => ({
  nodes: filtered_nodes(state.nodes, state.settings.active_chapter_id)
});

export default connect(
  mapStateToProps,
  null
)(NodesList);