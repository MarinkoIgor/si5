import {
  FETCH_DATA_PENDING,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILED
} from './constants'

export default (state, action) => {
  const { type, payload } = action
  switch (type) {
  case FETCH_DATA_PENDING:
    return {
      ...state,
      pending: true,
      error: null,
    }
  case FETCH_DATA_SUCCESS:
    return {
      ...state,
      pending: false,
      error: null,
      modules: payload.modules
    }
  case FETCH_DATA_FAILED:
    return {
      ...state,
      pending: false,
      error: payload
    }
    default:
      return state
  }
}
