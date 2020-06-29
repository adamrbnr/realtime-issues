import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { gql, useSubscription } from '@apollo/client';
import IssueActions from './IssueActions';

export default function Categories() {
  const classes = useStyles();
  const { loading, error, data } = useSubscription(CATEGORIES);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <>
        {data.categories.map((category) => (
        <Grid key={category.id} item sm={4} xs={12}>
            <Paper className={classes.category} >
                <div className={classes.title}><h2>{category.name}</h2></div>
                    {category.issues.map((issue) => (
                        <Paper key={issue.id} className={classes.issue}>
                            <h4>{issue.title}</h4>
                            <p>{issue.description}</p>
                            <div><IssueActions {...issue}/></div>
                        </Paper>
                    ))}
                    {category.issues.length === 0 && <div className={classes.empty}><h4>No Issues</h4></div>}
            </Paper>
        </Grid>
        ))}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
    category: {
      backgroundColor: 'rgb(244, 244, 244)',
      padding: theme.spacing(1),
      height: '100%',
      overflow: 'auto',
      [theme.breakpoints.down('xs')]: {
        height: '13rem',
      },
    },
    title: {
      margin: theme.spacing(1),
    },
    issue: {
      position: 'relative',
      padding: theme.spacing(1),
      margin: theme.spacing(1),
    },
    empty: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
  }));

export const CATEGORIES = gql`
    subscription {
        categories {
            id
            name
            issues(order_by: {updated_at: desc}) {
                title
                description
                id,
                categoryId,
            }
        }
    }
`;
