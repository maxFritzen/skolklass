import { database } from '../firebase/firebase';

export const CREATE_STUDENT ='CREATE_STUDENT';
export const EDIT_STUDENT_CLASSID ='EDIT_STUDENT_CLASSID';

export const CREATE_CLASS ='CREATE_CLASS';
export const ADD_STUDENT_TO_CLASS ='ADD_STUDENT_TO_CLASS';
export const REMOVE_STUDENT_FROM_CLASS ='REMOVE_STUDENT_FROM_CLASS';

export const FETCH_STUDENTS ='FETCH_STUDENTS';
export const FETCH_CLASSES ='FETCH_CLASSES';

export const fetchClasses = () => {
  const classes = {};
  return (dispatch) => database.ref('classes').once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const classId = childSnapshot.key;
      const classData = [];

      childSnapshot.forEach((val) => {
        classData.push(val.val());
      });
      classes[classId] = classData;
    });

    return dispatch({
      type: FETCH_CLASSES,
      classes: classes
    });
  });

}

export const fetchStudents = () => {
  return (dispatch) => database.ref().once('value', (snapshot) => {
    if (snapshot.val().students) {
      dispatch({
        type: FETCH_STUDENTS,
        students: snapshot.val().students || {}
      });
    }
  });
};

export const createStudent = (student) => {
  return {
    type: CREATE_STUDENT,
    id: student.id,
    student
  }
};

export const startCreateStudent = (student) => {
  return (dispatch) => {
    return database.ref(`students/${student.id}`).set(student).then(() => {
      return dispatch(createStudent(student));
    });
  }
};

export const editStudentClassId = (id, classId) => {
  return {
    type: EDIT_STUDENT_CLASSID,
    id,
    classId
  }
};

export const startEditStudentClassId = (id, classId) => {
  return (dispatch) => {
    return database.ref(`students/${id}`).update({classId: classId}).then(() => {
      return dispatch(editStudentClassId(id, classId));
    });
  }
};

export const createClass = (classId) => {
  return {
    type: CREATE_CLASS,
    classId
  }
};

export const startCreateClass = (classId) => {
  return (dispatch) => {
    return database.ref(`classes/${classId}`).set([0]).then(() => {
      return dispatch(createClass(classId));
    });
  }
};

export const addStudentToClass = (classId, studentId) => {
  return {
    type: ADD_STUDENT_TO_CLASS,
    classId,
    studentId
  }
};

export const startAddStudentToClass = (classId, studentId) => {
  return (dispatch) => {
    return database.ref(`classes/${classId}`).child(studentId).set(studentId).then(() => {
      return dispatch(addStudentToClass(classId, studentId));
    });
  }
};

export const removeStudentFromClass = (classId, studentId) => {
  return {
    type: REMOVE_STUDENT_FROM_CLASS,
    classId,
    studentId
  }
};

export const startRemoveStudentFromClass = (classId, studentId) => {
  return (dispatch) => database.ref(`classes/${classId}/${studentId}`).remove().then(() => {
    dispatch(removeStudentFromClass(classId, studentId));
  });
};
