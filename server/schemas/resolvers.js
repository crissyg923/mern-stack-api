const { User, bookSchema } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
      
      const user = await User.findOne({ _id: context.user._id }).select('-__v -password').populate('savedBooks');
      return user
    }
    throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser= User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              savedBooks: { bookId },
            }
          },
          {
            new: true,
            runValidators: true,
          },
        ).populate('savedBooks');
        return updatedUser;
      }
      throw AuthenticationError('You need to be logged in to save books');
    },
    removeBook: async (parent, { bookId }, context) => {
      if(context.user) {
        const updatedUser = User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: { savedBooks: bookId}
          },
          { new: true},
        ).populate('savedBooks');
        return updatedUser;
      }
      throw AuthenticationError('You need to be logged in to save books');
    }
  },
};

module.exports = resolvers;
