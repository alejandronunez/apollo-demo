import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";

import UserItem from "../../User/Item/Item";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default ({data, refetch, fetchMoreTrigger, menuOpen, openMutate}) => {
    const classes = useStyles();

    const handleChange = (e, status) => {
        openMutate(status);
    };

    return [
        <div key={1}>
            <Button variant="contained" color="primary" onClick={() => refetch()}>
                Reload
            </Button>
            <Button variant="contained" color="primary" onClick={() => fetchMoreTrigger()}>
                Fetch More
            </Button>
            <Switch
                checked={menuOpen}
                onChange={handleChange}
                value="checkedA"
                inputProps={{'aria-label': 'secondary checkbox'}}
            />
        </div>,
        <Grid key={2} container spacing={3}>
            {data && data.users && data.users.map((user, key) => (
                <UserItem key={key} classes={classes} user={user}/>
            ))}
        </Grid>
    ];
}