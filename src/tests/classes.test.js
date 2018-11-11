import reducer from '../reducers/classes';
import {
  CREATE_CLASS ,
  ADD_STUDENT_TO_CLASS,
  REMOVE_STUDENT_FROM_CLASS } from '../actions';

const initialState = {
      "class1": ["1"]
  }

test('Should set up initialState', () => {
  const state = reducer(undefined, { type: undefined});
  expect(state).toEqual({});
});

test('Should create class', () => {
  const action = {
    type: CREATE_CLASS,
    classId: "BestClass"
  }
  const state = reducer(initialState, action);
  expect(state["BestClass"]).toBeTruthy();
});

test('Should add Student ID to class', () => {
  const action = {
    type: ADD_STUDENT_TO_CLASS,
    classId: "class1",
    studentId: "123"
  };
  const state = reducer(initialState, action);
  const classId = state["class1"];
  expect(classId).toContain(action.studentId);
});

test('Should remove Student ID from class', () => {

  const action = {
    type: REMOVE_STUDENT_FROM_CLASS,
    classId: "class1",
    studentId: "1"
  };
  const state = reducer(initialState, action);
  const classId = state["class1"];
  expect(classId).not.toContain(action.studentId);
});
