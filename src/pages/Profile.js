import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CreateUser from '../components/createUser.component';
import { Browser } from "@capacitor/browser";


export const Profile = () => {

    const { user, isLoading, buildAuthorizeUrl } = useAuth0();

    if (!user) {
        login();
    }

    const login = async () => {
        const url = await buildAuthorizeUrl();
        await Browser.open({ url, windowName: "_self" });
    };

    return (
        <div>
            <CreateUser username={user.name}/>
        </div>
    );
}

export default Profile;