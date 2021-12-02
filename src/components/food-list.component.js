import React, { Component } from 'react';
import axios from 'axios';
import { Auth0Context } from '@auth0/auth0-react';

 // 7 food is exported after if statement to see what it should return

export const Food = (props) => {
    
    if ((props.food.foodSafe === "Yes" && props.food.foodSafe === '') || (props.food.foodSafe === "no"  && props.food.foodSafe === '')) {
        return(
            <div className="foodReturn">
                <h1>Yes!</h1>
                <p>{props.dogName} can eat {props.food.foodName}</p>
            </div>
        );
    }

    else if ((props.food.foodSafe === "Yes" && props.food.foodSafe !== '') || (props.food.foodSafe === "no"  && props.food.foodSafe !== '')) {
        return(
            <div className="foodReturn">
                <h1>Yes!</h1>
                <p>{props.dogName} can eat {props.food.foodName}</p>
                <p>{props.food.foodNotes}</p>
            </div>
        );
    }

    else if ((props.food.foodSafe === "No" && props.food.foodSafe === '') || (props.food.foodSafe === "no"  && props.food.foodSafe === '')) {
        return(
            <div className="foodReturn">
                <h1>No!</h1>
                <p>{props.dogName} can't eat {props.food.foodName}</p>
            </div>
        ); 
    }

    else if  ((props.food.foodSafe === "No" && props.food.foodSafe !== '') || (props.food.foodSafe === "no"  && props.food.foodSafe !== '')) {
        return(
            <div className="foodReturn">
                <h1>No!</h1>
                <p>{props.dogName} can't eat {props.food.foodName},</p>
                <p>{props.food.foodNotes}</p>
            </div>
        ); 
    }
    else if (props.food.foodSafe !== "No" || props.food.foodSafe !== "Yes") {
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

        this.foodSafe = '';
        this.state = {
            foodItems: [],
            dogName: 'Dogs'
        };
    }

    // 3 start the render of the actual screen and call the foodlist function to be displayed

    render() {
        return (
            <div className="BudgetList-Items">
                { this.foodList() }
            </div>
        )
        
    }


    // 1 make a call to database to get all foods at start of call

    componentDidMount() {
        axios.get('https://final-project-node-server-zron8.ondigitalocean.app/food') 
        .then(response => {
            this.setState({ foodItems: response.data });
            //console.log({ foodItems: response.data }); uncomment to see all entries of db in console
            this.filterFoodList();
            this.testFunction();
        })
        .catch((error) => {
            console.log(error);
        });
        
        

    }

    static contextType = Auth0Context;

    testFunction() {

        const { user } = this.context;
        const name = user.name;
        console.log(name);
        if (name !== null) {
            
            axios.get('https://final-project-node-server-zron8.ondigitalocean.app/user/' + name ) 
            .then(response => {
                this.setState({ dogName: response.data.dogName });
            })
            .catch((error) => {
                console.log(error);
            });
        }
        else {
        }

    }

    // 2 filter through the food list by the name sent in from the search bar

    filterFoodList() {  
        const name = this.props.foodName;
        this.setState({
            foodItems: this.state.foodItems.filter(foodItems => foodItems.foodName === (`${name}`) ) 
        });
        

    }

    // 4 takes 

    foodList() {

        if (this.state.foodItems.map.length > 0) {
            console.log(this.state.foodItems.map.length);
            return this.state.foodItems.map(currentfood => {

                // 5 callback to send yes or no to tab3 page to show green/red
                this.props.parentCallback(currentfood.foodSafe);
               
                // 6 returns the food export
            return <Food  dogName={this.state.dogName} food={currentfood} key={currentfood._id}/>;
            });
        }
        else {
            console.log("im here");
        }
        
    }

}