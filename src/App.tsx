import React, { useState, useEffect } from 'react';
import './App.css';
import { API } from 'aws-amplify';
import { GraphQLResult } from "@aws-amplify/api";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { listUsers } from './graphql/queries';
import { 
  createUser as createUserMutation,
  deleteUser as deleteUserMutation,
} from './graphql/mutations';

const initialFormState = {
  username: '',
  email: '',
}

type IUser = {
  username: string,
  email?: string,
}

type ICard = {
  number: number,
}

type GetUsersQuery = {
  listUsers: {
    items: IUser[],
  }
}

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [formData, setFormData] = useState(initialFormState);

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
    try { 
      await API.graphql({ 
        query: createUserMutation,
        variables: {
          input: formData,
        }
      });
    } catch (err) {
      console.log(err);
    }

    setUsers([ ...users, formData ]);
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
  }

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
      <div style={{ marginBottom: 30 }}>
        {
          users.map(user => (
            <div key={user.username}>
              <h2>{user.username}</h2>
              <p>{user.email}</p>
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
