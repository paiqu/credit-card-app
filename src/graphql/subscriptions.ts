/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      username
      name
      email
      cards {
        items {
          username
          number
          expiry
          cvv
          name
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      username
      name
      email
      cards {
        items {
          username
          number
          expiry
          cvv
          name
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      username
      name
      email
      cards {
        items {
          username
          number
          expiry
          cvv
          name
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCard = /* GraphQL */ `
  subscription OnCreateCard {
    onCreateCard {
      username
      number
      expiry
      cvv
      name
      user {
        username
        name
        email
        cards {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCard = /* GraphQL */ `
  subscription OnUpdateCard {
    onUpdateCard {
      username
      number
      expiry
      cvv
      name
      user {
        username
        name
        email
        cards {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCard = /* GraphQL */ `
  subscription OnDeleteCard {
    onDeleteCard {
      username
      number
      expiry
      cvv
      name
      user {
        username
        name
        email
        cards {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
