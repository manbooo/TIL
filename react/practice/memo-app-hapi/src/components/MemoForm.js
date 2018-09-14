import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

const FormItem = Form.Item

class MemoForm extends Component {

    static defaultProps = {
        item: {
            id: -1,
            content: ''
        },
        editMode: false,
        onCreate: console.warn('onCreate is not define'),
        onUpdate: console.warn('onUpdate is not define')
    }

    _handleSubmit = (e) => {
        e.preventDefault()

        const form = this.props.form
        const editMode = this.props.editMode

        if (editMode) {
            form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values)

                    const updateItem = {
                        id: this.props.item.id,
                        content: values.content
                    }

                    this.props.onUpdate(updateItem)
                }
            })
        } else {
            form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values)

                    this.props.onCreate(values)

                    form.setFieldsValue({content: ''})
                }
            })
        }

    }

    componentDidMount() {
        const { setFieldsValue } = this.props.form;
        const { item, editMode } = this.props

        if (editMode) {
            setFieldsValue({
                id: item.id,
                content: item.content
            })
        } else {
            setFieldsValue({
                content: item.content
            })
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form

        return (
            <Form onSubmit={this._handleSubmit}>
                <FormItem>
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: 'Please input content!', initialValue: true }],
                    })(
                        <TextArea row={5} />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        save
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

MemoForm.proptype = {
    item: PropTypes.object,
    editMode: PropTypes.bool.isRequired,
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
}

const WrappedMemoForm = Form.create()(MemoForm);

export default WrappedMemoForm
