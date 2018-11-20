import React from 'react'
import { shape, string, number, func, array } from 'prop-types'
import { Dropdown } from 'semantic-ui-react'

const styles = { dropdown: { margin: '0 1em' } }

ChapterMenuItems.propTypes = {
  active_chapter: shape({ id: number, title: string }),
  dispatchRouteChapter: func,
  handleSidebarVisibility: func,
  chapters: array
}

export default function ChapterMenuItems (props) {
  let { active_chapter, dispatchRouteChapter, handleSidebarVisibility, chapters } = props

  const renderChapterOptions = () => {
    return chapters.map((chapter) => ({
      key: 'chapter_' + chapter.id,
      id: 'chapter_menu_item_' + chapter.id,
      value: chapter.id,
      text: chapter.title,
      active: chapter.id === active_chapter.id
    }))
  }

  return (
    <Dropdown onFocus={handleSidebarVisibility}
      pointing="top right"
      tabIndex="1"
      placeholder="Jump to Chapter..."
      className="link item"
      style={styles.dropdown}
      selectOnNavigation={false}
      selectOnBlur={false}
      value={active_chapter.id}
      text={active_chapter.title}
      onChange={dispatchRouteChapter}
      options={renderChapterOptions()}
    />
  )
}
