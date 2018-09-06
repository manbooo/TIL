import React, { Component } from 'react'

import { Form, Input, Button } from 'antd'

const FormItem = Form.Item
const TextArea = Input.TextArea

class MemoForm extends Component {

    _handleSubmit = (e) => {
        e.preventDefault()

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)

                this.props.onCreate(values)
            }
        })
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <div className="Memo-Form">
                <Form onSubmit={this._handleSubmit} className="memo-form">
                    <FormItem>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: 'Please input title' }],
                        })(
                            <Input placeholder="Title" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: 'Please input content' }],
                        })(
                            <TextArea row={4} placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="memo-form-button">
                            ADD MEMO
                        </Button>
                    </FormItem>
                </Form>

            </div>
        )
    }
}

const WrapperMemoForm= Form.create()(MemoForm)

export default WrapperMemoForm