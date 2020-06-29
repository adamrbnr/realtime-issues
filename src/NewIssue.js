import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { useMutation, gql } from '@apollo/client';

export default function NewIssue() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('')
  const [createIssue, { loading, error}] = useMutation(CREATE_ISSUE);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    createIssue({
      variables: {
        title,
        description,
      }
    }).then(() => {
      setOpen(false);
      setTitle('');
      setDescription('');
    });
  }


  return (
    <>
        <Button onClick={handleOpen} variant="contained" color="primary">New Issue</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className={classes.paper}>
              { loading && <p>Submitting issue...</p>}
              { error && <p>{`Error! ${error.message}`}</p>}
              <>
                <h4 id="simple-modal-title">Issue title</h4>
                <TextField
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={classes.text} 
                    id="outlined-basic" 
                    label="Title of this Issue" 
                    variant="outlined" />
                <h4 id="simple-modal-title">Description</h4>
                <TextField
                    valu={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={classes.text}
                    multiline 
                    rows={3} 
                    rowsMax={4} 
                    id="outlined-basic" 
                    label="Write a comment..." 
                    variant="outlined" />
                <div className={classes.actions}>
                    <Button
                        disabled={title.length === 0} 
                        onClick={handleSubmit} 
                        variant="contained" 
                        color="primary">
                            Submmit new Issue
                    </Button>
                </div>
              </>
            </div>
      </Modal>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 550,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      [theme.breakpoints.down('xs')]: {
        width: 250,
      },
    },
    actions: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'flex-start',
    },
    text: {
        width: '100%',
    }
  }));

  const top = 50;
  const left = 50;

  const CREATE_ISSUE = gql`
    mutation CreateIssue($title: String!, $description: String!) {
      insert_issues(objects: {title: $title, description: $description}) {
        returning {
          id,
          title,
          description,
        }
      }
    }
`;
