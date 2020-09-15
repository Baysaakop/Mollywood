import React from 'react';
import { Grid, FormControl, Typography, FormControlLabel, TextField, Checkbox, Button, Select, MenuItem, FormLabel, InputLabel } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumb from '../components/Breadcrumb';
import MovieCard from '../components/MovieCard';
import ListHeader from '../components/ListHeader';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,        
    },
    content: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),        
    },
    grid: {        
        flex: 1,
        maxWidth: "fit-content", 
        marginTop: theme.spacing(2),
    },
    filterForm: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        width: '100%',        
        height: 'fit-content',        
        display: 'flex',
        flexDirection: 'column',        
        padding: theme.spacing(2),
    },
    formControl: {
        marginTop: theme.spacing(3),
        width: '100%',
        fontSize: '10px',
    },
}));

const MovieList = (props) => {
    const classes = useStyles();
    const [genre, setGenre] = React.useState('');
    const [releaseFrom, setReleaseFrom] = React.useState('');
    const [releaseTo, setReleaseTo] = React.useState('');
    const [ratingMin, setRatingMin] = React.useState('');
    const [ratingMax, setRatingMax] = React.useState('');

    const handleGenre = (event) => {
        setGenre(event.target.value);
    };

    const handleReleaseFrom = (event) => {
        setReleaseFrom(event.target.value);
    };

    const handleReleaseTo = (event) => {
        setReleaseTo(event.target.value);
    };

    const handleRatingMin = (event) => {
        setRatingMin(event.target.value);
    };

    const handleRatingMax = (event) => {
        setRatingMax(event.target.value);
    };

    return (
        <div className={classes.root}>
            <Breadcrumb page="КИНО ЖАГСААЛТ" />
            <Grid container>
                <Grid item xs={1} sm={2}>                    
                </Grid>
                <Grid item container xs={10} sm={8}>
                    <Grid item container xs={12} sm={8} className={classes.content}>
                        <Grid item xs={12}>
                            <ListHeader />
                        </Grid>
                        <Grid item container xs={12} spacing={3} className={classes.grid}>
                            <Grid item xs={6} md={3}>
                                <MovieCard className={classes.card} title="Mulan" rating="5.9" imageUrl="https://m.media-amazon.com/images/M/MV5BNDliY2E1MjUtNzZkOS00MzJlLTgyOGEtZDg4MTI1NzZkMTBhXkEyXkFqcGdeQXVyNjMwMzc3MjE@._V1_SY1000_CR0,0,675,1000_AL_.jpg" />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <MovieCard className={classes.card} title="The New Mutants" rating="5.6" imageUrl="https://m.media-amazon.com/images/M/MV5BMTgwMmIwMjgtZDZkMi00NjllLTljMDMtOTg1MmUxMGY0ZDgxXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg" />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <MovieCard className={classes.card} title="Parasite" rating="8.6" imageUrl="https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SY1000_CR0,0,674,1000_AL_.jpg" />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <MovieCard className={classes.card} title="Joker" rating="8.5" imageUrl="https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg" />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <MovieCard className={classes.card} title="Mulan" rating="5.9" imageUrl="https://m.media-amazon.com/images/M/MV5BNDliY2E1MjUtNzZkOS00MzJlLTgyOGEtZDg4MTI1NzZkMTBhXkEyXkFqcGdeQXVyNjMwMzc3MjE@._V1_SY1000_CR0,0,675,1000_AL_.jpg" />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <MovieCard className={classes.card} title="The New Mutants" rating="5.6" imageUrl="https://m.media-amazon.com/images/M/MV5BMTgwMmIwMjgtZDZkMi00NjllLTljMDMtOTg1MmUxMGY0ZDgxXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg" />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <MovieCard className={classes.card} title="Parasite" rating="8.6" imageUrl="https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SY1000_CR0,0,674,1000_AL_.jpg" />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <MovieCard className={classes.card} title="Joker" rating="8.5" imageUrl="https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg" />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                            <Pagination count={10} showFirstButton showLastButton />
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} sm={4} className={classes.content}>        
                        <form className={classes.filterForm} noValidate autoComplete="off">
                            <FormControl className={classes.formControl}>
                                <FormLabel>                                
                                    КИНО ХАЙХ
                                </FormLabel>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"                                    
                                    id="outlined-basic"
                                    label="Нэр"
                                    name="name"
                                    autoComplete="name"                                    
                                />           
                            </FormControl>                 
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="genreSelect">Төрөл</InputLabel>
                                <Select
                                    labelId="genreSelect"
                                    id="genre"
                                    value={genre}
                                    onChange={handleGenre}
                                    label="Genre"
                                    variant="outlined"
                                >
                                    <MenuItem value="Бүгд">Бүгд</MenuItem>
                                    <MenuItem value="Адал явдалт">Адал явдалт</MenuItem>
                                    <MenuItem value="Аймшиг">Аймшиг</MenuItem>
                                    <MenuItem value="Инээдмийн">Инээдмийн</MenuItem>
                                    <MenuItem value="Уран зөгнөлт">Уран зөгнөлт</MenuItem>
                                </Select>
                            </FormControl>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="ratingMinSelect">Үнэлгээ /доод/</InputLabel>
                                        <Select
                                            labelId="ratingMinSelect"
                                            id="ratingMin"
                                            value={ratingMin}
                                            onChange={handleRatingMin}
                                            label="ratingMin"
                                            variant="outlined"
                                        >
                                            <MenuItem value="1">1</MenuItem>
                                            <MenuItem value="2">2</MenuItem>
                                            <MenuItem value="3">3</MenuItem>
                                            <MenuItem value="4">4</MenuItem>
                                            <MenuItem value="5">5</MenuItem>
                                            <MenuItem value="6">6</MenuItem>
                                            <MenuItem value="7">7</MenuItem>
                                            <MenuItem value="8">8</MenuItem>
                                            <MenuItem value="9">9</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>                                
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="ratingMaxSelect">Үнэлгээ /дээд/</InputLabel>
                                        <Select
                                            labelId="ratingMaxSelect"
                                            id="ratingMax"
                                            value={ratingMax}
                                            onChange={handleRatingMax}
                                            label="ratingMax"
                                            variant="outlined"
                                        >                                                                                        
                                            <MenuItem value="2">2</MenuItem>
                                            <MenuItem value="3">3</MenuItem>
                                            <MenuItem value="4">4</MenuItem>
                                            <MenuItem value="5">5</MenuItem>
                                            <MenuItem value="6">6</MenuItem>
                                            <MenuItem value="7">7</MenuItem>
                                            <MenuItem value="8">8</MenuItem>
                                            <MenuItem value="9">9</MenuItem>
                                            <MenuItem value="10">10</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="releaseFromSelect">Нээлт /доод/</InputLabel>
                                        <Select
                                            labelId="releaseFromSelect"
                                            id="releaseFrom"
                                            value={releaseFrom}
                                            onChange={handleReleaseFrom}
                                            label="releaseFrom"
                                            variant="outlined"
                                        >
                                            <MenuItem value="2000">2000</MenuItem>
                                            <MenuItem value="2001">2001</MenuItem>
                                            <MenuItem value="2002">2002</MenuItem>
                                            <MenuItem value="2003">2003</MenuItem>
                                            <MenuItem value="2004">2004</MenuItem>
                                            <MenuItem value="2005">2005</MenuItem>
                                            <MenuItem value="2006">2006</MenuItem>
                                            <MenuItem value="2007">2007</MenuItem>
                                            <MenuItem value="2008">2008</MenuItem>
                                            <MenuItem value="2009">2009</MenuItem>
                                            <MenuItem value="2010">2010</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>                                
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="releaseToSelect">Нээлт /дээд/</InputLabel>
                                        <Select
                                            labelId="releaseToSelect"
                                            id="releaseTo"
                                            value={releaseTo}
                                            onChange={handleReleaseTo}
                                            label="releaseTo"
                                            variant="outlined"
                                        >                                            
                                            <MenuItem value="2011">2011</MenuItem>
                                            <MenuItem value="2012">2012</MenuItem>
                                            <MenuItem value="2013">2013</MenuItem>
                                            <MenuItem value="2014">2014</MenuItem>
                                            <MenuItem value="2015">2015</MenuItem>
                                            <MenuItem value="2016">2016</MenuItem>
                                            <MenuItem value="2017">2017</MenuItem>
                                            <MenuItem value="2018">2018</MenuItem>
                                            <MenuItem value="2019">2019</MenuItem>
                                            <MenuItem value="2020">2020</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <FormControl className={classes.formControl}>
                                <Button
                                    type="submit"                                    
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    ХАЙХ
                                </Button>      
                            </FormControl>                  
                        </form>       
                    </Grid>
                </Grid>
                <Grid item xs={1} sm={2}>                    
                </Grid>                
            </Grid>            
        </div>
    );
};

export default MovieList;