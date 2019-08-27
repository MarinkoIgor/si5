import { useCallback, useReducer, useMemo } from 'react'

import { initialState } from '../context'

import dataReducer from '../dataReducer'
import {
  FETCH_DATA_PENDING,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILED
} from '../constants'

export const useData = () => {
  const [state, dispatch] = useReducer(dataReducer, initialState)

  const fetchData = useCallback(() => {
    dispatch({
      type: FETCH_DATA_PENDING,
    })

    fetch(
      'https://sifivelearn-production.s3-us-west-1.amazonaws.com/samples/fe-developer.json ',
      { method: 'GET'}
    )
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: FETCH_DATA_SUCCESS,
          payload: data
        })
      })
      .catch(error => {
        dispatch({
          type: FETCH_DATA_FAILED,
          payload: error
        })
      });
  }, [dispatch])

  const modules = useMemo(() => state.modules, [state.modules])
  const pending = useMemo(() => state.pending, [state.pending])
  const error = useMemo(() => state.error, [state.error])

  return {
    modules,
    pending,
    error,
    fetchData
  }
}

export default useData
