/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($username: String!) {
    getUser(username: $username) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $username: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      username: $username
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        username
        name
        email
        cards {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCard = /* GraphQL */ `
  query GetCard($username: String!, $number: String!) {
    getCard(username: $username, number: $number) {
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
export const listCards = /* GraphQL */ `
  query ListCards(
    $username: String
    $number: ModelStringKeyConditionInput
    $filter: ModelCardFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCards(
      username: $username
      number: $number
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        username
        number
        expiry
        cvv
        name
        user {
          username
          name
          email
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
