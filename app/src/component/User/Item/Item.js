import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import React from "react";

import UserDetail from '../../User/Detail/DetailContainer'

export default (props) => {
    const [open, setOpen] = React.useState(false);

    return <Card className={props.classes.root} variant="outlined">
        <CardContent>
            <Typography className={props.classes.title} color="textSecondary" gutterBottom>
                {props.user.id}
            </Typography>
            <Typography variant="h5" component="h2">
                {props.user.name}
            </Typography>
            <List
                dense={true}
                component="div"
                aria-labelledby="nested-list-subheader"
                className={props.classes.root}
            >
                {props.user.lists.map((list, list_key) => (
                    <ListItem button key={list_key}>
                        <ListItemText
                            primary={list.name}
                        />
                    </ListItem>
                ))}
            </List>
        </CardContent>
        {open && <UserDetail id={props.user.id}/>}
        <CardActions>
            <Button size="small" onClick={() => setOpen(!open)}>Learn More</Button>
        </CardActions>
    </Card>;
}