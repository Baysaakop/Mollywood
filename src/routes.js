import React from 'react';
import { Route } from 'react-router-dom';

import Home from './containers/Home';
import MovieDetail from './containers/MovieDetail';
import ArtistDetail from './containers/ArtistDetail';
import BlogList from './containers/BlogList';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import ContentList from './containers/ContentList';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={Home} />
        {/* List View */}
        <Route exact path='/movies' render={(props) => (<ContentList {...props} type="movie" link="movies" keyword="Кино" />)} />
        <Route exact path='/series' render={(props) => (<ContentList {...props} type="tv" link="series" keyword="Цуврал" />)} />
        <Route exact path='/artists' render={(props) => (<ContentList {...props} type="person" link="artists" keyword="Уран бүтээлч" />)} />
        <Route exact path='/blogs' component={BlogList} />
        {/* Detail View */}
        <Route exact path='/movies/:movieID' component={MovieDetail} />
        <Route exact path='/artists/:artistID' component={ArtistDetail} />
        {/* User Authentication */}
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
    </div>
);

export default BaseRouter;