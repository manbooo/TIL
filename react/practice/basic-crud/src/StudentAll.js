import React, { Component } from 'react'
import axios from 'axios'

class StudentAll extends Component {
    state = {
        name: '' ,
        address: '',
        email: '',
        contact: '',
        id: '',
        Buttontxt: 'Save',
        data1: []
    }

    _getInitState = () => {
        return { name: '' , address: '', email: '', contact: '', id: '', Buttontxt: 'Save', data1: [] }
    }

    _handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        axios.get('api/getdata')
            .then((res) => {
                this.setState({
                    data1: res
                })
            })
            .catch((err) => {
                throw err
            })
    }

    _deleteData = (id) => {
        const studentDelete = { 'id': id }

        axios.post('/api/Removedata', studentDelete)
            .then((res) => {
                alert(res)

                this.componentDidMount()
            })
            .catch((err) => {
                alert(err)

                throw err
            })
    }

    _editData(item) {
        this.setState({
            name: item.name,
            address: item.address,
            contact: item.contact,
            email: item.email,
            id: item._id,
            Buttontxt: 'Update'
        })
    }

    _handleClick=  () => {
        let Url = ''

        if (this.state.Buttontxt === 'Save') {
            Url = '/api/savedata'
        } else {
            Url = '/api/Updatedata'
        }

        const studentData = {
            'name': this.state.name,
            'address': this.state.address,
            'email': this.state.email,
            'contact': this.state.contact,
            'id': this.state.id,
        }

        axios.post(Url, studentData)
            .then((res) => {
                alert(res)

                this.setState(this._getInitState)
                this.componentDidMount()
            })
            .catch((err) => {
                alert(err)

                throw err
            })
    }

    render() {
        return (
            <div>
                <p><b> CRUD Opration Using React,Nodejs,Express,MongoDB</b></p>
                <form>
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <td><b>Name</b></td>
                                <td>
                                    <input type="text" value={this.state.name} name="name"
                                           onChange={this._handleChange}/>
                                    <input type="hidden" value={this.state.id} name="id"/>
                                </td>
                            </tr>

                            <tr>
                                <td><b>Address</b></td>
                                <td>
                                    <input type="text" value={this.state.address} name="address"
                                           onChange={this._handleChange}/>
                                </td>
                            </tr>

                            <tr>
                                <td><b>Email</b></td>
                                <td>
                                    <input type="text" value={this.state.email} name="email"
                                           onChange={this._handleChange}/>
                                </td>
                            </tr>


                            <tr>
                                <td><b>Contact</b></td>
                                <td>
                                    <input type="text" value={this.state.contact} name="contact"
                                           onChange={this._handleChange}/>
                                </td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>
                                    <input type="button" value={this.state.Buttontxt} onClick={this._handleClick}/>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>

                    <div>

                        <table>
                            <tbody>
                            <tr>
                                <th><b>S.No</b></th>
                                <th><b>NAME</b></th>
                                <th><b>ADDRESS</b></th>
                                <th><b>EMAIL</b></th>
                                <th><b>CONTACT</b></th>
                                <th><b>Edit</b></th>
                                <th><b>Delete</b></th>
                            </tr>
                            {this.state.data1.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.email}</td>
                                    <td>{item.contact}</td>
                                    <td>
                                        <button type="button" onClick={(e) => {
                                            this._editData(item)
                                        }}>Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" onClick={(e) => {
                                            this._deleteData(item._id)
                                        }}>Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        )
    }
}

export default StudentAll
