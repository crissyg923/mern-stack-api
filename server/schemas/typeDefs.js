const typeDefs= `
type  User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [bookSchema]!
}
type Book {
    _id: ID
    authors: [authors]
    description: String
    bookId: String
    image: String
    title: String
}
type Auth {
    token: ID!
    user: User
}
type Query {
    books: [Book]
    book(bookId: bookId!): Book
    me: User
}
`