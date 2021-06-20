import React, { useEffect, useState, FocusEvent, ChangeEvent } from 'react';

import InputMask from 'react-input-mask';

// @ts-ignore
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

// Material UI
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// utils
import { formatExpiry } from '../utils/DataFormater';

// constants
import { ICard } from '../constants/types';

// Formik
import { Formik, Form, Field, useFormik, FormikProps } from 'formik';
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
  cvc: "",
  name: "",
  phone: "",
};

type GetCardsQuery = {
  listCards: {
    items: ICard[]
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: "#dbe9fc",
    height: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    position: 'relative',
    top: '5rem',
  }
}));

function CardForm() {
  const classes = useStyles();
  
  const [formData, setFormData] = useState(initialFormData);
  const [focus, setFocus] = useState("");
  const [cards, setCards] = useState<ICard[]>([]);


  useEffect(() => {
    fetchCards();
  }, []);

  const handleInputFocus = (e: FocusEvent<any>) => {
    setFocus(e.target.name);
  }
  

  const handleFormChange = (name: string, { target }: React.ChangeEvent<any>) => {
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
    try {
      const response = await API.graphql({
        query: listCards
      }) as { data: GetCardsQuery };
      console.log(response);
      const newCards = response.data.listCards.items;
      console.log(newCards);
      // change this later!
      setCards(newCards);
    } catch (err) {
      console.log(err); 
    }
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

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <Cards
          {...formData}
          focused={focus}
        />
      </div>
      <Formik
        initialValues={initialFormData}
        onSubmit={(values) => {

        }}
        validationSchema={CardFormSchema}
      >
        {(props: FormikProps<ICard>) => {
          const {
            values,
            handleChange
          } = props;

          return (
            // <Form className={classes.form}>
              <Grid 
                container
                component={Form}
                className={classes.form}
                style={{
                  // backgroundColor: "#dbe9fc"
                }}
              >
                <Grid 
                  container 
                  item 
                  xs={12} 
                  md={5}
                  spacing={1}
                  style={{
                    backgroundColor: "white",
                    padding: "2rem"
                  }}
                >
                  <Grid 
                    item 
                    xs={12}
                    style={{
                      marginTop: '5rem',
                    }}
                  >
                    <TextField
                      fullWidth
                      label='Name'
                      name='name'
                      onChange={(e) => {
                        handleFormChange('name', e)
                        handleChange(e)
                      }}
                      value={values.name}
                      onFocus={handleInputFocus}
                      variant='outlined'
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <InputMask
                      mask="+(61) 999999999"
                      value={values.phone}
                      onChange={(e) => {
                        handleFormChange('phone', e)
                        handleChange(e)
                      }}
                    >
                      <TextField
                        fullWidth
                        label='Phone Number'
                        name='phone'
                        variant='outlined'
                      />
                    </InputMask>
                  </Grid>
                  <Grid item xs={12}>
                    <InputMask
                      mask='9999 9999 9999 9999'
                      value={values.number}
                      onChange={(e) => {
                        handleFormChange('number', e)
                        handleChange(e)
                      }}
                      onFocus={handleInputFocus}
                    >
                      <TextField
                        fullWidth
                        label='Card Number'
                        name='number'
                        variant='outlined'
                      />
                    </InputMask>
                  </Grid>
                  <Grid item xs={12}>
                    <InputMask
                      mask='99/99'
                      maskPlaceholder='MM/YY'
                      onChange={(e) => {
                        handleFormChange('expiry', e)
                        handleChange(e)
                      }}
                      value={values.expiry}
                      onFocus={handleInputFocus}
                    >
                      <TextField
                        fullWidth
                        label="Expiration Date"
                        name='expiry'
                        variant='outlined'
                      />
                    </InputMask>
                  </Grid>
                  <Grid item xs={12}>
                    <InputMask
                      mask='999'
                      onChange={(e: ChangeEvent) => {
                        handleFormChange('cvc', e)
                        handleChange(e)
                      }}
                      value={values.cvc}
                      onFocus={handleInputFocus}
                    >
                      <TextField
                        fullWidth
                        label='cvc'
                        name='cvc'
                        variant='outlined'
                      />
                    </InputMask>
                  </Grid>
                </Grid>
              </Grid>
            // </Form>
          );
        }}
      </Formik>
      <button onClick={createCard}>Save</button>
      <button onClick={fetchCards}>List Saved Cards</button>
    </div>
  );
}

export default CardForm;