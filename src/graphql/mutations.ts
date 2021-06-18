/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createCard = /* GraphQL */ `
  mutation CreateCard(
    $input: CreateCardInput!
    $condition: ModelCardConditionInput
  ) {
    createCard(input: $input, condition: $condition) {
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
export const updateCard = /* GraphQL */ `
  mutation UpdateCard(
    $input: UpdateCardInput!
    $condition: ModelCardConditionInput
  ) {
    updateCard(input: $input, condition: $condition) {
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
export const deleteCard = /* GraphQL */ `
  mutation DeleteCard(
    $input: DeleteCardInput!
    $condition: ModelCardConditionInput
  ) {
    deleteCard(input: $input, condition: $condition) {
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
