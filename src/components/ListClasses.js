import React from 'react';
import { connect } from 'react-redux';
import { startEditStudentClassId, startRemoveStudentFromClass } from '../actions';

class ListClasses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showStudents: false,
      selectedClassId: ''
    };
  };

  handleOnClick = (id) => {

    this.setState({selectedClassId: id}, () => {
      this.setState({
        showStudents: true,
      });
    });
  };

  renderList = () => {
    if (this.props.classes) {

    const classes = this.props.classes;
    const listOfClasses = Object.keys(classes).map((key) => {
      return (
        <li
          key={key}
          onClick={() => this.handleOnClick(key)}
          >{key}
        </li>
      )
    });

    return listOfClasses;

    }
  };

  renderStudentList = () => {
    const selectedClassId = this.props.classes[this.state.selectedClassId];

    const list = selectedClassId.map((studentId) => {
        if (studentId != 0) {
          const {fname,lname,id,classId} = this.props.students[studentId];
          return (
            <tr key={studentId}>
              <td>{id}</td>
              <td>{fname}</td>
              <td>{lname}</td>
              <td>
                <button
                  key={`${studentId}-btn`}
                  onClick={() => this.removeStudent(classId,id)}
                  >
                  Ta bort elev från klassen
                </button>
              </td>
            </tr>
            );
          }
        });
    return list;

  };

  removeStudent = (classId, studentId) => {
    return this.props.removeStudent(classId, studentId).then(() => {
      return this.props.editStudent(studentId, null);
    });
  };

  render() {
    const selectedClassId = this.props.classes[this.state.selectedClassId];
    return (
      <div>
        <ul>
          {this.renderList()}
        </ul>
        <ul>
        {this.state.showStudents ? (
          <table>
            <tbody>
              <tr>
                <th>Personnummer</th>
                <th>Förnamn</th>
                <th>Efternamn</th>
              </tr>
              {this.renderStudentList()}
            </tbody>
          </table>

        ) : (<p>Ingen klass vald</p>)

        }
        </ul>
      </div>
    );
  }

};

const mapStateToProps = (state) => ({
  classes: state.classes,
  students: state.students
});

const mapDispatchToProps = (dispatch) => ({
  editStudent: (studentId, classId) => {
    return dispatch(startEditStudentClassId(studentId, classId))
  },
  removeStudent: (classId, studentId) => {
    return dispatch(startRemoveStudentFromClass(classId, studentId))
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(ListClasses);
