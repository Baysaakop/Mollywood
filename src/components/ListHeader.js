import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography, FormControl, Select, MenuItem, InputLabel, IconButton } from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AppsIcon from '@material-ui/icons/Apps';


const useStyles = makeStyles((theme) => ({
    viewMode: {
        width: 'fit-content',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        '& svg': {
            margin: theme.spacing(0.5),
        },
    },
    formControl: {
        width: "100%",
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
            <Grid container alignItems="center" spacing={2}>                                            
                <Grid item container xs={6} sm={3}>        
                    <Grid item container alignitems="center" className={classes.viewMode}>
                        <IconButton aria-label="listView" style={{ borderRadius: 0 }}>
                            <ListAltIcon />
                        </IconButton>       
                        <Divider orientation="vertical" flexItem />                 
                        <IconButton aria-label="gridView" style={{ borderRadius: 0 }}>
                            <AppsIcon style={{ color: 'darkorange' }} />
                        </IconButton>      
                    </Grid>                                                    
                </Grid>             
                <Grid item xs={6} sm={6} style={{ textAlign: "center" }}>
                    <Typography variant="body1">
                        Нийт <span>8</span> кино
                    </Typography>
                </Grid> 
                <Grid item xs={12} sm={3} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Эрэмбэлэх</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={sortMode}
                            onChange={handleChange}
                            label="Age"
                        >
                            <MenuItem value="Шинээр нэмэгдсэн">Шинээр нэмэгдсэн</MenuItem>
                            <MenuItem value="Үнэлгээгээр">Үнэлгээгээр</MenuItem>
                            <MenuItem value="Үсгийн дарааллаар">Үсгийн дарааллаар</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>                                  
            </Grid>
        </div>
    );
};

export default ListHeader;