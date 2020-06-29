import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NewIssue from './NewIssue';
import Categories from './Categories';

export default function Layout() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="flex-end">
            <NewIssue />
        </Grid>
        <br />
        <Grid container justify="center" spacing={1}>
          <Categories />
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
      flexGrow: 1,
    },
    paper: {
      backgroundColor: 'rgb(244, 244, 244)',
      height: 240,
      width: 200,
    },
    control: {
      padding: theme.spacing(2),
    },
    categoryTitle: {
      margin: theme.spacing(1),
    },
    issue: {
      padding: theme.spacing(1),
      margin: theme.spacing(1),
    }
  }));
