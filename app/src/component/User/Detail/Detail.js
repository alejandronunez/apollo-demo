import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

export default (props) => {

    return <CardContent>
        <Typography color="textSecondary" gutterBottom>
            {props.data && props.data.user && props.data.user.address.substring(0, 20).concat('...')}
        </Typography>
        <List
            dense={true}
            component="div"
            aria-labelledby="nested-list-subheader"
        >
            {props.data && props.data.user && props.data.user.lists.map((list, list_key) => (
                <ListItem button key={list_key}>
                    <ListItemText
                        primary={list.name}
                    />
                    {list.completeTasks.map((complete, complete_key) => (
                        <Chip key={complete_key} avatar={<Avatar>C</Avatar>}/>
                    ))}
                    {list.incompleteTasks.map((complete, complete_key) => (
                        <Chip key={complete_key} avatar={<Avatar>I</Avatar>}/>
                    ))}
                </ListItem>
            ))}
        </List>
    </CardContent>;
}