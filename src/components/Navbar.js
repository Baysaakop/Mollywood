import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Grid, Typography, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import { 
    Menu as MenuIcon, 
    Search as SearchIcon, 
    Notifications as NotificationsIcon,
    Brightness7 as LightIcon,
    Brightness4 as DarkIcon,
    AccountCircle as AccountCircleIcon
} from '@material-ui/icons';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    headerOptions: {
        display: "flex",
        flex: 1,
        justifyContent: "space-evenly"
    },
    menuItem: {
        justifyContent: "flex-start"
    }
}));

const Navbar = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Grid container spacing={3}>
                        <Grid container item xs={6} sm={4} alignItems="center" justify="flex-start">
                            <Typography variant="h5" className={classes.title}>
                                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>MOLLYWOOD</Link>
                            </Typography>
                        </Grid>
                        {isMobile ? (
                            <>
                             <Grid container item xs={6} alignItems="center" justify="flex-end">
                                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-controls="simple-menu" aria-label="menu" aria-haspopup="true" onClick={handleClick}>
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}                                    
                                >                                    
                                    <MenuItem onClick={handleClose}>
                                        <Button className={classes.menuItem} color="inherit" href="/movielist">Кино</Button>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Button className={classes.menuItem} color="inherit" href="/movies">Цуврал</Button>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Button className={classes.menuItem} color="inherit" href="/movies">Уран бүтээлч</Button>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Button className={classes.menuItem} color="inherit" href="/movies">Блог</Button>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Button className={classes.menuItem} color="inherit" href="/movies">Хайх</Button>
                                    </MenuItem>
                                    <MenuItem onClick={() => props.setDarkMode(!props.darkMode)}>
                                        <Button className={classes.menuItem} color="inherit">Харанхуй горим</Button>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                    <Button className={classes.menuItem} color="inherit">Нэвтрэх</Button>
                                    </MenuItem>
                                </Menu>
                            </Grid>
                            </>
                        ) : (
                            <>
                            <Grid item sm={4} className={classes.headerOptions}>
                                {/* <Button color="inherit" href="/about">Бидний тухай</Button> */}
                                <Button color="inherit">
                                    <Link to="/movielist" style={{ textDecoration: 'none', color: 'white' }}>Кино</Link>                                                                            
                                </Button>
                                <Button color="inherit">
                                    <Link to="/series" style={{ textDecoration: 'none', color: 'white' }}>Цуврал</Link>                                                                            
                                </Button>
                                <Button color="inherit">
                                    <Link to="/artists" style={{ textDecoration: 'none', color: 'white' }}>Уран бүтээлч</Link>                                                                            
                                </Button>
                                <Button color="inherit">
                                    <Link to="/blog" style={{ textDecoration: 'none', color: 'white' }}>Блог</Link>                                                                            
                                </Button>
                            </Grid>
                            <Grid container item sm={4} alignItems="center" direction="row" justify="flex-end">                                
                                <IconButton aria-label="search" color="inherit">
                                    <SearchIcon />
                                </IconButton>                                
                                <IconButton aria-label="darkmode" color="inherit" onClick={() => props.setDarkMode(!props.darkMode)}>
                                    {props.darkMode ? (
                                        <LightIcon />
                                    ) : (
                                        <DarkIcon />
                                    )}                                    
                                </IconButton>
                                <IconButton aria-label="notification" color="inherit">
                                    <NotificationsIcon />
                                </IconButton>                            
                                <IconButton aria-label="notification" color="inherit">
                                    <AccountCircleIcon />
                                </IconButton> 
                                {/* <Button color="inherit">Нэвтрэх</Button> */}
                            </Grid>
                            </>
                        )}
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;