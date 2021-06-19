import React, { useState, FocusEvent } from 'react';

// import Card from "@repay/react-credit-card";
// import "@repay/react-credit-card/dist/react-credit-card.css";

// @ts-ignore
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

// utils
import { formatExpiry } from '../utils/DataFormater';

// graphql
import { API } from 'aws-amplify';
import { 
  createCard as createCardMutation 
} from '../graphql/mutations';
import { listCards } from '../graphql/queries';

const initialFormData = {
  number: "",
  expiry: "",
  cvv: "",
  name: "",
  phone: "",
};

type ICard = {
  number: string,
  expiry: string,
  cvv: string,
  name: string,
  phone: string,
}

type GetCardsQuery = {
  listCards: {
    items: ICard[]
  }
}

function CardForm() {
  const [formData, setFormData] = useState(initialFormData);

  const [focus, setFocus] = useState("");
  const [cards, setCards] = useState<ICard[]>([]);

  const handleInputFocus = (e: FocusEvent<any>) => {
    setFocus(e.target.name);
  }
  

  const handleChange = (name: string, { target }: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = target.value;
    if (target.name === "expiry") {
      newValue = formatExpiry(newValue);
    }

    setFormData({
      ...formData,
      [name]: newValue,
    })
  };

  async function fetchCards() {
    const apiData = await API.graphql({
      query: listCards
    }) as { data: GetCardsQuery };
    setCards(apiData.data.listCards.items);
    console.log(cards);
  }

  async function createCard() {
    if (!formData.number) return;
    try {
      await API.graphql({
        query: createCardMutation,
        variables: {
          input: formData
        }
      });
      console.log("card created");
    } catch (err) {
      console.log(err);
    }
  } 

  return (
    <div>
      <Cards 
        {...formData} 
        focused={focus} 
        cvc={formData.cvv}
      />
      <fieldset>
        <legend>Name on Card</legend>
        <input
          name='name'
          onChange={e => handleChange('name', e)}
          value={formData.name}
          onFocus={handleInputFocus}
        />
      </fieldset>
      <fieldset>
        <legend>Phone Number</legend>
        <input
          name='phone'
          onChange={e => handleChange('phone', e)}
          value={formData.phone}
          onFocus={handleInputFocus}
        />
      </fieldset>
      <fieldset>
        <legend>Card Number</legend>
        <input
          name='number'
          placeholder="xxxx xxxx xxxx xxxx"
          onChange={e => handleChange('number', e)}
          value={formData.number}
          onFocus={handleInputFocus}
        />
      </fieldset>
      <fieldset>
        <legend>Expiration Date</legend>
        <input
          name='expiry'
          placeholder="MM/YY"
          pattern="\d\d/\d\d"
          onChange={e => handleChange('expiry', e)}
          value={formData.expiry}
          onFocus={handleInputFocus}
        />
      </fieldset>
      <fieldset>
        <legend>cvv</legend>
        <input
          name='cvc'
          placeholder="xxx"
          onChange={e => handleChange('cvv', e)}
          value={formData.cvv}
          onFocus={handleInputFocus}
        />
      </fieldset>
      <button onClick={createCard}>Save</button>
      <button onClick={fetchCards}>List Saved Cards</button>
    </div>
  );
}

export default CardForm;