import React from 'react'

class Message extends React.Component {


    state = {
        name:'',
        surname: '',
        age: ''
    }

    loadData = (id) => {
        fetch(`https://todo-8fe7d.firebaseio.com/users/${id}.json`)
        .then(response => response.json())
        .then(data => {
            this.setState(data)
        })
}

componentWillMount() {
    this.loadData(this.props.match.params.id)
}

componentWilReceiveProps(nextProps) {
    this.loadData(nextProps.match.params.id)
}

render() {

    return (
        <div>
            Name:{this.state.name}, Surname {this.state.surname}, Age {this.state.age}
        </div >
    )
}
}
export default Message