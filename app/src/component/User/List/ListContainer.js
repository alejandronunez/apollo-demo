import React from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import UserList from "../../User/List/List";
import {openMutation, openQuery} from "../../DashBoard/schema";
import {usersQuery} from "../schema";

export default () => {
    const {loading, error, data, refetch, fetchMore} = useQuery(
        usersQuery,
        {
            fetchPolicy: "cache-and-network",
        }
    );

    const {data: {menuOpen}} = useQuery(openQuery);
    const [openMutate] = useMutation(openMutation);

    // if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const fetchMoreTrigger = () => {
        fetchMore({
            variables: {
                offset: 5
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;

                // return fetchMoreResult;

                return Object.assign({}, prev, {
                    users: [...prev.users, ...fetchMoreResult.users]
                });
            }
        })
    };

    return (
        <UserList
            data={data}
            refetch={refetch}
            fetchMoreTrigger={fetchMoreTrigger}
            menuOpen={menuOpen}
            openMutate={(status) => openMutate({ variables: { menuOpen: status } })}
        />
    );
};