/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCard = /* GraphQL */ `
  query GetCard($number: String!) {
    getCard(number: $number) {
      number
      expiry
      cvc
      name
      phone
      createdAt
      updatedAt
    }
  }
`;
export const listCards = /* GraphQL */ `
  query ListCards(
    $number: String
    $filter: ModelCardFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCards(
      number: $number
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        number
        expiry
        cvc
        name
        phone
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
