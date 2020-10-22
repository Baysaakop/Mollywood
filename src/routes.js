import React from 'react';
import { Route } from 'react-router-dom';

import Home from './containers/Home';
import ArtistDetail from './containers/ArtistDetail';
import BlogList from './containers/BlogList';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import ContentList from './containers/ContentList';
import ContentDetail from './containers/ContentDetail';
import ArtistList from './containers/ArtistList';
import Admin from './containers/Admin';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={Home} />
        {/* List View */}
        <Route exact path='/movies' render={(props) => (<ContentList {...props} type="movies" keyword="Кино" />)} />
        <Route exact path='/series' render={(props) => (<ContentList {...props} type="series" keyword="Цуврал" />)} />
        <Route exact path='/artists' render={(props) => (<ArtistList {...props} type="artists" keyword="Уран бүтээлч" />)} />
        <Route exact path='/blogs' component={BlogList} />
        {/* Detail View */}        
        <Route exact path='/movies/:id' render={(props) => (<ContentDetail {...props} type="movies" keyword="Кино" />)} />
        <Route exact path='/series/:id' render={(props) => (<ContentDetail {...props} type="series" keyword="Цуврал" />)} />
        <Route exact path='/artists/:id' render={(props) => (<ArtistDetail {...props} type="artists" keyword="Уран бүтээлч" />)} />
        {/* ADMIN View */}
        <Route exact path='/admin' component={Admin} />        
        {/* User Authentication */}
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
    </div>
);

export default BaseRouter;