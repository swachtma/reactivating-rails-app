import React from 'react'
import { shape, number, string } from 'prop-types'
import Link from 'redux-first-router-link'

import * as actions from '../actions/routes.js'

const styles = { chapter_footer_style: { margin: '30px 0', textAlign: 'center' } }

ChapterFooter.propTypes = {
  next_chapter: shape({ id: number, title: string })
}

export default function ChapterFooter (props) {
  let { next_chapter } = props

  return (
    <div id="chapter-footer-link" style={styles.chapter_footer_style}>
      <h2>
        {
          next_chapter
            ? <Link to={actions.routeChapter(next_chapter.id)}>Next - {next_chapter.title}</Link>
            : 'The End - Thank you for Reading!'
        }
      </h2>
    </div>
  )
}
