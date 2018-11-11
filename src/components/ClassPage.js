import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import CreateClass from './CreateClass';
import ListClasses from './ListClasses';
import { startCreateClass } from '../actions';

class ClassPage extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div>
        <Header />
        <CreateClass
          classes={this.props.classes}
          onSubmit = {this.props.startCreateClass}
          />
        <ListClasses />
      </div>
    );
  }

};
const mapStateToProps = (state) => ({
  classes: state.classes
});

const mapDispatchToProps = (dispatch) => ({
  startCreateClass: (classId) => dispatch(startCreateClass(classId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassPage);
