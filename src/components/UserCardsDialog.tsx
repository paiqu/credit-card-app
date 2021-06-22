import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

// graphql
import { API } from 'aws-amplify';
import { listCards } from '../graphql/queries';

// Formik
import InputMask from 'react-input-mask';
import { Formik, Form, Field, useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';

// constants
import { ICard } from '../constants/types';

type UserCardsDialogProps = {
  open: boolean,
  onClose: () => void,
  setFormData: (formData: ICard) => void,
  setCardFormFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
}

type GetCardsQuery = {
  listCards: {
    items: ICard[]
  }
}

const NamePhoneSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required"),
  phone: Yup.string()
    .matches(/^\+[1-9][0-9]{0,1} [0-9]{9}$/, 'Please enter full number')
    .length(13)
    .required("Required"),
});

function getSteps() {
  return ['Enter your personal info', 'Select your card'];
}



export default function UserCardsDialog({ open, onClose, setFormData, setCardFormFieldValue }: UserCardsDialogProps){
  const [activeStep, setActiveStep] = useState(0);
  const [cards, setCards] = useState<ICard[]>();
  const [loading, setLoading] = useState(false);
  const steps = getSteps();


  const [selectedCard, setSelectedCard] = useState<ICard>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    phone: "",
  });

  useEffect(() => {
    return () => {
      if (cards && cards.length > 0) {
        const { name, phone } = cards[0];
        fetchCardsByNameByPhone(name, phone);
        console.log('use effect');
      }
    }
  }, [activeStep]);


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleClose = () => {
    onClose();
    setCards([]);
    setSelectedCard({
      number: "",
      expiry: "",
      cvc: "",
      name: "",
      phone: "",
    });
    setActiveStep(0);
  }


  const handleSelectedCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedNumber = (event.target as HTMLInputElement).value;
    if (!cards) return;
    const selected = cards.filter(card => {
      return card.number === selectedNumber;
    })[0];

    setSelectedCard(selected);
  };


  async function fetchCardsByNameByPhone(name: string, phone: string) {
    let filter = {
      name: { eq: name },
      phone: { eq: phone },
    };

    try {
      const response = await API.graphql({
        query: listCards,
        variables: { filter: filter }
      }) as { data: GetCardsQuery };
      const cardsData: ICard[] = response.data.listCards.items;

      setCards(cardsData);
      // setCards(cardsData);
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  
  const StepOne = () => {
    return (
      <div>
        <Grid container item xs={12} >
          <Formik
            initialValues={{
              name: "",
              phone: "",
            }}
            onSubmit={({name, phone}, { resetForm }) => {
              fetchCardsByNameByPhone(name, phone);
              resetForm();
              // if no error!
              handleNext();
            }}
            validationSchema={NamePhoneSchema}
          >
            {(props: FormikProps<{name: string, phone: string}>) => {
              const {
                values,
                handleChange,
                errors,
                touched,
                setFieldValue,
              } = props;

              return (
                <Grid 
                  component={Form}
                  container 
                  item
                  xs={12} 
                  spacing={1} 
                >
                  <DialogContent>
                    <Grid item xs={12} >
                      <DialogContentText>
                        Please enter your name and phone number to fetch the cards you stored earlier
                      </DialogContentText>
                    </Grid>
                    <Grid 
                      item 
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label='Name'
                        name='name'
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        value={values.name}
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
                        maskPlaceholder={null}
                        value={values.phone}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        >
                        <TextField
                          fullWidth
                          label='Phone Number'
                          name='phone'
                          error={
                            errors.phone && touched.phone ? true : false
                          }
                          helperText={
                            errors.phone && touched.phone && String(errors.phone)
                          }
                          />
                      </InputMask>
                    </Grid>
                    <Grid container spacing={0} item xs={12} style={{ marginTop: '1rem' }}>
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          // variant='outlined'
                          color='secondary'
                          onClick={handleClose}
                        >
                          Cancel
                        </Button>
                      </Grid>
                      {/* <Grid item xs={2} /> */}
                      <Grid item xs={6}>
                        <Button
                          type='submit'
                          fullWidth
                          variant='contained'
                          color='primary'
                        >
                          Next
                        </Button>
                      </Grid>
                    </Grid>

                  </DialogContent>

                </Grid>
              );
            }}
          </Formik>
        </Grid>
      </div>
    );
  };

  const StepTwo = () => {
    return (
      <Grid container item xs={12} >
        <Grid container item xs={12}>
          {
            cards 
              ? (
                <FormControl component="fieldset" fullWidth style={{textAlign: 'center'}}>
                  <FormLabel component="legend">Your Cards</FormLabel>
                  <RadioGroup value={selectedCard.number} onChange={handleSelectedCardChange} >
                    {cards.map(card => (
                      <Grid item xs={12} >
                        <FormControlLabel key={card.number} value={card.number} control={<Radio />} label={card.number} />
                      </Grid>
                    ))}
                  </RadioGroup>
                </FormControl>
              )
              : (
                <Grid item xs={12}>
                  {/* <h1 style={{textAlign: 'center'}}>No cards available</h1> */}
                </Grid>
              )
          }
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={() => {
              handleClose();
            }}
            fullWidth
            color='secondary'
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={() => {
              if (selectedCard) {
                setFormData({
                  ...selectedCard
                });
                Object.entries(selectedCard).forEach(([key, value]) => {
                  setCardFormFieldValue(key, value);
                })
              }
              handleClose();
            }}
            fullWidth
            variant='contained'
            color='primary'
          >
            Next
          </Button>
        </Grid>
      </Grid>
    );
  }

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return <StepOne />;
      case 1:
        return <StepTwo />;
      default:
        return 'Unknown stepIndex';
    }
  }

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      disableBackdropClick
      disableEscapeKeyDown
    >
      { !loading
          ? (
            <Grid container spacing={1} >
            <Grid item xs={12}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
            <Grid container item xs={12}>
              {getStepContent(activeStep)}
            </Grid>
          </Grid>
          )
          : (
            <CircularProgress color='secondary' />
          )
      }

    </Dialog>
  );
}