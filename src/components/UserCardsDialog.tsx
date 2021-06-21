import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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

export default function UserCardsDialog({ open, onClose }: UserCardsDialogProps){
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

      console.log(response.data.listCards.items);
    } catch (err) {
      console.log(err);
    }
  }
  
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
    >
      <Grid container spacing={1} >
        <Grid item xs={12}>
          <DialogTitle>Your Wallet</DialogTitle>
        </Grid>
        <Grid container item xs={12} >
          <Formik
            initialValues={{
              name: "",
              phone: "",
            }}
            onSubmit={({name, phone}, { resetForm }) => {
              fetchCardsByNameByPhone(name, phone);
              resetForm();
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                    <Grid container spacing={1} item xs={12} style={{ marginTop: '1rem' }}>
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          variant='outlined'
                          color='secondary'
                          onClick={onClose}
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
                          GET
                        </Button>
                      </Grid>
                    </Grid>

                  </DialogContent>

                </Grid>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </Dialog>
  );
}