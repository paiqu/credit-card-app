import React, { useState, FocusEvent } from 'react';

// import Card from "@repay/react-credit-card";
// import "@repay/react-credit-card/dist/react-credit-card.css";

// @ts-ignore
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

// utils
import { formatExpiry } from '../utils/DataFormater';


function CardForm() {
  const [formData, setFormData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
    phone: "",
  });

  const [focus, setFocus] = useState("");

  const handleInputFocus = (e: FocusEvent<any>) => {
    setFocus(e.target.name);
  }
  

  const handleChange = (name: string, event: React.FormEvent<EventTarget>) => {
    setFormData({
      ...formData,
      [name]: (event.target as HTMLInputElement).value,
    })
  };

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
    </div>
  );
}

export default CardForm;