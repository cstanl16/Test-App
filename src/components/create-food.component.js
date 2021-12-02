import React, { Component } from 'react';
import Axios from 'axios';

class CreateFood extends Component {

    constructor(props) {
        super(props);

        this.onChangeFoodName = this.onChangeFoodName.bind(this);
        this.onChangeFoodType = this.onChangeFoodType.bind(this);
        this.onChangeFoodSafe = this.onChangeFoodSafe.bind(this);
        this.onChangeFoodNotes = this.onChangeFoodNotes.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            foodName: '', 
            foodType: '',
            foodSafe: '',
            foodNotes: '',
        };
    };

    onChangeFoodName(e) {
        this.setState({
            foodName: e.target.value
        });
    };

    onChangeFoodType(e) {
        this.setState({
            foodType: e.target.value
        });
    };

    onChangeFoodSafe(e) {
        this.setState({
            foodSafe: e.target.value
        });
    };

    onChangeFoodNotes(e) {
        this.setState({
            foodNotes: e.target.value
        });
    };

    onSubmit(e) {
        e.preventDefault();

        const food = {
            foodName: this.state.foodName,
            foodType: this.state.foodType,
            foodSafe: this.state.foodSafe,
            foodNotes: this.state.foodNotes
        };

        console.log(food);

        //Axios.post('https://final-project-node-server-zron8.ondigitalocean.app/food/add', food)
        Axios.post('http://localhost:8080/food/add', food)
            .then(res => {
                console.log(res.data);
                window.location = '/tab3';
            });
    };
    
    render() {
        return (
            
            <div className="createUserPage">
                <h3 className="createUserH3">Create Food</h3>
                <form className="createUserForm" onSubmit={this.onSubmit}>

                    <div className="">
                        <input type="text" placeholder="Food Name" className="createUserInput" value={this.state.foodName} onChange={this.onChangeFoodName}/>
                    </div>

                    <div>
                        <input type="text" placeholder="Food Type" className="createUserInput" value={this.state.foodType} onChange={this.onChangeFoodType}/>
                    </div>

                    <div>
                        <input type="text" placeholder="Food Safe" className="createUserInput" value={this.state.foodSafe} onChange={this.onChangeFoodSafe}/>
                    </div>

                    <div>
                            <input type="text" placeholder="Food Notes" className="createUserInput" selected={this.state.foodNotes} onChange={this.onChangeFoodNotes}/>
                    </div>

                    <div className="createUserButtonDiv">
                        <button className="createUserButton" onSubmit={this.onSubmit}>done! </button>
                    </div>
                    
                </form>
            </div>
        );
    };
};

export default (CreateFood);