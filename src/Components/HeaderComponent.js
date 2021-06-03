import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { Badge,  IconButton, InputBase, makeStyles } from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles({
    root:{
        backgroundColor:'#fff'
    },
    searchInput:{
        opacity:'0.6',
        padding:'0px 8px',
        fontSize:"0.8rem"
    },
    '&:hover':{
        backgroundColor:'#f2f2f2'
    },
    '& .MuiSvgIcon-root':{
        marginRight:'8px'
    },
   
})


const  HeaderComponent=()=>
{  
    const classes= useStyles();
        return (
            
                <AppBar position="static" className={classes.root}>
                    <Toolbar>
                        <Grid container  alignItems="center">
                            <Grid item >
                                <InputBase
                                placeholder="Search topics"
                                startAdornment={<SearchIcon fontSize="small"/>}
                                className={classes.searchInput}/>
                            </Grid>
                            <Grid item sm></Grid>
                            <Grid item >
                                <IconButton >
                                    <Badge badgeContent={4} color="secondary" >
                                       <NotificationsNoneIcon/>  
                                    </Badge>
                                    
                                    <Badge badgeContent={4} color="primary">
                                       <ChatBubbleOutlineIcon/>
                                    </Badge>
                                    
                                    <Badge  >
                                       <PowerSettingsNewIcon/>
                                    </Badge>
                                </IconButton>
                            </Grid>
                           
                        </Grid>
                    
                    </Toolbar>
                </AppBar>
                

               
        )
}



export default HeaderComponent