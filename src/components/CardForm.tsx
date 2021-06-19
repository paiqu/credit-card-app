import React, { useState } from 'react';

import Card from "@repay/react-credit-card";

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
    </div>
  );
}

export default CardForm;