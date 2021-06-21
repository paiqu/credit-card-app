import React, { useState } from 'react';
import CardForm from '../components/CardForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: "#dbe9fc",
    height: '100vh',
    minHeight : '100vh'
  },
  form: {
    height: '100',
  }
}));

export default function FormPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <h1 style={{textAlign: "center"}}>Form Page</h1> */}
      {/* <div className={classes.form}> */}
      <CardForm />
      {/* </div> */}
    </div>
  );
}