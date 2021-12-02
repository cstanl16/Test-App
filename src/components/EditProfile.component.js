import React, { Component } from 'react';
import Axios from 'axios';
import { Auth0Context } from '@auth0/auth0-react';

class EditProfile extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDogType = this.onChangeDogType.bind(this);
        this.onChangeDogName = this.onChangeDogName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            dogType: '',
            dogName: ''
        };
    };

    componentDidMount() {
        Axios.get('https://final-project-node-server-zron8.ondigitalocean.app/user/' + this.props.username)
            .then(response => {
                console.log(response);
                this.setState({
                    name: response.data.name,
                    email: response.data.email,
                    dogType: response.data.dogType,
                    dogName: response.data.dogName
                })
            })
            .catch(function (error) {
                if (error === '400') {
                    console.log("Hello");
                }
                
            })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    };


    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    };


    onChangeDogType(e) {
        this.setState({
            dogType: e.target.value
        });
    };

    onChangeDogName(e) {
        this.setState({
            dogName: e.target.value
        });
    }; 

    onSubmit(e) {
        e.preventDefault();

        const { user } = this.context;
        const name = user.name;

        const profile = {
            name: this.state.name,
            username: name,
            email: this.state.email,
            dogType: this.state.dogType,
            dogName: this.state.dogName

        };

        console.log(profile);

        Axios.post('https://final-project-node-server-zron8.ondigitalocean.app/user/update/' + this.props.username, profile)
        //Axios.post('http://localhost:8080/user/update/' + this.props.username, profile)
            .then(res => {
                console.log(res.data);
                window.location = '/tab3';
            })
            .catch(function (error) {
                alert(error);
            })
        // remove afterwards
        //window.location = '/tab3';
    };

    static contextType = Auth0Context;
    
    render() {
        const { user } = this.context;
        const name = user.name; 

        return (
            <div className="editUserPage">
                <h3 className="editUserH3">Create account</h3>
                <form className="createUserForm" onSubmit={this.onSubmit}>

                    <div className="">
                        <input type="text" placeholder="Full Name" className="editUserInput" value={this.state.name} onChange={this.onChangeName}/>
                    </div>

                    <div>
                        <input type="text" placeholder={name} className="editUserInput" value={name} readOnly/>
                    </div>

                    <div>
                        <input type="text" placeholder="email" className="editUserInput" value={this.state.email} onChange={this.onChangeEmail}/>
                    </div>

                    <div>
                            <input type="text" placeholder="Dog Type" className="editUserInput" value={this.state.dogType} onChange={this.onChangeDogType}/>
                    </div>

                    <div>
                            <input type="text" placeholder="Dog Name" className="editUserInput" value={this.state.dogName} onChange={this.onChangeDogName}/>
                    </div>

                    <div className="editUserButtonDiv">
                        <button id="createUserSubmitButton" className="editUserButton" onSubmit={this.onSubmit}>done! </button>
                    </div>
                    
                </form>
            </div>
        );
    };
};

export default (EditProfile);