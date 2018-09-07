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
                            rules: [{ required: true, message: 'Please input title', initialValue: '' }],
                        })(
                            <Input placeholder="Title" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: 'Please input content', initialValue: '' }],
                        })(
                            <TextArea row={5} placeholder="Content" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="memo-form-button">
                            SUBMIT
                        </Button>
                    </FormItem>
                </Form>

            </div>
        )
    }
}

const WrapperMemoForm= Form.create({
    mapPropsToFields(props) { return {...props.memo}}
})(MemoForm)

export default WrapperMemoForm