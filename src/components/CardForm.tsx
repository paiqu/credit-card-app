import React, { useEffect, useState, FocusEvent, ChangeEvent } from 'react';

import InputMask from 'react-input-mask';

// @ts-ignore
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

// Material UI
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  const handleInputFocus = (e: FocusEvent<any>) => {
    setFocus(e.target.name);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSaved(event.target.checked);
  };
  

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

  async function fetchCardByNumber(number: string) {
    try {
      
    } catch (err) {
      console.log(err);
    }
  }

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

  async function fetchCardsByNameByPhone(name: string, phone: string) {
    let filter = {
      // and: [
      //   { name: { eq: name } },
      //   { phone: { eq: phone } },
      // ]
      name: { eq: name },
      phone: { eq: phone }
    };

    try {
      const response = await API.graphql({
        query: listCards,
        variables: { filter: filter }
      }) as { data: GetCardsQuery };

      console.log(response.data.listCards.items);
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
      setFormData(initialFormData);
      setFocus("");
    } catch (err) {
      console.log(err);
    }
  } 

  const CardFormSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required"),
    number: Yup.string()
      .length(19, "Please enter full card number")
      .required("Required"),
    phone: Yup.string()
      .matches(/^\+[1-9][0-9]{0,1} [0-9]{9}$/, 'Please enter full number')
      .length(13)
      .required("Required"),
    expiry: Yup.string()
      .matches(/(0[1-9]|10|11|12)\/[0-9]{2}/, 'Date is invalid')
      .required("Required"),
    cvc: Yup.string()
      .matches(/^[0-9]{3,4}$/, 'CVC is invalid')
      .max(4)
      .min(3, 'cvc is at least three digits long')
      .required("Required"),
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
        onSubmit={(values, { resetForm }) => {
          createCard();
          resetForm();
        }}
        validationSchema={CardFormSchema}
      >
        {(props: FormikProps<ICard>) => {
          const {
            values,
            handleChange,
            errors,
            touched,
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
                  xs={11} 
                  md={5}
                  spacing={1}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 30,
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
                      error={
                        errors.name && touched.name ? true : false
                      }
                      helperText={
                        errors.name && touched.name && String(errors.name)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <InputMask
                      mask="+61 999999999"
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
                        error={
                          errors.phone && touched.phone ? true : false
                        }
                        helperText={
                          errors.phone && touched.phone && String(errors.phone)
                        }
                        />
                    </InputMask>
                  </Grid>
                  <Grid item xs={12}>
                    <InputMask
                      mask='9999 9999 9999 9999'
                      maskPlaceholder={null}
                      value={values.number}
                      onChange={(e) => {
                        handleFormChange('number', e)
                        handleChange(e)
                      }}
                      onFocus={handleInputFocus}
                    >
                      <TextField
                        placeholder='____ ____ ____ ____'
                        fullWidth
                        label='Card Number'
                        name='number'
                        variant='outlined'
                        error={
                          errors.number && touched.number ? true : false
                        }
                        helperText={
                          errors.number && touched.number && String(errors.number)
                        }
                      />
                    </InputMask>
                  </Grid>
                  <Grid item xs>
                    <InputMask
                      mask='99/99'
                      // maskPlaceholder='MM/YY'
                      maskPlaceholder={null}
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
                        placeholder="MM/YY"
                        error={
                          errors.expiry && touched.expiry ? true : false
                        }
                        helperText={
                          errors.expiry && touched.expiry && String(errors.expiry)
                        }
                      />
                    </InputMask>
                  </Grid>
                  <Grid item xs>
                    <InputMask
                      mask='999'
                      maskPlaceholder={null}
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
                        error={
                          errors.cvc && touched.cvc ? true : false
                        }
                        helperText={
                          errors.cvc && touched.cvc && String(errors.cvc)
                        }
                      />
                    </InputMask>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel 
                      control={
                        <Switch
                          color='secondary'
                          checked={saved}
                          onChange={handleSwitchChange}
                        />
                      }
                      label="Save this card for future payment"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type='submit'
                      fullWidth
                      color='primary'
                      variant='contained'
                      size='large'
                      // onClick={createCard}
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      color='primary'
                      variant='text'
                      size='large'
                      disabled
                    >
                      My Wallet
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      color='primary'
                      variant='outlined'
                      size='large'
                      onClick={() => fetchCardsByNameByPhone("Pai Qu", "+61 123123123")}
                    >
                      Load Cards of Pai Qu (+61 123123123)
                    </Button>
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