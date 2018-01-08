import React from 'react';

export default class ContactDetails extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      name: '',
      phone: ''
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  handleToggle() {
    if(!this.state.isEdit) {
      this.setState({
        name: this.props.contact.name,
        phone: this.props.contact.phone
      });
    } else {
      this.props.onEdit(this.state.name, this.state.phone);
    }
    this.setState({
      isEdit: !this.state.isEdit
    });
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleEdit() {
    this.props.onEdit(this.state.name, this.state.phone);
  }

  handleKeypress(e) {
    if(e.charCode === 13) {
      this.handleToggle();
    }
  }

  render() {
     const read = (
       <div>
         <h2>Details</h2>
         <p>{this.props.contact.name}</p>
         <p>{this.props.contact.phone}</p>
       </div>
     );

     const edit = (
       <div>
         <h2>Edit</h2>
         <p>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={this.state.name}
              onChange={this.handleChange}
              />
          </p>
          <p>
            <input
              type="text"
              name="phone"
              placeholder="phone"
              value={this.state.phone}
              onChange={this.handleChange}
              onKeyPress={this.handleKeypress}
              />
          </p>
       </div>
     );

    const details = (
      <div>
        { this.state.isEdit ? edit : read }

        <p>
          <button onClick={this.handleToggle}>{this.state.isEdit ? 'Ok' : 'Edit'}</button>
          <button onClick={this.props.onRemove}>Remove</button>
        </p>
      </div>
    );

    const blank = (
        <div> <h2>Nothing is Selected</h2> </div>
    );

    return (
      <div>
          { this.props.isSelected ? details : blank }
       </div>
    );
  }
}

ContactDetails.defaultProps = {
    contact: {
        name: "",
        phone: ""
    },
    onRemove: () => { console.error('onRemove not defined') },
    onEdit: () => { console.error('onEdit not defined') }
}
