import React from 'react';

export default (props) => {

    const {currentTodo, changeCurrent} = props

    const handleInputChange = (event) => {
        const value = event.target.value

        // back to our store
        changeCurrent(value)
    }

    return (
        <form>
            <input type="text" className="input-text"
                   onChange={handleInputChange}
                 value={currentTodo}
            />
        </form>
    )
}
