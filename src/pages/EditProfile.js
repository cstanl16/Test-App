import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import EditProfile from '../components/EditProfile.component';


export const EditProfilePage = () => {

    const { user } = useAuth0();

    return (
        <div>
            <EditProfile username={user.name}/>
        </div>
    );
}

export default EditProfilePage;