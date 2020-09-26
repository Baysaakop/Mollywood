import React, { useEffect, useState } from 'react';

const MovieDetail = (props) => {    

    const api_key = process.env.REACT_APP_API;
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props.match.params.movieID}?api_key=${api_key}&language=en-US`)
        .then(data => data.json())
        .then(data => {
            console.log(data);          
            setMovie(data);
        })
    }, []); 

    return (
        <div>
            <h2>Title: {movie.title}</h2>
            <p>Description: {movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
        </div>
    );
};

export default MovieDetail;