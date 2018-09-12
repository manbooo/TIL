import React from 'react'
import PropTypes from 'prop-types'

import {partial} from '../../lib/utils'

export const TodoItem = (props) => {
    const handleToggle = partial(props.handleToggle, props.id)
    const handleRemove = partial(props.handleRemove, props.id)

    return (
        <li>
            <span className='delete-item'><a href="#" onClick={handleRemove}>X</a></span>
            <input type="checkbox"
                   onChange={handleToggle}
                   defaultChecked={props.isComplete}
            /> {props.name}
        </li>
    )
}

TodoItem.propTypes = {
    name: PropTypes.string.isRequired,
    isComplete: PropTypes.bool,
    id: PropTypes.number.isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired
}

TodoItem.defaultProps = {
    name: '',
    isComplete: false,
    id: 0,
    handleToggle: console.warn('handleToggle is not defind'),
    handleRemove: console.warn('handleRemove is not defind')
}
