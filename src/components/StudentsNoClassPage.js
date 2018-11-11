import React from 'react';
import { connect } from 'react-redux';
import { startEditStudentClassId, startAddStudentToClass } from '../actions';
import Header from './Header';

class StudentsNoClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: '',
      classId: ''
    }
  }
  handleOnSubmit = (e) => {
    e.preventDefault();
    const studentId = this.state.studentId;

    const classId = this.state.classId;
    console.log(classId);
    // this.props.editStudent(studentId, classId);
    // this.props.addStudent(classId, studentId);
    return this.props.addStudent(classId, studentId).then(() => {
      return this.props.editStudent(studentId, classId);
    });
  }

  onStudentIdChange = (e) => {
    this.setState({
      studentId: e.target.value
    });
  };

  onClassChange = (e) => {
    this.setState({
      classId: e.target.value
    });
  };
  renderList = () => {
    const students = this.props.students;
    const list = [];
    console.log(students);
    for(var studentId in students) {
      const classId = students[studentId].classId;
      if (!classId) {
        list.push(
          <li key={studentId}>
            {students[studentId].id}
            {students[studentId].fname}
            {students[studentId].lname}
          </li>

        );
      }
    }
    return list;
  }
  render() {

    return (
      <div>
        <Header />
        <h1>Elever utan klass</h1>
        <ul>
          {this.renderList()}
        </ul>
        <form onSubmit={this.handleOnSubmit}>
          <h2>Lägg till elev i klass</h2>
          <input
            placeholder="elevens personnummer"
            value={this.value}
            onChange={this.onStudentIdChange}
          />

          <input
            placeholder="Klass"
            value={this.value}
            onChange={this.onClassChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  classes: state.classes,
  students: state.students
});

const mapDispatchToProps = (dispatch) => ({
  editStudent: (studentId, classId) => {
    return dispatch(startEditStudentClassId(studentId, classId))
  },
  addStudent: (classId, studentId) => {
    return dispatch(startAddStudentToClass(classId, studentId))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentsNoClassPage);
