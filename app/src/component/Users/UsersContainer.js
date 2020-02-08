import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import Users from "./Users";

const usersQuery = gql`
query usersList{
  users {
    id
    name
    lists {
      name
    }
  }
}
`;

export default () => {
    const {loading, error, data, refetch, fetchMore} = useQuery(
        usersQuery,
        {
            fetchPolicy: "cache-and-network",
        }
    );

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
        <Users data={data} refetch={refetch} fetchMoreTrigger={fetchMoreTrigger}/>
    );
};