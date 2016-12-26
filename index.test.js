/*global jest describe it expect*/
import {find, findFirst} from './index'

describe('find', () => {
  const object = {
    prop1: {
      prop11: {prop111: 1, prop112: 67},
      prop12: [
        {prop121: 78, prop122: 12},
        {prop121: 12, prop122: 78},
        {prop121: 13, prop122: 78}
      ]
    },
    prop2: {
      prop21: {
        prop211: [
          {prop111: 13, prop112: 67},
          {prop111: 13, prop112: 60},
          {prop211: 13, prop112: 67, prop213: [1, 2]}
        ]
      }
    }
  }

  it('Find object that comply simple filter', () => {
    const filter = {prop111: 1}
    expect(find(object, filter)).toEqual([{prop111: 1, prop112: 67}])
  })

  it('Find object that comply complicated filter', () => {
    const filter = {prop11: {prop112: 67}}
    expect(find(object, filter)).toEqual([{
      prop11: {prop111: 1, prop112: 67},
      prop12: [
        {prop121: 78, prop122: 12},
        {prop121: 12, prop122: 78},
        {prop121: 13, prop122: 78}
      ]
    }])
  })

  it('Find objects all objects that comply filter', () => {
    const filter = {prop112: 67}
    expect(find(object, filter)).toEqual([
      {prop111: 1, prop112: 67},
      {prop111: 13, prop112: 67},
      {prop211: 13, prop112: 67, prop213: [1, 2]}
    ])
  })

  it('Find object with search through array properties', () => {
    const filter = {prop12: [{prop122: 12}]}
    expect(find(object, filter)).toEqual([{
      prop11: {prop111: 1, prop112: 67},
      prop12: [
        {prop121: 78, prop122: 12},
        {prop121: 12, prop122: 78},
        {prop121: 13, prop122: 78}
      ]
    }])
  })
})

describe('findFirst', () => {
  const object = {
    prop1: {
      prop11: {prop111: 1, prop112: 67},
      prop12: [
        {prop121: 78, prop122: 12},
        {prop121: 12, prop122: 78},
        {prop121: 13, prop122: 78}
      ]
    },
    prop2: {
      prop21: {
        prop211: [
          {prop111: 13, prop112: 67},
          {prop111: 13, prop112: 60},
          {prop211: 13, prop112: 67, prop213: [1, 2]}
        ]
      }
    }
  }

  it('Find object that comply simple filter', () => {
    const filter = {prop111: 1}
    expect(findFirst(object, filter)).toEqual({prop111: 1, prop112: 67})
  })

  it('Find object that comply complicated filter', () => {
    const filter = {prop11: {prop112: 67}}
    expect(findFirst(object, filter)).toEqual({
      prop11: {prop111: 1, prop112: 67},
      prop12: [
        {prop121: 78, prop122: 12},
        {prop121: 12, prop122: 78},
        {prop121: 13, prop122: 78}
      ]
    })
  })

  it('Find only first object that comply filter', () => {
    const filter = {prop112: 67}
    expect(findFirst(object, filter)).toEqual({prop111: 1, prop112: 67})
  })

  it('Find object with search through array properties', () => {
    const filter = {prop12: [{prop122: 12}]}
    expect(findFirst(object, filter)).toEqual({
      prop11: {prop111: 1, prop112: 67},
      prop12: [
        {prop121: 78, prop122: 12},
        {prop121: 12, prop122: 78},
        {prop121: 13, prop122: 78}
      ]
    })
  })
})
