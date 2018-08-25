import React, { Component } from 'react';

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      name: '이름',
      phone: '010-0000-0000',
      id: 0
    }
  }

  state = {
    // 수정 버튼을 눌렀을 때 editing 값을 true로 설정
    // true : 기본의 text 형태로 보여 주던 값을 input 형태로 보여줌
    editing: false,

    // input 값을 담기 위해서 각 필드를 위한 값
    name: '',
    phone: ''
  }

  handleRemove = () => {
    const { info, onRemove } = this.props;

    onRemove(info.id);
  }

  // editing 값을 반전
  // true -> false, false -> true  
  handleToggleEdit = () => {
    const { editing } = this.state;

    this.setState({ editing: !editing });
  }

  // input에서 onChange 이벤트가 발생될 때 호출
  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // editing 값이 바뀔 때 처리
    // 수정을 눌렀을 때, 기존의 값이 input에 나타남
    // 수정을 적용할 땐, input의 값들을 부모한테 전달

    const { info, onUpdate } = this.props;

    // editing : false -> true
    // info의 값을 state에 넣어준다
    if(!prevState.editing && this.state.editing) {
      this.setState({
        name: info.name,
        phone: info.phone
      })
    }

    // editing : true -> false
    if (prevState.editing && !this.state.editing) {
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 수정 상태가 아니고, info 값이 같다면 리렌더링 안함
    if(!this.state.editing
      && !nextState.editing
      && nextProps.info === this.props.info) {
        return false;
      }

      return true;
  }

  
  render() {
    console.log('render PhoneInfo ' + this.props.info.id);

    const divStyle = {
      width: '300px',
      height: '90px',

      border: '1px solid gray',
      borderRadius: '5px',

      padding: '10px',
      margin: '10px auto'
    };

    const titleStyle = {
      width: '200px',
      height: '20px',

      fontWeight: 'bold',

      margin: '5px'
    }

    const contentStyle = {
      width: '250px',
      height: '20px',

      padding: '5px'
    }

    const upBtnStyle = {
      background: '#58ACFA',
      color: '#ffffff',

      width: '50px',
      height: '20px',

      border: 'none',
      borderRadius: '5px',
      margin: '5px',

      fontSize: '10px'
    }

    const delBtnStyle = {
      background: '#FA5858',
      color: '#ffffff',

      width: '50px',
      height: '20px',

      border: 'none',
      borderRadius: '5px',
      margin: '5px',

      fontSize: '10px'
    }

    const inputStyle = {
      width: '200px',
      height: '20px',

      margin: '2.5px'
    }

    const { editing } = this.state;

    if(editing) { // 수정 모드
      return (
        <div style={divStyle}>
          <div>
            <input
              value={this.state.name}
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
              style={inputStyle}
            />
            <div>
              <input
                value={this.state.phone}
                name="phone"
                placeholder="Phone"
                onChange={this.handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <button 
                onClick={this.handleToggleEdit}
                style={upBtnStyle}
              >
                APPLY
              </button>
              <button 
                onClick={this.handleRemove}
                style={delBtnStyle}
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      );
    }

    const {
      name, phone
    } = this.props.info;
    
    return (
      <div style={divStyle}>
        <div style={titleStyle}>{name}</div>
        <div style={contentStyle}>{phone}</div>
        <button 
          onClick={this.handleToggleEdit}
          style={upBtnStyle}
        >
          EDIT
        </button>
        <button 
          onClick={this.handleRemove}
          style={delBtnStyle}
        >
          DELETE
        </button>
      </div>
    );
  }
}

export default PhoneInfo;