import React, { Component } from 'react'
import styled from 'styled-components'
import { Form, Input, Button } from 'antd'

const FormItem = Form.Item
const { TextArea } = Input

const Wrapper = styled.div`
    text-align: right;
`

class InputForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault()

        const { form } = this.props

        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)

                this.props.onSubmit(values)

                form.setFieldsValue({ title: '', body: '' })
            }
        })
    }

    componentDidMount() {
        const { setFieldsValue } = this.props.form
        const { title, body } = this.props

        setFieldsValue({
            title: title,
            body: body
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Please input title' }],
                    })(
                        <Input placeholder="Title"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('body', {
                        rules: [{ required: true, message: 'Please input memo' }],
                    })(
                        <TextArea row={5} placeholder="Memo"/>
                    )}
                </FormItem>
                <FormItem>
                    <Wrapper>
                        <Button htmlType="submit">
                            SAVE
                        </Button>
                    </Wrapper>
                </FormItem>
            </Form>
        )
    }
}

const WrappedInputForm = Form.create()(InputForm)

export default WrappedInputForm
