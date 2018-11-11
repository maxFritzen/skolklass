import {
  CREATE_CLASS ,
  ADD_STUDENT_TO_CLASS,
  REMOVE_STUDENT_FROM_CLASS,
  FETCH_CLASSES
 } from '../actions';

export default (state = {}, action) => {

  switch (action.type) {

    case CREATE_CLASS:
      return {
        ...state,
        [action.classId]: []
      };

    case ADD_STUDENT_TO_CLASS:
    const oldClass = state[action.classId];
      return {
        ...state,
      [action.classId]: [...oldClass, action.studentId]
      };
    // case ADD_STUDENT_TO_CLASS:
    // const oldClass = state[action.classId];
    //   return {
    //     ...state,
    //   [action.classId]: {
    //     ...oldClass,
    //     [action.studentId] : action.studentId
    //   }
    //   //[action.classId]: {}...arr, action.studentId]
    //   };

    case REMOVE_STUDENT_FROM_CLASS:
      const filteredArray = state[action.classId].filter(id => id != action.studentId);
      return {
        ...state,
        [action.classId]: filteredArray
      };

    case FETCH_CLASSES:
      return action.classes

    default: return state;
  }
}
