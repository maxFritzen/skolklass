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


  }
  renderList = () => {
    if (this.props.classes) {

    const classes = this.props.classes;
    const listOfClasses = Object.keys(classes).map((key) => {
      // När onClick: visa elever i klassen.
      // Det betyder: loopa igenom klassen, hitta alla elever med tillhörande id.
      // Här är listitem inte ett object utan bara en array med classId som string.
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
  }

  removeStudent = (classId, studentId) => {
    return this.props.removeStudent(classId, studentId).then(() => {
      return this.props.editStudent(studentId, null);
    });


  }

  render() {
    const selectedClassId = this.props.classes[this.state.selectedClassId];
    console.log(selectedClassId);
    return (
      <div>
        <ul>
          {this.renderList()}
        </ul>
        <ul>
        {this.state.showStudents ? (
          selectedClassId.map((studentId) => {
            const student = this.props.students[studentId];
            console.log(student);
            if (studentId != 0) return (
              <div key={`${studentId}div`}>
              <li key={studentId}>
                {`${student.fname} - ${student.lname} : ${student.id}`}
              </li>
              <button key={`${studentId}btn`}onClick={() => this.removeStudent(student.classId,student.id)}></button>
            </div>
            )
            // if (studentId != 0) return <li key={studentId}>{studentId}</li>
          })
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
