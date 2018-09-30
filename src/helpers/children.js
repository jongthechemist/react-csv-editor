//https://github.com/facebook/react/issues/9834#issuecomment-305650689

import React from 'react';

let typesAreEqual = (typeA, typeB) => typeA === typeB;

if (process.env.NODE_ENV !== 'production') {
  // workaround for proxies used by react-hot-loader
  typesAreEqual = (typeA, typeB) => typeA === typeB || typeA.name === typeB.name;
}

function getChildrenWithType(children, type) {
  let childrenWithType = [];
  React.Children.forEach(children, child => {
    if (child && typesAreEqual(type, child.type)) {
      childrenWithType.push(child);
    }
  });
  return childrenWithType;
}

function getChildWithType(children, type, strict = true) {
  let childrenWithType = getChildrenWithType(children, type);
  if (childrenWithType.length === 1) {
    return childrenWithType[0];
  }
  else if (strict) {
    throw new Error('getChildWithType ' + type + ' had child count: ' + childrenWithType.length);
  }
  else {
    return null;
  }
}

export {
  getChildrenWithType,
  getChildWithType
}
