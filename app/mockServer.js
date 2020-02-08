import graphql_tools from "graphql-tools";
import casual from 'casual-browserify';
import express from 'express';
import cors from 'cors';

// The GraphQL schema. Described in more detail here:
// https://medium.com/apollo-stack/the-apollo-server-bc68762e93b
const schema = `
  type User {
    id: ID!
    name: String
    lists: [List]
  }
  type List {
    id: ID!
    name: String
    owner: User
    incomplete_count: Int
    tasks(completed: Boolean): [Task]
  }
  type Task {
    id: ID!
    text: String
    completed: Boolean
    list: List
  }
  type RootQuery {
    user(id: ID): User
    users: [User]
  }
  schema {
    query: RootQuery
  }
`;

// Mock functions are defined per type and return an
// object with some or all of the fields of that type.
// If a field on the object is a function, that function
// will be used to resolve the field if the query requests it.
const server = graphql_tools.mockServer(schema, {
    RootQuery: () => ({
        user: (o, { id }) => ({ id }),
    }),
    List: () => ({
        name: () => casual.word,
        tasks: () => new graphql_tools.MockList(4, (o, { completed }) => ({ completed })),
    }),
    Task: () => ({ text: casual.words(10) }),
    User: () => ({ name: casual.name }),
});

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
    let response = server.query(req.body.query, req.body.variables);
    response.then(data => res.send(JSON.stringify(data)));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// console.log(server.query(`
// query tasksForUser{
//   user(id: 6) {
//     id
//     name
//     lists {
//       name
//       completeTasks: tasks(completed: true) {
//         completed
//         text
//       }
//       incompleteTasks: tasks(completed: false) {
//         completed
//         text
//       }
//       anyTasks: tasks {
//         completed
//         text
//       }
//     }
//   }
// }`));