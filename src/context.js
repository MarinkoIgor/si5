import React, { useContext } from 'react'
import { useData } from './hooks/useData'

const DataContext = React.createContext(null);

export const initialState = {
  pending: false,
  error: null,
  modules: [],
}

export const DataProvider = props => {
  const dataProps = useData()
  return (
    <DataContext.Provider value={{...dataProps}}>
      {props.children}
    </DataContext.Provider>
  )
}

export const useDataContext = () => useContext(DataContext);
export default DataContext;
