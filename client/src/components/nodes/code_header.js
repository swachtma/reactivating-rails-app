import React, { Component } from 'react'
import { Responsive, Popup, Button, Icon } from 'semantic-ui-react'

import * as BREAKPOINTS from '../../constants/breakpoints'

const styles = {
  blockHeaderStyles: {
    borderBottom: '3px double #021a40',
    backgroundColor: '#021a40',
    color: '#fff',
    padding: '5px 10px 5px 20px'
  },
  filePath: {
    fontSize: '.9em',
    display: 'inline-block'
  },
  limitedTitle: {
    display: 'inline-block',
    width: '125px',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }
}

class CodeHeader extends Component {
  render () {
    let { block_path, collapseHandler, triggerRef } = this.props
    return (
      <div style={styles.blockHeaderStyles} ref={triggerRef}>
        <FilePath block_path={block_path} />
        <HeaderControlButton handler={() => collapseHandler(false)} icon="plus" label="Expand All" />
        <HeaderControlButton handler={() => collapseHandler(true)} icon="minus" label="Collapse All" />
        <HeaderControlButton icon="copy" label="Copy All" />
      </div>
    )
  }
}

export default CodeHeader

export class FilePath extends Component {
  constructor (props) {
    super(props)
    let path_segments = props.block_path.split('/')
    this.block_file = path_segments[path_segments.length - 1]
    this.block_path = this.props.block_path
  }

  render () {
    let { block_file, block_path } = this
    return (
      <div style={styles.filePath}>
        <Responsive as="span" {...BREAKPOINTS.onlyMobile}><span style={styles.limitedTitle}>{block_file}</span></Responsive>
        <Responsive as="span" {...BREAKPOINTS.aboveMobile}>{block_path}</Responsive>
      </div>
    )
  }
}

export class HeaderControlButton extends Component {
  state = { isOpen: false };

  handleOpen = (e) => {
    this.setState({ isOpen: true })
    if (e.type === 'click') this.handleTimeout()
  }

  handleTimeout = () => {
    this.timeout = setTimeout(() => {
      this.setState({ isOpen: false })
    }, 400)
  }

  handleClose = () => {
    this.setState({ isOpen: false })
    clearTimeout(this.timeout)
  }

  render () {
    let { handler, icon, label } = this.props
    return (
      <span onTouchStart={this.handleTimeout}>
        <Popup
          on={['click', 'hover']}
          open={this.state.isOpen}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          trigger={
            <Button className={icon} onClick={handler}
              icon size="mini" floated="right" color="grey">
              <Icon name={icon} />
            </Button>
          }
          position="bottom center" content={label}
        />
      </span>
    )
  }
}
