import React, { useState } from 'react';
import CardSelectionPage from '../pages/CardSelectionPage';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

// Formik
import InputMask from 'react-input-mask';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';

// constants
import { ICard } from '../constants/types';

type UserCardsDialogProps = {
  open: boolean,
  onClose: () => void,
  setFormData: (formData: ICard) => void,
  setCardFormFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
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
  const [user, setUser] = useState({
    name: "",
    phone: "",
  })
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleClose = () => {
    onClose();
    setActiveStep(0);
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
              setUser({
                name,
                phone,
              });
              resetForm();
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


  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return <StepOne />;
      case 1:
        return (
          <CardSelectionPage
            name={user.name} 
            phone={user.phone}
            handleClose={handleClose}
            setFormData={setFormData}
            setCardFormFieldValue={setCardFormFieldValue}
          />
        );
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
    </Dialog>
  );
}