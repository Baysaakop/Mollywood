import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AppsIcon from '@material-ui/icons/Apps';


const useStyles = makeStyles((theme) => ({
    right: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        '& svg': {
            margin: theme.spacing(1.0),
        },
        '& hr': {
            margin: theme.spacing(0, 0.5),
        },
        '& p': {
            margin: theme.spacing(1.0, 1.0),
        },
        padding: "0px 5px",
    },
    formControl: {
        width: "90%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const ListHeader = (props) => {
    const classes = useStyles();

    const [sortMode, setSortMode] = React.useState('');

    const handleChange = (event) => {
        setSortMode(event.target.value);
    };
    
    return (
        <div>
            <Grid container alignItems="center">                       
                <Grid item xs={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Эрэмбэлэх</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={sortMode}
                    onChange={handleChange}
                    label="Age"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Шинээр нэмэгдсэн</MenuItem>
                    <MenuItem value={20}>Үнэлгээ өндөр</MenuItem>
                    <MenuItem value={30}>Үсгийн дарааллаар</MenuItem>
                    </Select>
                </FormControl>
                </Grid>       
                <Grid item container xs={6} className={classes.right}>
                    <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <Typography variant="body2" component="p">Нийт 8 кино</Typography>     
                        <Divider orientation="vertical" flexItem />                   
                    </Grid>  
                    <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Divider orientation="vertical" flexItem />                    
                        <ListAltIcon />
                        <Divider orientation="vertical" flexItem />
                        <AppsIcon />               
                    </Grid>                      
                </Grid>                                              
            </Grid>
        </div>
    );
};

export default ListHeader;