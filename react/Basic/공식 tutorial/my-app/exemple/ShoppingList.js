// React Component Class or React Component type

// React.Component의 Subclass
class ShoppingList extends React.Component {

    // render : display views
    // render methods returns a description of what you want to see on the screen
    // return React element
    render() {

        //JSX syntax
        return (
            <div className="shopping-list">
                <h1>Shopping List for {this.props.name}</h1>

                <ul>
                    <li>Instagram</li>
                    <li>WhatApp</li>
                    <li>Oculus</li>
                </ul>
            </div>
        )

        // return React.createElement('div', {className: 'shopping-list'},
        //     React.createElement('h1', /* ... h1 children ... */),
        //     React.createElement('ul', /* ... ul children ... */)
        // );
    }
}

// Example usage: <ShoppingList name="Mark" />
// React Component is encapsulated and can operate indeoendentry
// Compose and render custom React components


// props : properties

