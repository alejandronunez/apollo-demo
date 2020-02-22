import gql from "graphql-tag";


export const userfragment = gql`
fragment userBasic on User {
    id
    name
    address
}
`;

export const usersQuery = gql`
query usersList{
  users {
    ...userBasic
    lists {
      name
    }
  }
}
${userfragment}
`;

export const userQuery = gql`
query userDetail($id: ID){
  user(id: $id) {
    ...userBasic
    lists {
      name
      completeTasks: tasks(completed: true) {
        completed
        text
      }
      incompleteTasks: tasks(completed: false) {
        completed
        text
      }
    }
  }
}
${userfragment}
`;