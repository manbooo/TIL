import React, { Component } from 'react';

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      name: '이름',
      phone: '010-0000-0000',
      id: 0
    }
  }

  handleRemove = () => {
    const { info, onRemove } = this.props;

    onRemove(info.id);
  }
  
  render() {
    const divStyle = {
      width: '300px',
      height: '75px',

      border: '1px solid gray',
      borderRadius: '5px',

      padding: '10px',
      margin: '10px'
    };

    const titleStyle = {
      width: '200px',
      height: '30px',

      fontWeight: 'bold',

      margin: '5px',

      display: 'inline-block'
    }

    const contentStyle = {
      width: '250px',
      height: '30px',

      padding: '5px'
    }

    const btnStyle = {
      background: '#FA5858',
      color: '#ffffff',

      width: '50px',
      height: '20px',

      border: 'none',
      borderRadius: '5px',
      margin: '5px',

      fontSize: '10px',

      alignItems: 'right'
    }

    const {
      name, phone, id
    } = this.props.info;
    
    return (
      <div style={divStyle}>
        <div>
          <div style={titleStyle}>{name}</div>
          <button 
            onClick={this.handleRemove}
            style={btnStyle}
          >
            DELETE
          </button>
        </div>
        <div style={contentStyle}>{phone}</div>
      </div>
    );
  }
}

export default PhoneInfo;