import { CREATE_STUDENT, EDIT_STUDENT_CLASSID, FETCH_STUDENTS } from '../actions';


export default (state = {}, action) => {

  switch (action.type) {
    case CREATE_STUDENT:
      return {
        ...state,
        [action.id]: action.student
      };

    case EDIT_STUDENT_CLASSID:
    const student = state[action.id];
      return {
        ...state,
        [action.id]: {
          ...student,
          "classId" : action.classId
        }
      };

    case FETCH_STUDENTS:
      return action.students;

    default: return state;
  }
}
