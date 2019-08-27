import React, { useState, useCallback, useEffect } from 'react'

// Utils
import update from 'immutability-helper'

// Contexts
import { useDataContext } from '../../context'

// Components
import DnDWrapper from '../DnDWrapper'
import Module from '../Module'
import { ArchivedIcon } from '../Icons'

// Style
import './ModulesAndLessons.css';

const ModulesAndLessons = () => {
  const { modules, pending, error, fetchData } = useDataContext()
  const [sortedModules, sortModules] = useState(modules)

  // Init data load
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Attach initial modules to the state
  useEffect(() => {
    sortModules(modules)
  }, [modules])

  // Reload data
  const [reloadData, setReload] = useState(false)
  useEffect(() => {
    if (reloadData) {
      fetchData()
      setReload(false)
    }
  }, [reloadData, fetchData])

  const moveModule = useCallback(
    (dragIndex, hoverIndex) => {
      const dragModule = sortedModules[dragIndex]
      sortModules(
        update(sortedModules, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragModule]],
        }),
      )
    },
    [sortedModules],
  )

  const reloadDataOnClick = useCallback(() => setReload(true), [])

  if (pending) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error</div>
  }

  if (sortedModules.length) {
    return (
      <div className="Wrapper--modules">
        <h3>Modules</h3>
        {sortedModules.map(({id, ...rest}, i) => {
          return(
            <DnDWrapper
              key={id}
              id={id}
              index={i}
              moveCard={moveModule}
              itemType="module"
            >
              <Module id={id} {...rest} />
            </DnDWrapper>
          )
        })}
        <div className="Wrapper__button--reload">
          <button onClick={reloadDataOnClick} className="Button--reload">
            Reload Content
            <ArchivedIcon className="Icon__button--reload"/>
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default ModulesAndLessons
