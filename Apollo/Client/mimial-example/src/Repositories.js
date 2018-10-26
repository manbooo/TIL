import React from 'react'

class Repositories extends React.Component {
    state = {
        selectedRepositoryIds: [],
    }

    toggleSelectRepository = (id, isSelected) => {
    ...
    }

    render() {
        return (
            <RepositoryList
                repositories={this.props.repositories}
                selectedRepositoryIds={this.state.selectedRepositoryIds}
                toggleSelectRepository={this.toggleSelectRepository}
            />
        )
    }
}
