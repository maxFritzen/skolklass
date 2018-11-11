import React from 'react';
import ReactDOM from 'react-dom';

export default class CreateClass extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      message: ''
    }
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    if (this.props.classes) {
      if (!this.props.classes[this.state.value]) {
        this.props.onSubmit(this.state.value).then(() => {
          this.setState({message: 'Klass skapad!'});
        });
      } else {
        this.setState({ message: 'Den här klassen verkar redan vara skapad.' })
      }
    } else {
      this.props.onSubmit(this.state.value).then(() => {
        this.setState({message: 'Klass skapad!'});
      });
    }

  };

  handleOnChange = (e) => {
    this.setState({ value: e.target.value });
  };
  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <input
          value={this.value}
          onChange={this.handleOnChange}
        />
        <input
          type="submit"
          value="Skapa klass"
          />
          <p>{this.state.message} </p>
      </form>
    )
  }
}
