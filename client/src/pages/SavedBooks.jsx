import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom'
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { REMOVE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
  // const [userData, setUserData] = useState({});

  // const userDataLength = Object.keys(userData).length;
  const { username: userParam } = useParams();
  const{ loading, data} = useQuery(QUERY_ME, {
    variables: { username: userParam },
  });
  const [removeBook, {error}] = useMutation(REMOVE_BOOK);
  const user = data?.me || {};
  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;

  //       if (!token) {
  //         return false;
  //       }
  //       const response = await getMe ({
  //         variables: { username: Auth.getProfile().data.username }
  //       })
  //       setUserData(response);
  //     } catch(err) {
  //       console.error(error);
      
  //     }};
  //     getUserData();
  //   }, [error, getMe, userDataLength])

if (loading) {
  return<div>Loading...</div>
}
if (!user?.username) {
  return (
    <h4>
      You need to be logged in to see this. Use the navigation links above to
      sign up or log in!
    </h4>
  );
}
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }

    try {
      const {data} = await removeBook({
        variables: { bookId},
      });
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!data) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {user.savedBooks.length
            ? `Viewing ${user.savedBooks.length} saved ${user.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {user.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
