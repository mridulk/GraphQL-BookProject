import React from 'react';
import logo from './logo.svg';
import ApolloClient from 'apollo-boost';
// import './App.css';
import {ApolloProvider} from '@apollo/react-hooks'
import AuthorList from './components/Author'
import BookList from './components/Book'

const client=new ApolloClient({
  uri:'http://localhost:3000/graphql'
})
function App() {
  return (
    <ApolloProvider client={client}>
    <div id="main">
      <h1>Book Lists</h1>
      <BookList/>
      <AuthorList/>
    </div>
    </ApolloProvider>
  );
}

export default App;
