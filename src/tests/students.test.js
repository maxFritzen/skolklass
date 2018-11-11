import reducer from '../reducers/students';
import { CREATE_STUDENT, EDIT_STUDENT_CLASSID } from '../actions';

test('Should set up initialState', () => {
  const state = reducer(undefined, { type: '@@INIT'});
  expect(state).toEqual({});
});

test('Should add Student to database', () => {
  const student = {
    id: "123",
    fname: "Hej ",
    lname: "Tja",
    classId: "5b"
  };

  const action = {
      type: CREATE_STUDENT,
      id: student.id,
      student
  };

  const state = reducer(undefined, action);
  expect(state['123']).toEqual(student);
});

test('Should edit classId to Student', () => {
  const initialState = {
      "1" : {
        "id": "1",
        "fname": "Max",
        "lname": "Fritzén",
        "classId": "4a"
      }
  }

  const action = {
    type: EDIT_STUDENT_CLASSID,
    id: "1",
    classId: "5a"
  };
  const state = reducer(initialState, action);
  expect(state["1"].classId).toBe("5a");
});
