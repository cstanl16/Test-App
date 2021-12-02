import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Review from '../components/Review.component';


export const ReviewPage = () => {

    const { user } = useAuth0();

    return (
        <div>
            <Review username={user.name}/>
        </div>
    );
}

export default ReviewPage;