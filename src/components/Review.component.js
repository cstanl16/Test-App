import React, { Component } from 'react';
import Axios from 'axios';

class Review extends Component {

    constructor(props) {
        super(props);

        this.onChangeComments = this.onChangeComments.bind(this);
        this.onClick1 = this.onClick1.bind(this);
        this.onClick2 = this.onClick2.bind(this);
        this.onClick3 = this.onClick3.bind(this);
        this.onClick4 = this.onClick4.bind(this);
        this.onClick5 = this.onClick5.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            adID: 'petco',
            rating: '',
            comments: ''
        };
    };

    onChangeComments(e) {
        this.setState({
            comments: e.target.value
        });
    };

    onClick1() {
        this.setState({
            rating: 1
        });
        var star1 = document.getElementById("star1");
        var star2 = document.getElementById("star2");
        var star3 = document.getElementById("star3");
        var star4 = document.getElementById("star4");
        var star5 = document.getElementById("star5");
        star1.style.color = "Yellow";
        star2.style.color = "black";
        star3.style.color = "black";
        star4.style.color = "black";
        star5.style.color = "black";
    };

    onClick2() {
        this.setState({
            rating: 2
        });
        var star1 = document.getElementById("star1");
        var star2 = document.getElementById("star2");
        var star3 = document.getElementById("star3");
        var star4 = document.getElementById("star4");
        var star5 = document.getElementById("star5");
        star1.style.color = "Yellow";
        star2.style.color = "Yellow";
        star3.style.color = "black";
        star4.style.color = "black";
        star5.style.color = "black";
    };

    onClick3() {
        this.setState({
            rating: 3
        });
        var star1 = document.getElementById("star1");
        var star2 = document.getElementById("star2");
        var star3 = document.getElementById("star3");
        var star4 = document.getElementById("star4");
        var star5 = document.getElementById("star5");
        star1.style.color = "Yellow";
        star2.style.color = "Yellow";
        star3.style.color = "Yellow";
        star4.style.color = "black";
        star5.style.color = "black";
    };

    onClick4() {
        this.setState({
            rating: 4
        });
        var star1 = document.getElementById("star1");
        var star2 = document.getElementById("star2");
        var star3 = document.getElementById("star3");
        var star4 = document.getElementById("star4");
        var star5 = document.getElementById("star5");
        star1.style.color = "Yellow";
        star2.style.color = "Yellow";
        star3.style.color = "Yellow";
        star4.style.color = "Yellow";
        star5.style.color = "black";
    };

    onClick5() {
        this.setState({
            rating: 5
        });
        var star1 = document.getElementById("star1");
        var star2 = document.getElementById("star2");
        var star3 = document.getElementById("star3");
        var star4 = document.getElementById("star4");
        var star5 = document.getElementById("star5");
        star1.style.color = "Yellow";
        star2.style.color = "Yellow";
        star3.style.color = "Yellow";
        star4.style.color = "Yellow";
        star5.style.color = "Yellow";

    };

    onSubmit(e) {
        e.preventDefault();

        const review = {
            username: this.props.username,
            adID: this.state.adID,
            rating: this.state.rating,
            comments: this.state.comments
            
        };

        console.log(review);
        var x = document.querySelector(".interior");
            x.style.display = "none";
        var y = document.querySelector(".postSubmit");
            y.style.display = "block";

        //Axios.post('http://localhost:8080/review/add', review)
        Axios.post('https://final-project-node-server-zron8.ondigitalocean.app/review/add', review)
            .then(res => {
                console.log(res.data);

            })
            .catch(function (error) {
                console.log(error);
            })
        // remove afterwards
        //window.location = '/tab3';
    };

    
    render() {

        return (
            
            <div className="ratingPage">
                <div className="interior"> 
                    <div className="stars">
                        <button id="star1" onClick={this.onClick1}>★</button>
                        <button id="star2" onClick={this.onClick2}>★</button>
                        <button id="star3" onClick={this.onClick3}>★</button>
                        <button id="star4" onClick={this.onClick4}>★</button>
                        <button id="star5" onClick={this.onClick5}>★</button>
                    </div>

                    <input type="text" className="reviewComments" placeholder="Comments" value={this.state.comments} onChange={this.onChangeComments}/>

                    <div className="submitButton">
                        <button onClick={this.onSubmit}>Submit</button>
                    </div>
                </div>
                <div className="postSubmit">
                    <p> Thank you for your feedback!</p>
                </div>
                

            </div>
        );
    };
};

export default (Review);