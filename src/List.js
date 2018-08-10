import React, { Component } from 'react';
import database from './Firebase';
import './App.css';

class List extends Component {

    state = {
        user: null,
        list: []
    }

    clickHandler = () => {
        database.ref('/test')
            .push({ user: this.state.user })
    }

    handleChange = (event) => { //POST
        this.setState({
            user: event.target.value
        });
    }

    componentWillMount() {
        database.ref('/test') //referencje do fragmentu '/test  GET
            .on('value', (snapshot) => {  // on-pobiera dane nonstop przy zmianie lub once - pobiera dane tylko raz
                console.log('snapshot', snapshot);
                console.log('snapshot', snapshot.val());
                const firebaseData = Object.entries( //zamienia obiekt na tablicę
                    snapshot.val() || {} //pusty obiekt na wypadek gdyby nic nie było w bazie, .val zwraca wartosc
                );
                console.log('firebaseData', firebaseData);

                const data = firebaseData.map(([id, value]) => {
                    value.id = id;
                    return value;
                });
                console.log('data', data);
                this.setState({ list: data });
            });
    }

    render() {
        return (
            <div className="App">
                <div>
                </div>
                <input type="text" onChange={this.handleChange} />
                <button onClick={this.clickHandler}>Click me</button>
                <div>
                    <ul>
                        {this.state.list.map((item) => (
                            <li key={item.id}>{item.user}</li>
                        ))}
                    </ul>
                </div>

            </div>
        );
    }
}

export default List