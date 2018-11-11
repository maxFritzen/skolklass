import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Header from './Header';
import { startCreateStudent, startAddStudentToClass } from '../actions';

class CreateStudentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: '',
      fnameValue: '',
      lnameValue: '',
      classId: '',
      message: ''
    };
  };

  handleOnSubmit = (e) => {
    e.preventDefault();

    if (!this.state.fnameValue || !this.state.lnameValue || !this.state.studentId) {
      this.setState({message: 'Fyll i alla fält markerade med *'});
    } else if (this.props.students[this.state.studentId]) {
      this.setState({message: ' Den här personen verkar redan vara inlagd i systemet.'});
    } else if (this.state.classId && !this.props.classes[this.state.classId]) {
      this.setState({message: ' Den valda klassen verkar inte vara inlagd i systemet.'});
    } else {
      const student = {
        id: this.state.studentId,
        fname: this.state.fnameValue,
        lname: this.state.lnameValue,
        classId: this.state.classId,
      };
      if (student.classId) {
        this.props.startAddStudentToClass(student.classId, student.id);
      }
      this.props.startCreateStudent(student).then(() => {
        this.setState({message: ' Eleven är tillagd!'});
      });
    }
  };

  onFnameChange = (e) => {
    this.setState({
      fnameValue: e.target.value,
      message: ''
    });
  };

  onLnameChange = (e) => {
    this.setState({
      lnameValue: e.target.value,
      message: ''
    });
  };

  onStudentIdChange = (e) => {
    this.setState({
      studentId: e.target.value,
      message: ''
    });
  };

  onClassChange = (e) => {
    this.setState({
      classId: e.target.value,
      message: ''
    });
  };

  render() {
    return(
      <div>
        <Header />
        <h1>Create Student Page</h1>
        <form onSubmit={this.handleOnSubmit}>
          <div>
            Förnamn:
            <input
                value={this.state.fnameValue}
                onChange={this.onFnameChange}
                placeholder="Skriv in förnamn"
              />*
          </div>
          <div>
            Efternamn:
            <input
                value={this.state.lnameValue}
                onChange={this.onLnameChange}
                placeholder="Skriv in Efternamn"
              />*
          </div>
          <div>
            Personnummer:
            <input
                value={this.state.studentId}
                onChange={this.onStudentIdChange}
                placeholder="Skriv in Efternamn"
              />*
          </div>

          <div>
            Klass (valfri):
            <input
                value={this.state.classId}
                onChange={this.onClassChange}
                placeholder="Skriv in Klass"
              />
          </div>
          <input
              type="submit"
              value="Lägg till elev"
            />
          <p>{this.state.message}</p>
        </form>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  students: state.students,
  classes: state.classes
});

const mapDispatchToProps = (dispatch) => ({
  startCreateStudent: (student) => dispatch(startCreateStudent(student)),
  startAddStudentToClass: (classId, studentId) => {
    return dispatch(startAddStudentToClass(classId,studentId))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudentPage);
