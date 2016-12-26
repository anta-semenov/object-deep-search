export const find = (object, filter, options) => {
  const result = []

  if (matchObject(object, filter)) {
    result.push(object)
    return result
  }

  if (Array.isArray(object)) {
    object.forEach(item => {
      if (matchObject(item, filter)) {
        result.push(item)
      } else {
        result.push(...find(item, filter, options))
      }
    })
  } else if (isObject(object)) {
    Object.keys(object).forEach(key => {
      const item = object[key]
      if (matchObject(item, filter)) {
        result.push(item)
      } else {
        result.push(...find(item, filter, options))
      }
    })
  }

  return result
}

export const findFirst = (object, filter, options) => {
  let result
  if (matchObject(object, filter)) {
    return object
  }

  if (Array.isArray(object)) {
    object.every(item => {
      if (matchObject(item, filter)) {
        result = item
        return false
      } else {
        result = findFirst(item, filter, options)
        return result === undefined
      }
    })
  } else if (isObject(object)) {
    Object.keys(object).every(key => {
      const item = object[key]
      if (matchObject(item, filter)) {
        result = item
        return false
      } else {
        result = findFirst(item, filter, options)
        return result === undefined
      }
    })
  }

  return result
}

const matchObject = (object, needle) => {
  if (typeof needle === 'function') {
    return needle(object)
  }

  if (Array.isArray(needle) && Array.isArray(object)) {
    return needle.every(item => object.find(objectItem => matchObject(objectItem, item)) !== undefined)
  }

  if (isObject(needle) && isObject(object) && !Array.isArray(object)) {
    return Object.keys(needle).every(property => (
      object.hasOwnProperty(property) && matchObject(object[property], needle[property]))
    )
  }

  return object === needle
}

const isObject = value => typeof value === 'object' && value
