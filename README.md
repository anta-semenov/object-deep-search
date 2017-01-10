[![NPM version](https://img.shields.io/npm/v/object-deep-search.svg?style=flat-square)](http://badge.fury.io/js/object-deep-search)

# object-deep-search

Search through object properties recursively with a complex filter. Inspired by [jscodeshift](https://github.com/facebook/jscodeshift/wiki/jscodeshift-Documentation) find method.
It was created to help in testing react components with [Jest](https://facebook.github.io/jest/) and [react-test-renderer](https://www.npmjs.com/package/react-test-renderer), but can be used anywhere.

## Help

There are two main functions:

##### find(object, filter)
Return array properties of object that match the filter.

##### findFirst(object, filter)
Return first property of object that match the filter.


#### Arguments
* *Object* - object to recursively search through.


* *Filter* - object that defines structure (keys and values) to search. If property of object has all keys that filter has (property can also contain other keys) and this keys has the same values, the property will be returned as matched.

  In case if filter key is Array (see children in examples). Value of object property should have all items that filter value has.


#### Examples

Main reason for creating this package was to help with react testing. React-test-renderer renders React components to pure JavaScript objects. And if we need to simulate click on button we should find this button in component tree.

```js
import {findFirst} from 'deep-object-search'
...

const component = renderer.create(<TestComponent/>)
const tree = component.toJSON()

//define filter
const filter = {
  type: 'button',
  props: {
    className: 'my-button-classname',
    children: ['Submit']
  }
}

//Simulate button onClick method
findFirst(tree, filter).props.onClick()
```
