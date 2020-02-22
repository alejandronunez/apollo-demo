import React from 'react';
import DashBoard from "./component/DashBoard/DashBoardContainer";
import { ApolloProvider } from '@apollo/react-hooks';

import client from "./client.boost";

function App() {
  return (
      <ApolloProvider client={client}>
        <DashBoard />
      </ApolloProvider>
  );
}

export default App;
