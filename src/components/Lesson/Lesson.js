import React from 'react'
import PropTypes from 'prop-types'
import { ReorderIcon, LessonIcon } from '../Icons'
import './Lesson.css';

const Lesson = ({ title }) => {
  return (
    <div className="Lesson">
      <div className="Wrapper--title">
        <LessonIcon />
        <h6 className="Title--lesson">{title}</h6>
      </div>
      <button onClick={() => {}} className="Wrapper--icon">
        <ReorderIcon className="Icon--centered" />
      </button>
    </div>
  )
}

PropTypes.propTypes = {
  title: PropTypes.string.isRequired
}

export default Lesson
