import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { FavoriteBorder as FavoriteIcon, StarBorder as StarIcon, CheckCircleOutline as CheckCircleIcon, AddCircleOutline as AddCircleIcon } from "@material-ui/icons";
import { IconButton, CardMedia } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    cardActions: {
        flex: 1,
        margin: "0",        
        padding: "0",
        justifyContent: "space-evenly",        
    },
    actionIcon: {
        fontSize: "20px",
    }
}));

const MovieCard = props => {
    const classes = useStyles();
    const { title, imageUrl, rating } = props;
    return (
        <Card className={classes.card}>
            <CardMedia          
                component="img"        
                image={imageUrl}
            />
            <CardContent style={{ padding: "5px 10px" }}>
                <Typography variant="body2" component="p">
                {title}
                </Typography>
                <Typography component="p" style={{ fontSize: "12px" }}>
                {rating}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <IconButton aria-label="add to favorites" style={{ padding: "8px", margin: "0" }}>
                    <FavoriteIcon className={classes.actionIcon} />
                </IconButton>
                <IconButton aria-label="give a rating" style={{ padding: "8px", margin: "0" }}>
                    <StarIcon className={classes.actionIcon} />
                </IconButton>
                <IconButton aria-label="add to watched" style={{ padding: "8px", margin: "0" }}>
                    <CheckCircleIcon className={classes.actionIcon} />
                </IconButton>
                <IconButton aria-label="add to watchlist" style={{ padding: "8px", margin: "0" }}>
                    <AddCircleIcon className={classes.actionIcon} />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default MovieCard;