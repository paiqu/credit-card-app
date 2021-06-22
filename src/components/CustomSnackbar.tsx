import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Severity } from '../constants/types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

type SnackBarProps = {
  open: boolean,
  setOpen: (open: boolean) =>  void,
  severity: Severity,
  message: string,
}

export default function CustomSnackbar({ open, setOpen, severity, message }: SnackBarProps) {
  const classes = useStyles();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <MuiAlert 
            elevation={6} 
            variant="filled" 
            onClose={handleClose}
            severity={severity}
            children={message}
          />
        </Snackbar>
    </div>
  );
}