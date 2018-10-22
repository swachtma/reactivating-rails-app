/* global expect */
import { instantiateBook, checkBookHydration } from './instantiate_book';
import { cloneableGenerator } from 'redux-saga/utils';
import { select, all, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { loadNodes } from '../actions/nodes';
import { loadChapters } from '../actions/chapters';
import { addAlert } from '../actions/alerts';

describe("checkBookHydration", ()=> {
  const cases = [
    {state: {nodes: [], chapters: [] }, outcome: true},
    {state: {nodes: ["populated"], chapters: [] }, outcome: true},
    {state: {nodes: [], chapters: ["populated"] }, outcome: true},
    {state: {nodes: ["populated"], chapters: ["populated"] }, outcome: false}
  ];
  
  cases.forEach((test_case) => {
    test("provides expected outcome", () => {
      expect(checkBookHydration(test_case.state)).toEqual(test_case.outcome);
    });
  });
});

describe("instantiateBook", () => {
  var saga = {};
  saga.gen = cloneableGenerator(instantiateBook)();
  
  test("begins by checking hydration of book nodes/chapters",() => {
    expect(saga.gen.next().value).toMatchObject(select(checkBookHydration));
    saga.dehydrated = { gen: saga.gen.clone() };
    saga.hydrated = saga.gen.clone();
  });
  
  describe("BRANCH dehydration === false ", ()=> {
    test("ends saga",() => {
      expect(saga.hydrated.next(false).done).toEqual(true);
    });
  });
  
  describe("BRANCH dehydration === true", ()=> {
    test("begins /api/nodes && api/chapters requests", ()=> {
      expect(saga.dehydrated.gen.next(true).value).toEqual(
        all([
          call(axios.get,'/api/nodes'),
          call(axios.get,'/api/chapters')
        ])
      );
      
      saga.dehydrated = {
        red: saga.dehydrated.gen.clone(),
        green: saga.dehydrated.gen.clone()
      };
    });
    
    describe("BRANCH try/catch === green", () => {
      test("dispatches loadNodes and loadChapters with returned data", ()=> {
        let [nodes, chapters] = [
          {data: [{content: "Test node"}]},
          {data: [{title: "Test Chapter"}]}
        ];
        
        expect(saga.dehydrated.green.next(
          [nodes, chapters]).value
        ).toEqual(all([
          put(loadNodes(nodes.data)),
          put(loadChapters(chapters.data))
        ]));
      });
    });
    
    describe("BRANCH try/catch === red", () => {
      test("dispatches ADD_ALERT with message of failed load", () =>{
        let red_case = saga.dehydrated.red.next(new Error("awww shiiit."));
        expect(red_case.value.PUT.action.type).toEqual("ADD_ALERT");
      });
    });
  });
});