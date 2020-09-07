import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Breadcrumbs } from '@material-ui/core';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.breadcrumb,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px",
    },
    breadcrumb: {
        textAlign: "center",        
    },
    link: {
        fontSize: "12px"
    },
}));

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

const Breadcrumb = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <div className={classes.container}>
            <div> 
                <Typography color="textPrimary" style={{ fontSize: "32px" }}>{props.page}</Typography>
                <Breadcrumbs classname={classes.breadcrumb} aria-label="breadcrumb"> 
                    <Link color="inherit" href="/">
                        <Typography className={classes.link}>MOLLYWOOD</Typography> 
                    </Link>
                    <Typography color="textPrimary" className={classes.link}>{props.page}</Typography>
                </Breadcrumbs>
            </div>
        </div>
    );
};

export default Breadcrumb;