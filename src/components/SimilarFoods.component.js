import React, { Component } from 'react';
import axios from 'axios';

export const Food = (props) => {
    
    if ((props.food.foodSafe === "Yes" && props.food.foodSafe === '') || (props.food.foodSafe === "yes"  && props.food.foodSafe === '')) {
        return(
            <div className="foodReturn2">
                <p>{props.food.foodName}</p>
            </div>
        );
    }

    else if ((props.food.foodSafe === "Yes" && props.food.foodSafe !== '') || (props.food.foodSafe === "yes"  && props.food.foodSafe !== '')) {
        return(
            <div className="foodReturn">
                <p>{props.food.foodName}</p>
            </div>
        );
    }
    else { 
        return null;
    }
}

export default class SimilarFoods extends Component {

    constructor(props) {
        super(props);

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
            this.filterFoodList2();
        })
        .catch((error) => {
            console.log(error);
        });

    }

    filterFoodList2() { 
        const type = this.props.foodType;
        console.log(type);
        this.setState({
            foodItems: this.state.foodItems.filter(foodItems => foodItems.foodType === (`${type}`) ) 
        });
        

    }

    foodList() {

        if (this.state.foodItems.map.length > 0) {
            console.log(this.state.foodItems.map.length);
            return this.state.foodItems.map(currentfood => {

                return <Food  food={currentfood} key={currentfood._id}/>;
            
            });
        }
        else {
            console.log("im here");
        }
        
    }

}