const typeDefs= `
type  User {
    _id: ID
    username: String
    email: String
    password: String
    savedbooks: [bookSchema]!
}
type bookSchema {
    authors: [String]!
    description: String
    bookId: String
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
    user(username: String!): User
    savedbooks: [bookSchema]
    me: User
}
`
module.exports= typeDefs;