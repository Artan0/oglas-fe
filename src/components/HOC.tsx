import { useParams } from 'react-router-dom';
import React from 'react';

function withParams(Component: any) {
    return (props: any) => {
        const params = useParams();
        return <Component {...props} params={params} />;
    };
}

export default withParams;
