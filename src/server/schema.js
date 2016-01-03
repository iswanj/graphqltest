import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInterfaceType
} from 'graphql/type';

import co from 'co';
import { User, Account } from './def/userService';

/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
function getProjection (fieldASTs) {
  return fieldASTs.selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = 1;

    return projections;
  }, {});
}

let accountType = new GraphQLObjectType({
    name: 'Account',
    description: 'User account creator',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The id of the account'
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Account name'
        },
        balance: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: 'Account balance'
        },
        lastupdated: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Account last updated date'
        }
    })
});

// const HasAccount = new GraphQLInterfaceType({
//   name: "HasAccount",
//   description: "This type has an author",
//   fields: () => ({
//     account: {type: accountType}
//   }),
//   resolveType: (obj) => {
//     if(obj.title) {
//       return Post;
//     } else if(obj.replies) {
//       return Comment;
//     } else {
//       return null;
//     }
//   }
// });

let userType = new GraphQLObjectType({
  name: 'User',
  description: 'User creator',
  fields: () => ({
    id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The id of the user.',
    },
    fullname: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The name of the user.',
    },
    username: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Unique username'
    },
    password: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'User password'
    },
    account: {
        type: accountType,
        description: 'User account',
        resolve: (user, params, source, fieldASTs) => {
            let projections = getProjection(fieldASTs);
            let id = user.account;
            return Account.findById(id, projections)
        }
    },
    email: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'User email address'
    },
    status: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'User status (active or disabled)'
    }
  })
});

let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            user: {
                type: userType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (root, {id}, source, fieldASTs) => {
                    var projections = getProjection(fieldASTs);
                    return User.findById(id, projections);
                }
            }
        }
    }),
});

export var getProjection;
export default schema;
