import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

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

export default ({data, refetch, fetchMoreTrigger}) => {
    const classes = useStyles();

    return [
        <div key={1}>
            <Button variant="contained" color="primary" onClick={() => refetch()}>
                Reload
            </Button>
            <Button variant="contained" color="primary" onClick={() => fetchMoreTrigger()}>
                Fetch More
            </Button>
        </div>,
        <Grid key={2} container spacing={3}>
            {data && data.users && data.users.map((user, key) => (
                <Card key={key} className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {user.id}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {user.name}
                        </Typography>
                        <List
                            dense={true}
                            component="div"
                            aria-labelledby="nested-list-subheader"
                            className={classes.root}
                        >
                            {user.lists.map((list, list_key) => (
                                <ListItem button>
                                    <ListItemText
                                        primary={list.name}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            ))}
        </Grid>
    ];
}