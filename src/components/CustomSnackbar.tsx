import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Severity } from '../constants/types';

type AlertProps = {
  onClose: (event?: React.SyntheticEvent, reason?: string) => void,
  severity: Severity,
  children: string
}


function Alert({ onClose, severity}: AlertProps) {
  return (
    <MuiAlert 
      elevation={6} 
      variant="filled" 
      onClose={onClose}
      severity={severity}
    />
  );
}

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
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          {/* <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert> */}
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