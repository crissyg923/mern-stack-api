const typeDefs= `
type  User {
    _id: ID!
    username: String
    email: String
    savedBooks: [Book]!
}
type Book {
    bookId: ID!
    authors: [String]!
    description: String
    image: String
    link: String
    title: String
}

type Auth {
    token: ID!
    user: User
}
type Query {
    users: [User]
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(bookId: ID!): Book
    removeBook(bookId: ID!): Book
}
`;
module.exports= typeDefs;