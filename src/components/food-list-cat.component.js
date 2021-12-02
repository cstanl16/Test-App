import React, { Component } from 'react';
import axios from 'axios';

export const Food = (props) => {
    
    if ((props.food.foodSafe === "Yes" && props.food.foodSafe === '') || (props.food.foodSafe === "no"  && props.food.foodSafe === '')) {
        return(
            <div className="foodReturn">
                <h1>Yes!</h1>
                <p>Dogs can eat {props.food.foodName}</p>
            </div>
        );
    }

    else if ((props.food.foodSafe === "Yes" && props.food.foodSafe !== '') || (props.food.foodSafe === "no"  && props.food.foodSafe !== '')) {
        return(
            <div className="foodReturn">
                <h1>Yes!</h1>
                <p>Dogs can eat {props.food.foodName}</p>
                <p>{props.food.foodNotes}</p>
            </div>
        );
    }

    else if ((props.food.foodSafe === "No" && props.food.foodSafe === '') || (props.food.foodSafe === "no"  && props.food.foodSafe === '')) {
        return(
            <div className="foodReturn">
                <h1>No!</h1>
                <p>Dogs can't eat {props.food.foodName}</p>
            </div>
        ); 
    }

    else if  ((props.food.foodSafe === "No" && props.food.foodSafe !== '') || (props.food.foodSafe === "no"  && props.food.foodSafe !== '')) {
        return(
            <div className="foodReturn">
                <h1>No!</h1>
                <p>Dogs can't eat {props.food.foodName},</p>
                <p>{props.food.foodNotes}</p>
            </div>
        ); 
    }
    else if (props.food.foodSafe !== "No" || props.food.foodSafe !== "Yes") {
        console.log("Hello");
        return(
            <div className="foodReturn">
                <h1>help</h1>
            </div>
        );
    }
}

export default class FoodList extends Component {

    constructor(props) {
        super(props);

        this.deleteFood = this.deleteFood.bind(this);
        this.foodSafe = '';
        this.state = {
            foodItems: []
        };
    }

    render() {
        return (
            <div className="BudgetList-Items">
                { this.foodList() }
            </div>
        )
        
    }


    componentDidMount() {
        console.log("restarted");
        axios.get('https://final-project-node-server-zron8.ondigitalocean.app/food') //username/'+this.props.username
        .then(response => {
            this.setState({ foodItems: response.data });
            //console.log({ foodItems: response.data }); uncomment to see all entries of db in console
            this.filterFoodList();
        })
        .catch((error) => {
            console.log(error);
        });

    }

    deleteFood(id) {
        axios.delete('https://final-project-node-server-zron8.ondigitalocean.app/food'+id)
        .then(response => { 
            console.log(response.data);
            window.location = '/tab3';
        }); 
    }


    filterFoodList() {  
        const name = this.props.foodName;
        this.setState({
            foodItems: this.state.foodItems.filter(foodItems => foodItems.foodName === (`${name}`) ) 
        });
        

    }

    foodList() {

        if (this.state.foodItems.map.length > 0) {
            console.log(this.state.foodItems.map.length);
            return this.state.foodItems.map(currentfood => {
                this.props.parentCallback(currentfood.foodSafe);
               
            return <Food  food={currentfood} key={currentfood._id}/>;
            });
        }
        else {
            console.log("im here");
        }
        
    }

}