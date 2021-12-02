import React, { Component } from 'react';
import Axios from 'axios';

export default class EditFood extends Component {

    constructor(props) {
        super(props);

        this.onChangeFoodType = this.onChangeFoodType.bind(this);
        this.onChangeFoodSafe = this.onChangeFoodSafe.bind(this);
        this.onChangeFoodNotes = this.onChangeFoodNotes.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            foodName: '',
            foodType: '',
            foodSafe: 0,
            foodNotes: "",
        }
    }

    componentDidMount(id) {

        Axios.get('https://final-project-node-server-zron8.ondigitalocean.app/food' + this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                this.setState( {
                    foodName: res.data.foodName,
                    foodType: res.data.foodType,
                    foodSafe: res.data.foodSafe,
                    foodNotes: res.data.foodNotes
                })
        })

        .catch(function (error) {
            console.log(error);
        })

    }
 
    onChangeFoodType(e) {
        this.setState({
            foodType: e.target.value
        });
    }

    onChangeFoodSafe(e) {
        this.setState({
            foodSafe: e.target.value
        });
    }

    onChangeFoodNotes(e) {
        this.setState({
            foodNotes: e.target.value 
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const food = {
            foodName: this.state.foodName,
            foodType: this.state.foodType,
            foodSafe: this.state.foodSafe,
            foodNotes: this.state.foodNotes
        }

        Axios.post('https://final-project-node-server-zron8.ondigitalocean.app/food/update/' + this.props.match.params.id, food._id)
            .then(res => {
                console.log(res.data);
                window.location = '/tab3';
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    focus() {
        // Explicitly focus the text input using the raw DOM API
        this.textInput.focus();
    }

    render() {
        const name = this.state.foodName;
        return (
            <div className="editFoodDiv">
                <h3 className="editFoodH3">Edit This Food Item</h3>
                <form className="editFoodForm" onSubmit={this.onSubmit}>

                    <div className="">
                        <label>Food Name:</label>
                        <input type="text" className="editFoodInput" defaultValue={name} readOnly/>
                    </div>

                    <div className="form-group">
                        <label>Food Type: </label>
                        <input type="text" className="editFoodInput" placeholder={this.state.foodType} value={this.state.foodType} onChange={this.onChangeFoodType}/>
                    </div>

                    <div className="form-group">
                        <label>Food Safe: </label>
                        <input type="text" className="editFoodInput" placeholder={this.state.foodSafe} value={this.state.foodSafe} onChange={this.onChangeFoodSafe}/>
                    </div>

                    <div className="form-group">
                        <label>food Notes: </label>
                        <input type="text" className="editFoodInput" placeholder={this.state.foodNotes} value={this.state.foodNotes} onChange={this.onChangeFoodNotes}/>
                    </div>

                    <div className="form-group">
                        <input type="submit" className="editFoodButton" value="Edit This Food Item" />
                    </div>
                </form>
            </div>
        )
    }
}