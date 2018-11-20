import React, { Component } from 'react'

export const parseBlockOpen = (first_line) => {
  if (fenceLine(first_line)) {
    return first_line.replace(
      /^(```\s?)([^()]*)?(\((.*)\))?\s*$/, ['$2', '$4']
    ).split(',')
  } else {
    return [undefined, undefined]
  }
}

export const fenceLine = (line) => line.match(/^```/)

export const getContentLines = (lines) =>
  fenceLine(lines[0]) ? lines.slice(1, lines.length - 2) : lines

export const divideSections = (block_contents) => {
  let remaining_lines = block_contents
  let block_sections = []
  let working_section

  while (remaining_lines.length !== 0) {
    let line = remaining_lines.shift()
    let clean_line = filterFlag(line)

    if (!working_section) {
      working_section = { priority: getSectionPriority(line) }
      working_section.content = [clean_line]
    } else {
      if (line[0] && line[0].match(flagMap[working_section.priority])) {
        working_section.content.push(clean_line)
      } else {
        remaining_lines.unshift(line)
        block_sections.push(working_section)
        working_section = null
      }
    }
  }

  if (working_section) { block_sections.push(working_section) }
  return block_sections
}

export const filterFlag = (line) => {
  return line.replace(/^([+-]\s)?(.*)$/, '$2')
}

export const flagMap = {
  high: /\+[ ]/,
  low: /-[ ]/,
  normal: /[^+-]/
}

export const getSectionPriority = (line) => {
  switch (line[0]) {
    case ('+'):
      return 'high'
    case ('-'):
      return 'low'
    default:
      return 'normal'
  }
}

const parseCodeNode = (node) => {
  let all_lines = node.content.split('\n')
  let content_lines = getContentLines(all_lines)
  let [block_type, block_path] = parseBlockOpen(all_lines[0])

  let passthroughProps = {
    node_id: node.id,
    block_type: block_type,
    block_path: block_path,
    block_sections: divideSections(content_lines)
  }

  return class extends Component {
    render () {
      return <CodeBlock { ...passthroughProps } />
    }
  }
}

export default parseCodeNode

class CodeBlock extends Component {
  render () {
    return <div>HEY LISTEN! { JSON.stringify(this.props) }</div>
  }
}
