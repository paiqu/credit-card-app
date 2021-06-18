/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  username: string,
  name: string,
  email: string,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type User = {
  __typename: "User",
  username: string,
  name: string,
  email: string,
  cards?: ModelCardConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelCardConnection = {
  __typename: "ModelCardConnection",
  items?:  Array<Card | null > | null,
  nextToken?: string | null,
};

export type Card = {
  __typename: "Card",
  username: string,
  number: string,
  expiry: string,
  cvv: string,
  name: string,
  user: User,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInput = {
  username: string,
  name?: string | null,
  email?: string | null,
};

export type DeleteUserInput = {
  username: string,
};

export type CreateCardInput = {
  username: string,
  number: string,
  expiry: string,
  cvv: string,
  name: string,
};

export type ModelCardConditionInput = {
  expiry?: ModelStringInput | null,
  cvv?: ModelStringInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelCardConditionInput | null > | null,
  or?: Array< ModelCardConditionInput | null > | null,
  not?: ModelCardConditionInput | null,
};

export type UpdateCardInput = {
  username: string,
  number: string,
  expiry?: string | null,
  cvv?: string | null,
  name?: string | null,
};

export type DeleteCardInput = {
  username: string,
  number: string,
};

export type ModelUserFilterInput = {
  username?: ModelStringInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items?:  Array<User | null > | null,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelCardFilterInput = {
  username?: ModelStringInput | null,
  number?: ModelStringInput | null,
  expiry?: ModelStringInput | null,
  cvv?: ModelStringInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelCardFilterInput | null > | null,
  or?: Array< ModelCardFilterInput | null > | null,
  not?: ModelCardFilterInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    username: string,
    name: string,
    email: string,
    cards?:  {
      __typename: "ModelCardConnection",
      items?:  Array< {
        __typename: "Card",
        username: string,
        number: string,
        expiry: string,
        cvv: string,
        name: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    username: string,
    name: string,
    email: string,
    cards?:  {
      __typename: "ModelCardConnection",
      items?:  Array< {
        __typename: "Card",
        username: string,
        number: string,
        expiry: string,
        cvv: string,
        name: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    username: string,
    name: string,
    email: string,
    cards?:  {
      __typename: "ModelCardConnection",
      items?:  Array< {
        __typename: "Card",
        username: string,
        number: string,
        expiry: string,
        cvv: string,
        name: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCardMutationVariables = {
  input: CreateCardInput,
  condition?: ModelCardConditionInput | null,
};

export type CreateCardMutation = {
  createCard?:  {
    __typename: "Card",
    username: string,
    number: string,
    expiry: string,
    cvv: string,
    name: string,
    user:  {
      __typename: "User",
      username: string,
      name: string,
      email: string,
      cards?:  {
        __typename: "ModelCardConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCardMutationVariables = {
  input: UpdateCardInput,
  condition?: ModelCardConditionInput | null,
};

export type UpdateCardMutation = {
  updateCard?:  {
    __typename: "Card",
    username: string,
    number: string,
    expiry: string,
    cvv: string,
    name: string,
    user:  {
      __typename: "User",
      username: string,
      name: string,
      email: string,
      cards?:  {
        __typename: "ModelCardConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCardMutationVariables = {
  input: DeleteCardInput,
  condition?: ModelCardConditionInput | null,
};

export type DeleteCardMutation = {
  deleteCard?:  {
    __typename: "Card",
    username: string,
    number: string,
    expiry: string,
    cvv: string,
    name: string,
    user:  {
      __typename: "User",
      username: string,
      name: string,
      email: string,
      cards?:  {
        __typename: "ModelCardConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  username: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    username: string,
    name: string,
    email: string,
    cards?:  {
      __typename: "ModelCardConnection",
      items?:  Array< {
        __typename: "Card",
        username: string,
        number: string,
        expiry: string,
        cvv: string,
        name: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  username?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      username: string,
      name: string,
      email: string,
      cards?:  {
        __typename: "ModelCardConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetCardQueryVariables = {
  username: string,
  number: string,
};

export type GetCardQuery = {
  getCard?:  {
    __typename: "Card",
    username: string,
    number: string,
    expiry: string,
    cvv: string,
    name: string,
    user:  {
      __typename: "User",
      username: string,
      name: string,
      email: string,
      cards?:  {
        __typename: "ModelCardConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCardsQueryVariables = {
  username?: string | null,
  number?: ModelStringKeyConditionInput | null,
  filter?: ModelCardFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCardsQuery = {
  listCards?:  {
    __typename: "ModelCardConnection",
    items?:  Array< {
      __typename: "Card",
      username: string,
      number: string,
      expiry: string,
      cvv: string,
      name: string,
      user:  {
        __typename: "User",
        username: string,
        name: string,
        email: string,
        createdAt: string,
        updatedAt: string,
      },
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    username: string,
    name: string,
    email: string,
    cards?:  {
      __typename: "ModelCardConnection",
      items?:  Array< {
        __typename: "Card",
        username: string,
        number: string,
        expiry: string,
        cvv: string,
        name: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    username: string,
    name: string,
    email: string,
    cards?:  {
      __typename: "ModelCardConnection",
      items?:  Array< {
        __typename: "Card",
        username: string,
        number: string,
        expiry: string,
        cvv: string,
        name: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    username: string,
    name: string,
    email: string,
    cards?:  {
      __typename: "ModelCardConnection",
      items?:  Array< {
        __typename: "Card",
        username: string,
        number: string,
        expiry: string,
        cvv: string,
        name: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCardSubscription = {
  onCreateCard?:  {
    __typename: "Card",
    username: string,
    number: string,
    expiry: string,
    cvv: string,
    name: string,
    user:  {
      __typename: "User",
      username: string,
      name: string,
      email: string,
      cards?:  {
        __typename: "ModelCardConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCardSubscription = {
  onUpdateCard?:  {
    __typename: "Card",
    username: string,
    number: string,
    expiry: string,
    cvv: string,
    name: string,
    user:  {
      __typename: "User",
      username: string,
      name: string,
      email: string,
      cards?:  {
        __typename: "ModelCardConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCardSubscription = {
  onDeleteCard?:  {
    __typename: "Card",
    username: string,
    number: string,
    expiry: string,
    cvv: string,
    name: string,
    user:  {
      __typename: "User",
      username: string,
      name: string,
      email: string,
      cards?:  {
        __typename: "ModelCardConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};
