import React, { useState } from 'react';
import CardForm from '../components/CardForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    flexGrow: 1,
    height: '100vh',
  }
}));

export default function FormPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <h1 style={{textAlign: "center"}}>Form Page</h1> */}
      <div className={classes.form}>
        <CardForm />
      </div>
    </div>
  );
}