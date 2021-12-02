import React, { Component } from 'react';
import Axios from 'axios';

class login extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onRouteToCreate = this.onRouteToCreate.bind(this);
        this.findUser = this.findUser.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '', 
            password: '',
            users: []
        };
    };

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    };

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    };

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
        };

        console.log(user);

        Axios.get('https://final-project-node-server-zron8.ondigitalocean.app/user')
            .then(response => {
                this.setState({ users: response.data });
                //console.log({ foodItems: response.data }); uncomment to see all entries of db in console
                this.findUser();
            })
            .catch((error) => {
                console.log(error);
            });

    };

    onRouteToCreate() {
        window.location = '/newUser';
    }

    findUser() {
        console.log("i am here");
        var i = 0;
        do {

            if (this.state.users[i].user.username === this.state.username) {
                console.log("found username");
                if (this.state.users[i].password === this.state.password) {
                    console.log("logged in!");
                }
                else {
                    console.log("Incorrect Password");
                }
            }
            else {
                i++;
            }

        }while(this.state.users[i].username !== this.state.username);

    }

    render() {
        return (
            <div className="createUserPage">
                <h3 className="createUserH3">Login</h3>
                <form className="createUserForm" onSubmit={this.onSubmit}>

                    <div className="">
                        <input type="text" placeholder="Username" className="createUserInput" value={this.state.username} onChange={this.onChangeUsername}/>
                    </div>

                    <div>
                        <input type="text" placeholder="Password" className="createUserInput" value={this.state.password} onChange={this.onChangePassword}/>
                    </div>

                    <div className="createUserButtonDiv">
                        <button className="createUserButton" onClick={this.onSubmit}>Login! </button>
                    </div>

                    <div className="createUserButtonDiv">
                        <button className="createUserButton" onClick={this.onRouteToCreate}>Create Account here! </button>
                    </div>
                    
                </form>
            </div>
        );
    };
};

export default (login);