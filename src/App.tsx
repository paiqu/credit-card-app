import React, { useState, useEffect } from 'react';
import './App.css';
import { API } from 'aws-amplify';
import { GraphQLResult } from "@aws-amplify/api";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { listUsers } from './graphql/queries';
import { 
  createUser as createUserMutation,
  deleteUser as deleteUserMutation,
  createCard as createCardMutation,
  deleteCard as deleteCardMutation,
} from './graphql/mutations';

const initialFormState = {
  username: '',
  name: '',
  email: '',
};

const defaultCard: ICard = {
  number: "888888888888888",
  name: "First Last",
  expiry: "02/04",
  cvv: "817",
};

type IUser = {
  username: string,
  name: string,
  email: string,
  cards: ICard[],
}

type ICard = {
  number: string,
  name: string,
  expiry: string,
  cvv: string,
}

type GetUsersQuery = {
  listUsers: {
    items: IUser[],
  }
}

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {     
      const apiData = (await API.graphql({ query: listUsers })) as {
        data: GetUsersQuery
      };
      setUsers(apiData.data.listUsers.items);
    } catch (err) {
      console.log(err);
    }
  }

  async function createUser() {
    if (!formData.username) return;
    let { username, name, email } = formData;
    try { 
      await API.graphql({ 
        query: createUserMutation,
        variables: {
          input: {
            username,
            name,
            email,
          },
        }
      });
    } catch (err) {
      console.log(err);
    }

    setUsers([ 
      ...users, 
      {
        username: formData.username,
        name: "First Last",
        email: formData.email,
        cards: [],
      }
    ]);
    setFormData(initialFormState);
  }

  async function deleteUser({ username }: IUser) {
    const newUsersArray = users.filter(user => user.username !== username);
    setUsers(newUsersArray);
    await API.graphql({
      query: deleteUserMutation,
      variables: {
        input: { username }
      }
    });
  }

  const handleChange = (name: string, event: React.FormEvent<EventTarget>) => {
    setFormData({
      ...formData,
      [name]: (event.target as HTMLInputElement).value,
    })
  };

  async function addCardToUser (username: string, { number, expiry, cvv}: ICard){
    const name = "First Last";

    try { 
      await API.graphql({ 
        query: createCardMutation,
        variables: {
          input: {
            username,
            number,
            expiry,
            name,
            cvv
          },
        }
      });
      console.log("added!");
    } catch (err) {
      console.log(err);
    }

    const newUsersArray = users.slice();
    newUsersArray.map(user => {
      if (user.username === username) {
        user.cards.push({
          number,
          name,
          expiry,
          cvv
        });
      }
    })
    setUsers(newUsersArray);
  };

  return (
    <div className="App">
      <input 
        onChange={event => handleChange('username', event)}
        placeholder="Username"
        value={formData.username}
      />
      <input 
        onChange={event => handleChange('email', event)}
        placeholder="Email"
        value={formData.email}
      />
      <button onClick={() => createUser()}>Create User</button>
      <button onClick={() => addCardToUser(formData.username, defaultCard)}>Add Card to User {formData.username}</button>
      <div style={{ marginBottom: 30 }}>
        {
          users.map(user => (
            <div key={user.username}>
              <h2>{user.username}</h2>
              <p>{user.email}</p>
              <p>{user.name}</p>
              <p>Cards: { user.cards.length > 0 &&
                  user.cards.map(card => (
                    <p>{card.number}</p>
                  )) 
              }</p>
              <button onClick={() => deleteUser(user)}>Delete User</button>
            </div>
          ))
        }
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
