import {
  createStudent,
  editStudentClassId,
  createClass,
  addStudentToClass,
  removeStudentFromClass } from '../actions';
import {
  CREATE_STUDENT,
  EDIT_STUDENT_CLASSID,
  CREATE_CLASS ,
  ADD_STUDENT_TO_CLASS,
  REMOVE_STUDENT_FROM_CLASS } from '../actions';

test('Should set up create student action object', () => {
  const student = {
    "id": "451",
    "fname": "Toe",
    "lname": "Krantz",
    "classId": null
  };
  const action = createStudent(student);
  expect(action).toEqual({
    type: CREATE_STUDENT,
    id: "451",
    student: {
      id: "451",
      fname: "Toe",
      lname: "Krantz",
      classId: null
    }
  });
});

test('Should set up edit student classId action object', () => {
  const action = editStudentClassId("1", null);
  expect(action).toEqual({
    type: EDIT_STUDENT_CLASSID,
    id: "1",
    classId: null
  });
});

test('Should set up create class action object', () => {
  const action = createClass("Class2");
  expect(action).toEqual({
    type: CREATE_CLASS,
    classId: "Class2"
  });
});

test('Should set up add student to class action object', () => {
  const action = addStudentToClass("Class1", "451");
  expect(action).toEqual({
    type: ADD_STUDENT_TO_CLASS,
    classId: "Class1",
    studentId: "451"
  });
});

test('Should set up remove student from class action object', () => {
  const action = removeStudentFromClass("Class1", "451");
  expect(action).toEqual({
    type: REMOVE_STUDENT_FROM_CLASS,
    classId: "Class1",
    studentId: "451"
  });
});
