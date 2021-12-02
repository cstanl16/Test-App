import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CreateUser from '../components/createUser.component';


export const Profile = () => {

    const { user } = useAuth0();

    return (
        <div>
            <CreateUser username={user.name}/>
        </div>
    );
}

export default Profile;