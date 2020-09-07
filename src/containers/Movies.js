import React, { useState } from 'react';
import { Typography, Link, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumb from '../components/Breadcrumb';
import MovieCard from '../components/MovieCard';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    }
}));

const Movies = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Breadcrumb page="КИНО ЖАГСААЛТ" />
            <Grid container>
                <Grid item xs={false} sm={2}>                    
                </Grid>
                <Grid item container xs={12} sm={8} style={{ padding: "20px" }}>
                    <Grid item container xs={8} spacing={4}>
                        <Grid item xs={12} sm={6} md={3}>
                            <MovieCard className={classes.card} title="Mulan" rating="5.9" imageUrl="https://m.media-amazon.com/images/M/MV5BNDliY2E1MjUtNzZkOS00MzJlLTgyOGEtZDg4MTI1NzZkMTBhXkEyXkFqcGdeQXVyNjMwMzc3MjE@._V1_SY1000_CR0,0,675,1000_AL_.jpg" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <MovieCard className={classes.card} title="The New Mutants" rating="5.6" imageUrl="https://m.media-amazon.com/images/M/MV5BMTgwMmIwMjgtZDZkMi00NjllLTljMDMtOTg1MmUxMGY0ZDgxXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <MovieCard className={classes.card} title="Parasite" rating="8.6" imageUrl="https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SY1000_CR0,0,674,1000_AL_.jpg" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <MovieCard className={classes.card} title="Joker" rating="8.5" imageUrl="https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <MovieCard className={classes.card} title="Mulan" rating="5.9" imageUrl="https://m.media-amazon.com/images/M/MV5BNDliY2E1MjUtNzZkOS00MzJlLTgyOGEtZDg4MTI1NzZkMTBhXkEyXkFqcGdeQXVyNjMwMzc3MjE@._V1_SY1000_CR0,0,675,1000_AL_.jpg" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <MovieCard className={classes.card} title="The New Mutants" rating="5.6" imageUrl="https://m.media-amazon.com/images/M/MV5BMTgwMmIwMjgtZDZkMi00NjllLTljMDMtOTg1MmUxMGY0ZDgxXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <MovieCard className={classes.card} title="Parasite" rating="8.6" imageUrl="https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SY1000_CR0,0,674,1000_AL_.jpg" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <MovieCard className={classes.card} title="Joker" rating="8.5" imageUrl="https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg" />
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>                        
                    </Grid>
                </Grid>
                <Grid item xs={false} sm={2}>                    
                </Grid>                
            </Grid>            
        </div>
    );
};

export default Movies;