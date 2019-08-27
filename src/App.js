import React from 'react';

import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import ModulesAndLessons from './components/ModulesAndLessons';
import { DataProvider } from './context';

function App() {
  return (
    <DataProvider>
      <DndProvider backend={HTML5Backend}>
        <ModulesAndLessons />
      </DndProvider>
    </DataProvider>
  );
}

export default App;
