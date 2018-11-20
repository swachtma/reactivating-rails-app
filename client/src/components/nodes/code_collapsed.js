/* global hljs */
import React, { Component } from 'react'
import { array, string } from 'prop-types'

class CodeCollapsed extends Component {
  static propTypes = {
    section_id: string.isRequired,
    contents: array.isRequired,
    block_type: string.isRequired
  }

  componentDidMount () {
    hljs.highlightBlock(document.getElementById(this.props.section_id + '_collapsed'))
  }

  render () {
    let { contents, section_id, block_type } = this.props
    return (
      <code id={section_id + '_collapsed'}>
        <pre className={block_type}>
          <div>
            {contents[0]}
            <i className="fa fa-arrows-h" aria-hidden="true"></i>
            {contents[contents.length - 1].trim()}
          </div>
        </pre>
      </code>
    )
  }
}

export default CodeCollapsed
