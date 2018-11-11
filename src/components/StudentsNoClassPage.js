import React from 'react';
import { connect } from 'react-redux';
import { startEditStudentClassId, startAddStudentToClass } from '../actions';
import Header from './Header';

class StudentsNoClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: '',
      classId: '',
      message: ''
    }
  }
  handleOnSubmit = (e) => {
    e.preventDefault();
    const studentId = this.state.studentId;

    const classId = this.state.classId;
    const {classes, students} = this.props;

    if (!this.state.studentId || !this.state.classId) {
      return this.setState({message: 'Fyll i båda fälten'});
    }

    if (students[studentId].classId === classId) {
      this.setState({message: 'Eleven verkar redan vara inlagd i klassen'});
    }
    else if (classes[classId] && students[studentId]) {
      return this.props.addStudent(classId, studentId).then(() => {
        return this.props.editStudent(studentId, classId).then(() => {
          this.setState({message: 'Eleven tillagd!'});
        });
      });
    }
    else {
      this.setState({message: 'Knas! Finns eleven och klassen?'});
    }

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
    for(var studentId in students) {
      const classId = students[studentId].classId;
      if (!classId) {
        list.push(
          <tr key={studentId}>
            <td>{students[studentId].id}</td>
            <td>{students[studentId].fname}</td>
            <td>{students[studentId].lname}</td>
          </tr>
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
        <table>
          <tbody>
            <tr>
              <th>Personnummer</th>
              <th>Förnamn</th>
              <th>Efternamn</th>
            </tr>
            {this.renderList()}
          </tbody>

        </table>

        <form onSubmit={this.handleOnSubmit}>
          <h2>Lägg till elev i klass</h2>
          <input
            placeholder="elevens personnummer"
            value={this.state.value}
            onChange={this.onStudentIdChange}
          />

          <input
            placeholder="Klass"
            value={this.state.value}
            onChange={this.onClassChange}
          />
          <input type="submit" />
        </form>
        <p>{this.state.message}</p>
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
