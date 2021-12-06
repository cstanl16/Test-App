/* import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired, isAuthenticated} from "@auth0/auth0-react";
import Loading from "./Loading";
export const PrivateRoute = () => {

    <Route
    component={withAuthenticationRequired(component, {
        onRedirecting: () => <Loading/>,
    })}
    {...args}
    />

}

export default PrivateRoute; */

import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useAuth0  } from '@auth0/auth0-react';
import { isPlatform } from "@ionic/react";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
    const {loading, isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (loading || isAuthenticated) {
            return;
        }
        const fn = async() => {
            await loginWithRedirect({
                appState: {targetUrl: path}
            });
        };
        fn();
    },
    [loading, isAuthenticated, loginWithRedirect, path]);

    const render = props => 
        isAuthenticated === true ? <Component {...props} /> : null;

        return <Route path={path} render={render} {...rest} />;

}

export default PrivateRoute;