import React from 'react';
import { Route } from 'react-router-dom';

import Home from './containers/Home';
import MovieList from './containers/MovieList';
import SeriesList from './containers/SeriesList';
import ArtistList from './containers/ArtistList';
import MovieDetail from './containers/MovieDetail';
import ArtistDetail from './containers/ArtistDetail';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={Home} />
        {/* List View */}
        <Route exact path='/movies' component={MovieList} />
        <Route exact path='/series' component={SeriesList} />
        <Route exact path='/artists' component={ArtistList} />
        {/* Detail View */}
        <Route exact path='/movies/:movieID' component={MovieDetail} />
        <Route exact path='/artists/:artistID' component={ArtistDetail} />
        {/* User Authentication */}
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
    </div>
);

export default BaseRouter;