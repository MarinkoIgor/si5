import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

// Utils
import update from 'immutability-helper'

// Components
import DnDWrapper from '../DnDWrapper'
import { ModuleIcon, ArrowUpIcon, ArrowDownIcon, ReorderIcon } from '../Icons'
import Lesson from '../Lesson'

// Style
import './Module.css';

export const Module = ({title, lessons}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [sortedLessons, sortLessons] = useState(lessons)

  const toggleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen])

  const moveLesson = useCallback(
    (dragIndex, hoverIndex) => {
      const dragLesson = sortedLessons[dragIndex]
      sortLessons(
        update(sortedLessons, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragLesson]],
        }),
      )
    },
    [sortedLessons],
  )

  return (
    <div className="Wrapper--module">
      <div className={`Module ${isOpen && 'Modal--active'}`}>
        <div className="Wrapper--title">
          <ModuleIcon />
          <h5 className="Title--module">{title}</h5>
        </div>
        <div>
          <button onClick={() => {}} className="Wrapper--icon">
            <ReorderIcon className="Icon--centered" />
          </button>
          <button onClick={() => toggleOpen()} className="Wrapper--icon">
          {lessons && (
            isOpen ?
            <ArrowUpIcon className="Icon--centered" />
            :
            <ArrowDownIcon className="Icon--centered" />
          )}
          </button>
        </div>
      </div>
      {lessons && (
        <div className={!isOpen ? 'Hidden' : ''}>
          {
            sortedLessons &&
            sortedLessons.map(({id, ...rest}, i) =>
              <DnDWrapper
                key={id}
                id={id}
                index={i}
                moveCard={moveLesson}
                itemType="lesson"
              >
                <Lesson key={id} id={id} {...rest} />
              </DnDWrapper>
            )
          }
        </div>
      )}
    </div>
  )
}

Module.propTypes = {
  title: PropTypes.string.isRequired,
  lessons: PropTypes.array
}

Module.defaultProps = {
  lessons: []
}

export default Module
