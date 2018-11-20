/* global hljs */
import React, { Component } from 'react'
import { array, string } from 'prop-types'

class CodeFull extends Component {
  static propTypes = {
    section_id: string.isRequired,
    contents: array.isRequired,
    block_type: string.isRequired
  }

  componentDidMount () {
    hljs.highlightBlock(document.getElementById(this.props.section_id + '_full'))
  }

  render () {
    let { section_id, contents, block_type } = this.props
    return (
      <code id={section_id + '_full'}>
        <pre className={block_type}>{contents.join('\n')}</pre>
      </code>
    )
  }
}

export default CodeFull
