import React from 'react'

import { Alert } from 'antd'

export const ErrorComponent = (props) => {
    return (
        <Alert
            message="Error"
            description={props.errDescription}
            type="error"
            showIcon
        />
    )
}
