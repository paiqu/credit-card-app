import React, { useEffect, useState, FocusEvent } from 'react';

// import Card from "@repay/react-credit-card";
// import "@repay/react-credit-card/dist/react-credit-card.css";

// @ts-ignore
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

// Material UI
import TextField from '@material-ui/core/TextField';

// utils
import { formatExpiry } from '../utils/DataFormater';

// constants
import { ICard } from '../constants/types';

// Formik
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';

// graphql
import { API, graphqlOperation } from 'aws-amplify';
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

type GetCardsQuery = {
  listCards: {
    items: ICard[]
  }
}

function CardForm() {
  const [formData, setFormData] = useState(initialFormData);

  const [focus, setFocus] = useState("");
  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const handleInputFocus = (e: FocusEvent<any>) => {
    setFocus(e.target.name);
  }
  

  const handleChange = (name: string) => ({ target }: React.ChangeEvent<HTMLInputElement>) => {
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
    const response = await API.graphql({
      query: listCards
    }) as { data: GetCardsQuery };
    console.log(response);

    const newCards = response.data.listCards.items;
    console.log(newCards);
    // change this later!
    setCards(newCards);
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
    setFormData(initialFormData);
    setFocus("");
  } 

  const CardFormSchema = Yup.object().shape({

  });

  const CardForm = () => {
    const formik = useFormik({
      initialValues: initialFormData,
      validationSchema: CardFormSchema,
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    });

    const { handleSubmit, handleChange, values } = formik;

    return (
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Name on Card</legend>
          <input
            name='name'
            onChange={handleChange}
            value={values.name}
            onFocus={handleInputFocus}
          />
        </fieldset>
        <fieldset>
          <legend>Phone Number</legend>
          <input
            name='phone'
            onChange={handleChange}
            value={values.phone}
          />
        </fieldset>
        <fieldset>
          <legend>Card Number</legend>
          <input
            name='number'
            placeholder="xxxx xxxx xxxx xxxx"
            onChange={handleChange}
            value={values.number}
            onFocus={handleInputFocus}
          />
        </fieldset>
        <fieldset>
          <legend>Expiration Date</legend>
          <input
            name='expiry'
            placeholder="MM/YY"
            pattern="\d\d/\d\d"
            onChange={handleChange}
            value={values.expiry}
            onFocus={handleInputFocus}
          />
        </fieldset>
        <fieldset>
          <legend>cvv</legend>
          <input
            name='cvc'
            placeholder="xxx"
            onChange={handleChange}
            value={values.cvv}
            onFocus={handleInputFocus}
          />
        </fieldset>
      </form>
    );
  };

  const MuiForm = () => {
    return (
      <div>
        <input
          name='name'
          onChange={handleChange('name')}
          value={formData.name}
          onFocus={handleInputFocus}
        />
        <input
          name='phone'
          onChange={handleChange('phone')}
          value={formData.phone}
        />
        <input
          name='number'
          placeholder="xxxx xxxx xxxx xxxx"
          onChange={handleChange('number')}
          value={formData.number}
          onFocus={handleInputFocus}
        />
        <input
          name='expiry'
          placeholder="MM/YY"
          pattern="\d\d/\d\d"
          onChange={handleChange('expiry')}
          value={formData.expiry}
          onFocus={handleInputFocus}
        />
        <input
          name='cvc'
          placeholder="xxx"
          onChange={handleChange('cvc')}
          value={formData.cvv}
          onFocus={handleInputFocus}
        />
      </div>
    );
  }

  return (
    <div>
      <Cards 
        {...formData} 
        focused={focus} 
        cvc={formData.cvv}
      />
      {/* <CardForm /> */}
      {/* <MuiForm /> */}
      <TextField
        label='Name'
        name='name'
        onChange={handleChange('name')}
        value={formData.name}
        onFocus={handleInputFocus}
        variant='outlined'
      />
      <TextField
        label='Phone Number'
        name='phone'
        onChange={handleChange('phone')}
        value={formData.phone}
        variant='outlined'
      />
      <TextField
        label='Card Number'
        name='number'
        placeholder="xxxx xxxx xxxx xxxx"
        onChange={handleChange('number')}
        value={formData.number}
        onFocus={handleInputFocus}
        variant='outlined'
      />
      <TextField
        label="Expiration Date"
        name='expiry'
        placeholder="MM/YY"
        onChange={handleChange('expiry')}
        value={formData.expiry}
        onFocus={handleInputFocus}
        variant='outlined'
      />
      <TextField
        label='cvc'
        name='cvc'
        placeholder="xxx"
        onChange={handleChange('cvc')}
        value={formData.cvv}
        onFocus={handleInputFocus}
        variant='outlined'
      />

      <button onClick={createCard}>Save</button>
      <button onClick={fetchCards}>List Saved Cards</button>
    </div>
  );
}

export default CardForm;