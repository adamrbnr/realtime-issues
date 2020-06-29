import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation, gql } from '@apollo/client';

export default function IssueActions({id, categoryId}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const [moveIssue] = useMutation(MOVE_ISSUE);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMove = () => {
    moveIssue({ variables: { id, categoryId: categoryId += 1}});
  }

  return (
    <div className={classes.actions}>
    { categoryId < 3 && <>
        <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
        >
            <Icon>more_vert</Icon>
        </IconButton>
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
            style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
            },
            }}
        >
            {options.map((option) => (
            <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleMove}>
                {option}
            </MenuItem>
            ))}
        </Menu>
      </>}
    </div>
  );
}

const options = [
    'Move',
  ];
  
const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
    actions: {
      position: 'absolute',
      top: 15,
      right: 10,
    },
}));

const MOVE_ISSUE = gql`
    mutation MoveIssue ($id: Int!, $categoryId: Int!) {
        update_issues(_set: {categoryId: $categoryId}, where: {id: {_eq: $id}}) {
        returning {
            id
        }
        }
    }
`;
