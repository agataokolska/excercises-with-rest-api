import React, { Component } from 'react';
import database from './Firebase'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';
import Messages from './Message'


const myApiUrl = 'https://todo-8fe7d.firebaseio.com/users'

class ListwithFetch extends Component {

    state = {

        id: '',
        name: '',
        surname: '',
        age: '',
        list: []
    }

    createHandler = () => {
        const request = {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                surname: this.state.surname,
                age: this.state.age
            })
        }

        fetch(`${myApiUrl}.json`, request) //POST   żeby dodawać do bazy trzeba jako drugi parametr podac zmienną, w tym przypadku request
            .then(response => response.json())
            .then(data => {
                console.log('data', data)
                this.setState({ //czyscimy stan po wpisaniu danych, kliknieciu dodaj i odswiezeniu
                    name: '',
                    surname: '',
                    age: ''
                })
                this.loadData()
            })
    }

    updateHandler = () => {
        const request = {
            method: 'PUT',
            body: JSON.stringify({
                name: this.state.name,
                surname: this.state.surname,
                age: this.state.age
            })
        }

        fetch(`${myApiUrl}/${this.state.id}.json`, request) //POST   żeby dodawać do bazy trzeba jako drugi parametr podac zmienną, w tym przypadku request
            .then(response => response.json())
            .then(data => {
                this.setState({ //czyscimy stan po wpisaniu danych, kliknieciu dodaj i odswiezeniu
                    name: '',
                    surname: '',
                    age: ''
                })
                this.loadData()
            })
    }
    handleChange = (event) => {
        const fieldName = event.target.name //event ustawiony na zmiane w polu z atrybuetm name o okreslonej nazwie
        this.setState({
            [fieldName]: event.target.value
        })
    }
    // handleNameChange = (event) => { //POST
    //     this.setState({
    //         name: event.target.value
    //     });
    // }
    // handleSurnameChange = (event) => { //POST
    //     this.setState({
    //         surname: event.target.value
    //     });
    // }
    // handleAgeChange = (event) => { //POST
    //     this.setState({
    //         age: event.target.value
    //     });
    // }

    loadData = () => {
        fetch(`${myApiUrl}.json`)
            .then(response => response.json())
            .then(responseData => {
                const firebaseArray = Object.entries(responseData || {})

                const firebaseData = firebaseArray.map(item => {
                    return { id: item[0], ...item[1] } //...item piszemy zamiast age:item[1].age, name: item[1].name

                })
                this.setState({
                    list: firebaseData
                })
            })
    }
    componentWillMount() {
        this.loadData()
    }
    removeHandler = (id) => {
        const request = {
            method: 'DELETE',
        }
        //fetch('https://todo-8fe7d.firebaseio.com/users.json' + id + '.json', request)
        fetch(`${myApiUrl}/${id}.json`, request)
            .then(response => response.json())
            .then(data =>
                this.loadData())
    }

    editHandler = (obj) => { //do edycji 
        this.setState({
            id: obj.id,
            name: obj.name,
            surname: obj.surname,
            age: obj.age
        })

    }
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Route path="/messages/:id" component={Messages} />

                        <div>
                            wybrany obiekt: {this.state.name} {this.state.age}
                        </div>

                        <input type="text" name="name" placeholder="imię" onChange={this.handleChange} value={this.state.name} />
                        <input type="text" name="surname" placeholder="nazwisko" onChange={this.handleChange} value={this.state.surname} />
                        <input type="text" name="age" placeholder="wiek" onChange={this.handleChange} value={this.state.age} />
                        <button onClick={this.createHandler}>Dodaj</button>
                        <button onClick={this.updateHandler}>zaktualizuj</button>
                        <div>
                            <ul>
                                {this.state.list.map((item) => (
                                    <li key={item.id}>
                                    <Link to={`/messages/${item.id}`}>
                                        {item.name} {item.surname} {item.age}
                                    </Link>
                                        <button onClick={() => this.editHandler(item)}>Edytuj</button>
                                        <button onClick={() => this.removeHandler(item.id)}>Usuń</button>

                                    </li> //w removeHandler przekazujemy id z itema żeby zidentyfikować poszczególne elementy na ktore klikamy
                                ))}
                            </ul>
                        </div>
                    </div>

                </Router>
            </div>
        );
    }
}

export default ListwithFetch