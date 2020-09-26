import React from 'react';

const MovieDetail = (props) => {    

    return (
        <div>
            Detail of {props.match.params.movieID}
        </div>
    );
};

export default MovieDetail;