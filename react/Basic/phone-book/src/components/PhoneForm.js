import React, { Component } from 'react';

class PhoneForm extends Component {
  static defaultProps = {
    onCreate: () => console.warn('onCreate not defined'),
  }

  state = {
    name: '',
    phone: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    // 페이지 리로딩 방지
    e.preventDefault();

    // state를 onCreate를 통하여 부모에게 전달
    this.props.onCreate(this.state);

    //상태 초기화
    this.setState({
      name: '',
      phone: ''
    })
  }

  render() {
    console.log('render PhoneForm');

    const divStyle = {
      width: '300px',
      height: '125px',

      margin: '10px auto'
    };

    const inputStyle = {
      width: '250px',
      height: '26px',

      borderRadius: '5px',
      margin: '10px auto',
      padding: '2.5px',

      display: 'block'
    }

    const btnStyle = {
      background: '#58ACFA',
      color: '#ffffff',

      width: '250px',
      height: '35px',

      border: 'none',
      borderRadius: '5px',
      margin: '10px auto',
      padding: '5px',

      display: 'block',

      fontSize: '15px'
    }

    return (
      <form onSubmit={this.handleSubmit} style={divStyle}>
        <input
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
          style={inputStyle}
        />

        <input
          placeholder="Phone"
          value={this.state.phone}
          onChange={this.handleChange}
          name="phone"
          style={inputStyle}
        />

        <button type="submit" style={btnStyle}>등록</button>
      </form>
    );
  }
}

export default PhoneForm;