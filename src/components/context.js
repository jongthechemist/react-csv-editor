import React from 'react';

const EditorContext = React.createContext({
  onValueChanged: () => {},
  validate: () => {}
});

export default EditorContext;