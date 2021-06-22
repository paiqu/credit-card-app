import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

// utils
import { capitalizeString  } from '../utils/DataFormater';

// graphql
import { API } from 'aws-amplify';
import { listCards } from '../graphql/queries';

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

const emptyCard: ICard = {
  number: "",
  expiry: "",
  cvc: "",
  name: "",
  phone: "",
};

export default function CardSelectionPage({ 
  name, 
  phone, 
  handleClose,
  setFormData,
  setCardFormFieldValue 
}: CardSelectionPageProps) {
  const [cards, setCards] = useState<ICard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCard, setSelectedCard] = useState<ICard>(emptyCard);

  useEffect(() => {
    setSelectedCard(emptyCard);
    setCards([]);
    fetchCardsByNameByPhone(name, phone);
    if (cards.length > 0) {
      setSelectedCard(cards[0]);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  // eslint-disable-next-line
  }, []);

  async function fetchCardsByNameByPhone(name: string, phone: string) {
    let newName = capitalizeString(name);
    console.log(newName);
    let filter = {
      name: { eq: capitalizeString(name) },
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
                      <Grid container item xs={12}>
                        {cards.map(card => (
                          <Grid item xs={12} >
                            <FormControlLabel key={card.number} value={card.number} control={<Radio />} label={card.number} />
                          </Grid>
                        ))}
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                )
                : (
                  <Grid item xs={12}>
                    <h1 style={{textAlign: 'center'}}>No cards available</h1>
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
