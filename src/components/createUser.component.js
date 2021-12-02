import React, { Component } from 'react';
import Axios from 'axios';
import { Auth0Context } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';

class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            dogType: '',
            dogName: '',
            reviewerUsername: [],
            adID: [],
            rating: [],
            comments: []
        };
    };

    async componentDidMount() {
        let x = this.props.username;
        await Axios.get('https://final-project-node-server-zron8.ondigitalocean.app/user/' + x)
        //await Axios.get('http://localhost:8080/user/' + this.props.username)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    email: response.data.email,
                    dogType: response.data.dogType,
                    dogName: response.data.dogName
                })
            })
            .catch(function (error) {
                if (error) {
                    const newUser = {
                        username: x
                    };
                    //Axios.post('http://localhost:8080/user/add', newUser)
                    Axios.post('https://final-project-node-server-zron8.ondigitalocean.app/user/add', newUser)
                        .then(response => {
                            console.log(response)
                        })
                }
                
            })

        await Axios.get('https://final-project-node-server-zron8.ondigitalocean.app/review/')
        //await Axios.get('http://localhost:8080/review/')
            .then(response => {
                var length = response.data.length;
                var i = 0;
                while (i < length) {
                    
                    this.setState({1: this.state.adID.push(response.data[i].adID) })
                    this.setState({2: this.state.reviewerUsername.push(response.data[i].reviewerUsername) })
                    this.setState({3: this.state.rating.push(response.data[i].rating) })
                    this.setState({4: this.state.comments.push(response.data[i].comments) })
                    i = i + 1;
                }

            })
            .catch(function (error) {
                console.log(error);
            })
    }


    onSubmit() {
        window.location = '/editProfile';
    };

    static contextType = Auth0Context;
    
    render() {
        const { user } = this.context;
        const name = user.name; 

        return (
            <div className="createUserPage">
                <h3 className="createUserH3">Profile Page</h3>

                    <div className="profileDiv">
                        <input type="text" placeholder="Full Name" className="createUserInput" value={this.state.name} readOnly/>
                        <input type="text" placeholder={name} className="createUserInput" value={name} readOnly/>
                        <input type="text" placeholder="email" className="createUserInput" value={this.state.email} readOnly/>
                        <input type="text" placeholder="Dog Type" className="createUserInput" value={this.state.dogType} readOnly/>
                        <input type="text" placeholder="Dog Name" className="createUserInput" value={this.state.dogName} readOnly/>
                    </div>
                     <div className="reviewPost">
                        <p className="createUserInput">{this.state.reviewerUsername[0]}</p>
                        <p className="createUserInput">{this.state.adID[0]}</p>
                        <p className="createUserInput">{this.state.rating[0]}</p>
                        <p className="createUserInput">{this.state.comments[0]}</p>
                   </div>
                    {/* <div className="reviewPost">
                        <p className="createUserInput">{this.state.reviewerUsername[1]}</p>
                        <p className="createUserInput">{this.state.adID[1]}</p>
                        <p className="createUserInput">{this.state.rating[1]}</p>
                        <p className="createUserInput">{this.state.comments[1]}</p>
                    </div>  */}

                    <div className="createUserButtonDiv">
                        <button id="createUserSubmitButton" className="createUserButton" onClick={this.onSubmit}>Edit Account </button>
                    </div>

                    <div className="createUserButtonDiv">
                        <LogoutButton className="createUserButton"/>
                    </div>
                    
            </div>
        );
    };
};

export default (CreateUser);