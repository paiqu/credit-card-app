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

type CardSelectionPageProps = {
  name: string,
  phone: string,
  handleClose: () => void,
  setFormData: (card: ICard) => void,
  setCardFormFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
}

type GetCardsQuery = {
  listCards: {
    items: ICard[]
  }
}

export default function CardSelectionPage({ 
  name, 
  phone, 
  handleClose,
  setFormData,
  setCardFormFieldValue 
}: CardSelectionPageProps) {
  const [cards, setCards] = useState<ICard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCard, setSelectedCard] = useState<ICard>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    phone: "",
  });

  useEffect(() => {
    fetchCardsByNameByPhone(name, phone);
    if (cards.length > 0) {
      setSelectedCard(cards[0]);
    }
    console.log(cards.length);
    setLoading(false);
  }, []);

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
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  const handleSelectedCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedNumber = (event.target as HTMLInputElement).value;
    if (!cards) return;
    const selected = cards.filter(card => {
      return card.number === selectedNumber;
    })[0];

    setSelectedCard(selected);
  };


  return (
    <Grid container item xs={12} >
      <Grid container item xs={12}>
        {
          loading
            ? (
              <Grid item xs={12} 
                style={{
                  textAlign: 'center',
                  marginBottom: '1rem',
                }}
              >
                <CircularProgress color='secondary' />
              </Grid>
            )
            : (
              cards.length > 0
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