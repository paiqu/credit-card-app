import React, { useEffect, useState, FocusEvent, ChangeEvent } from 'react';

// @ts-ignore
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

// components
import CustomSnackbar from './CustomSnackbar';
import UserCardsDialog from './UserCardsDialog';

// Material UI
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';

// utils
import { formatExpiry } from '../utils/DataFormater';

// constants
import { ICard, Severity } from '../constants/types';

// Formik
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';

// graphql
import { API } from 'aws-amplify';
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
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    position: 'relative',
    top: "5rem",
  },
  divider: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  formBodyContainer: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: "6rem 2rem 2rem 2rem"
  },
}));

function CardForm() {
  const classes = useStyles();
  
  const [formData, setFormData] = useState<ICard>(initialFormData);
  const [focus, setFocus] = useState("");
  const [cards, setCards] = useState<ICard[]>([]);
  const [saved, setSaved] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState<{severity: Severity, message: string}>({
    severity: undefined,
    message: "",
  });
  const [cardsDialogOpen, setCardsDialogOpen] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  const handleInputFocus = (e: FocusEvent<any>) => {
    setFocus(e.target.name);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSaved(event.target.checked);
  };
  

  const handleFormChange = (name: string, { target }: React.ChangeEvent<any>, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void ) => {

    setFormData({
      ...formData,
      [name]: target.value,
    });
    setFieldValue(name, target.value);
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
      const newCards = response.data.listCards.items;
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
          if (saved) {
            createCard();
          }
          setSnackbarData({
            severity: 'success', 
            message: "Your card has been submitted."
          });
          setSnackbarOpen(true);
          resetForm();
        }}
        validationSchema={CardFormSchema}
      >
        {(props: FormikProps<ICard>) => {
          const {
            values,
            // handleChange,
            errors,
            touched,
            setFieldValue,
            setValues,
          } = props;

          return (
            // <Form className={classes.form}>
              <Grid 
                container
                component={Form}
                className={classes.form}
              >
                <Grid
                  className={classes.formBodyContainer}
                  container 
                  item 
                  xs={11} 
                  md={7}
                  lg={4}
                  spacing={1}
                >
                  <Grid 
                    item 
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label='Name'
                      name='name'
                      onChange={(e) => {
                        handleFormChange('name', e, setFieldValue);
                        // handleChange(e)
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
                        handleFormChange('phone', e, setFieldValue)
                        // handleChange(e)
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
                        handleFormChange('number', e, setFieldValue)
                        // handleChange(e)
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
                  <Grid item xs={12} sm={6}>
                    <InputMask
                      mask='99/99'
                      // maskPlaceholder='MM/YY'
                      maskPlaceholder={null}
                      onChange={(e) => {
                        handleFormChange('expiry', e, setFieldValue)
                        // handleChange(e)
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
                  <Grid item xs={12} sm={6}>
                    <InputMask
                      mask='999'
                      maskPlaceholder={null}
                      onChange={(e: ChangeEvent) => {
                        handleFormChange('cvc', e, setFieldValue)
                        // handleChange(e)
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
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid item xs={12} className={classes.divider}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      color='primary'
                      variant='outlined'
                      size='large'
                      onClick={() => {
                        setCardsDialogOpen(true);
                      }}
                    >
                      My Wallet
                    </Button>
                  </Grid>
                  <UserCardsDialog 
                    open={cardsDialogOpen}
                    onClose={() => {
                      setCardsDialogOpen(false);
                    }}
                    setFormData={setFormData}
                    setCardFormFieldValue={setFieldValue}
                  />
                </Grid>
              </Grid>
            // </Form>
          );
        }}
      </Formik>
      <CustomSnackbar 
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        severity={snackbarData.severity}
        message={snackbarData.message}
      />
    </div>
  );
}

export default CardForm;