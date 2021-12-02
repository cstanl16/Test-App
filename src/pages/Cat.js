import React, { Component } from 'react';
import { IonButton } from '@ionic/react';
import FoodList from '../components/food-list-cat.component.js';
import SearchBox from '../components/SearchBox.js';
import petco from './petco.jpg';

class Cat extends Component{
    constructor(props) {
        super(props);

        this.countChangeUp = this.countChangeUp.bind(this);
        this.countChangeDown = this.countChangeDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleCallback = this.handleCallback.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.routeToFoodInfo = this.routeToFoodInfo.bind(this);

        this.state = {
            searchText: '',
            searchFood: '',
            foodSafe: '',
            count: 0,

        }
    }

    onChange(event) {
        this.setState({searchText: event.target.value});
        var x = document.getElementById("foodListShow");
           x.style.display = "none";                                 
    }

    routeToFoodInfo() {
        const url = `https://www.akc.org/?s=${this.state.searchText}/`
        window.location.href = url;
        
    }

    onSearch() {
        var x = document.getElementById("foodListShow");
              x.style.display = "block";   
            this.setState({newKey: this.state.searchText}); 
        
    }

    handleCallback(FOODSAFE) {
        if (FOODSAFE === "Yes") {
            var x = document.getElementById("main");
            x.style.backgroundColor = "#5CDB95";
        }
        else if (FOODSAFE === "No") {
            var y = document.getElementById("main");
            y.style.backgroundColor = "#D82E3F";
        }
        else {
            //MAYBE SOMETHING HERE????
        }
    }

    foodList() {
        return ;
    }

    adInfo() {
        const url = `https://www.petco.com`
        window.location.href = url;
    }

    
    countChangeUp() {
        this.setState({count: this.state.count+1});
    }
    
    countChangeDown() {
        this.setState({count: this.state.count-1});
    }

    render() {

        return(
            <div id="main" style={{paddingBottom: "736px"}}>
                <h1 className="homePageTitle">
                    What Can Fido Eat?
                </h1>

                <SearchBox Autocomplete className="here" value={this.state.searchText} handleChange={this.onChange} showCancelButton="never"/>
                <button className="searchButton" value="search" onClick={ this.onSearch }>Search</button>

            {/* change key */}
                <div id="foodListShow" >
                    <FoodList parentCallback = { this.handleCallback} key = { this.state.newKey }foodName = {this.state.searchText}/>
                </div>

               {/*  <div id="foodNotFound">Not Found</div> */}

                <div className="learnMore">
                    <IonButton onClick={ this.routeToFoodInfo } class="moreInfoOnSearch">Help Me learn More!</IonButton>
                </div>

                <div class="bottomRow">
                    <div className="ad" onClick={ this.adInfo }>
                        <img src={petco} alt="petco"></img>
                    </div>

                    <div class="votes">
                        <button id="upvote" onClick={this.countChangeUp}>▲</button>                                                   
                        <h3>{this.state.count} Votes!</h3>
                        <button id="downvote" onClick={this.countChangeDown}>▼</button>   
                    </div>
                </div>

            </div>
        );

        
    }

}

export default Cat;