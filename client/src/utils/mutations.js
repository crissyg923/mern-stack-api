import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($bookId: ID!) {
    addBook(bookId: $bookId) {
      bookId
      title
      description
      image
      authors
    }
  }`;

  export const REMOVE_BOOK = gql`
    mutation removeBook($bookID: ID!) {
      removeBook(bookId: $bookId) {
        bookId
      }
    }`;


