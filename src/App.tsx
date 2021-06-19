import React, { useState, useEffect } from 'react';
import './App.css';
import { API } from 'aws-amplify';
import { GraphQLResult } from "@aws-amplify/api";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { listCards } from './graphql/queries';
import { 
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

type ICard = {
  number: string,
  name: string,
  expiry: string,
  cvv: string,
}

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {

  }, []);

  const handleChange = (name: string, event: React.FormEvent<EventTarget>) => {
    setFormData({
      ...formData,
      [name]: (event.target as HTMLInputElement).value,
    })
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
      {/* <button onClick={() => createUser()}>Create User</button>
      <button onClick={() => addCardToUser(formData.username, defaultCard)}>Add Card to User {formData.username}</button> */}
      <div style={{ marginBottom: 30 }}>
        {
          users.map(user => (
            <div key={user.username}>
              <h2>{user.username}</h2>
              <p>{user.email}</p>
              <p>{user.name}</p>
              {/* <p>Cards: { user.cards.length > 0 &&
                  user.cards.map(card => (
                    <p>{card.number}</p>
                  )) 
              }</p> */}
            </div>
          ))
        }
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
