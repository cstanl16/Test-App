import React, { Component } from 'react';
import { IonButton } from '@ionic/react';
import FoodList from '../components/food-list.component.js';
//import ReviewPage from './ReviewPage';
import ReviewPage from '../components/Review.component';
import SearchBox from '../components/SearchBox.js';
import petco from './petco.jpg';

class Tab3 extends Component{
    constructor(props) {
        super(props);

        this.countChangeUp = this.countChangeUp.bind(this);
        this.closeReview = this.closeReview.bind(this);
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
            username: 'cstanl16@uncc.edu'

        }
    }

    componentDidMount() {
        //var x = document.getElementById("popup");
        //    x.style.display = "none";
    }


    onChange(event) {
        var temp = event.target.value;
        temp = temp.substring(0, 1).toUpperCase() + temp.substring(1).toLowerCase();
        this.setState({searchText: temp});
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

    adReview() {
        var x = document.querySelector(".popup");
            x.style.display = "block";
    }

    adInfo() {
        const url = "https://www.petco.com"
        window.open(url, '_blank');
    }

    closeReview() {
        var x = document.querySelector(".popup");
            x.style.display = "none";
    }

    
    countChangeUp() {
        this.setState({count: this.state.count+1});
    }
    
    countChangeDown() {
        this.setState({count: this.state.count-1});
    }

    render() {

        return(
            <div id="main" className="tab3Page">
                <div className="tab3">
                    <h1 className="homePageTitle">
                        What Can Fido Eat?
                    </h1>

                    <SearchBox className="here" value={this.state.searchText} handleChange={this.onChange} showCancelButton="never"/>
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
                        <div className="ad">
                            <button className="reviewButton" onClick = {this.adReview}>Review Ad</button>
                            <img src={petco} className="ad" alt="petco" onClick = {this.adInfo}></img>
                        </div>
                    </div>

                    <div id="popup" className="popup">
                        <button className="closeButton" onClick = {this.closeReview}>✕</button>
                        <ReviewPage username={this.state.username}/>
                    </div>
                    
                </div>

            </div>
        );

        
    }

}

export default Tab3;