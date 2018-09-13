import React, { Component } from 'react'

import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

const FormItem = Form.Item

class MemoForm extends Component {

    _handleSubmit = (e) => {
        e.preventDefault()

        const form = this.props.form

        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                this.props.onCreate(values)

                form.setFieldsValue({content: ''})
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { item } = this.props

        return (
            <Form onSubmit={this._handleSubmit}>
                <FormItem>
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: 'Please input content!', initialValue: '' }],
                    })(
                        <TextArea row={5}/>
                    )}
                    <Button type="primary" htmlType="submit">
                        save
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const WrappedMemoForm = Form.create()(MemoForm);

export default WrappedMemoForm
