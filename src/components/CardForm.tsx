import React, { useState } from 'react';

import Card from "@repay/react-credit-card";
import "@repay/react-credit-card/dist/react-credit-card.css";


function CardForm() {
  const [formData, setFormData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
    phone: "",
  });

  const handleChange = (name: string, event: React.FormEvent<EventTarget>) => {
    setFormData({
      ...formData,
      [name]: (event.target as HTMLInputElement).value,
    })
  };

  return (
    <div>
      <fieldset>
        <legend>Name on Card</legend>
        <input
          name='name'
          onChange={e => handleChange('name', e)}
          value={formData.name}
        />
      </fieldset>
      <fieldset>
        <legend>Phone Number</legend>
        <input
          name='phone'
          onChange={e => handleChange('phone', e)}
          value={formData.phone}
        />
      </fieldset>
      <fieldset>
        <legend>Card Number</legend>
        <input
          name='number'
          placeholder="xxxx xxxx xxxx xxxx"
          onChange={e => handleChange('number', e)}
          value={formData.number}
        />
      </fieldset>
      <fieldset>
        <legend>Expiration Date</legend>
        <input
          name='expiry'
          placeholder="MM/YY"
          onChange={e => handleChange('expiry', e)}
          value={formData.expiry}
        />
      </fieldset>
      <fieldset>
        <legend>cvv</legend>
        <input
          name='cvv'
          placeholder="xxx"
          onChange={e => handleChange('cvv', e)}
          value={formData.cvv}
        />
      </fieldset>
      <Card {...formData} />
    </div>
  );
}

export default CardForm;