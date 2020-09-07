import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { Paper } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route, Switch } from "react-router-dom";
import Home from './containers/Home';
import Movies from './containers//Movies';
import Series from './containers//Series';
import Artists from './containers//Artists';

function App() {
    const [darkMode, setDarkMode] = useState(true);

    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",    
            primary: {
                main: "#020D18",
            }, 
            secondary: {
                main: "#272c34",
            }, 
            background: {
                paper: "#272c34",
            },
            breadcrumb: "#13253d",
        },
        typography: {
            "fontFamily": `"Exo 2", "Montserrat", sans-serif`,
            "fontSize": 14,
            "fontWeightLight": 300,
            "fontWeightRegular": 400,
            "fontWeightMedium": 500
        }
    });  

    const lightTheme = createMuiTheme({
        palette: {
            type: "light",   
            secondary: {
                main: "#f1f1f1",
            },
            background: {
                paper: "#f1f1f1",
            },
            breadcrumb: "#d3d3d3",
        },
        typography: {
            "fontFamily": `"Exo 2", "Montserrat", sans-serif`,
            "fontSize": 14,
            "fontWeightLight": 300,
            "fontWeightRegular": 400,
            "fontWeightMedium": 500
        }
    });      

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>  
            <Paper> 
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />       
                <Switch>
                    <Route exact path="/" component={Home} />                
                    <Route exact path="/movies" component={Movies} />
                    <Route exact path="/series" component={Series} />
                    <Route exact path="/artists" component={Artists} />
                </Switch>                
            </Paper> 
        </ThemeProvider>
    );
}

export default App;
