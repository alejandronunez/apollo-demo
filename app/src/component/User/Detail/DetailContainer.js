import React from 'react';
import {useQuery} from '@apollo/react-hooks';

import UserDetail from "../../User/Detail/Detail";
import {userQuery} from "../schema";

export default (props) => {
    const {error, data} = useQuery(
        userQuery,
        {
            fetchPolicy: "cache-and-network",
            variables: { id: props.id },
        }
    );

    // if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <UserDetail
            data={data}
        />
    );
};