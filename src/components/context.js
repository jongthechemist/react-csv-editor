import React from 'react';

const EditorContext = React.createContext({
  onValueChanged: () => {}
});

export default EditorContext;