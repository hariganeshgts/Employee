
import { createMuiTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import './App.css';
import HeaderComponent from './Components/HeaderComponent';
// import CreateEmployeeForm from './Component/CreateEmployeeForm';


// import Table from './Component/Table';
import SideMenu from './Components/SideMenu';

import Employee from './Components/Employee';

const theme = createMuiTheme({
  palette:{
    primary:{
      main:'#3f51b5',
      light:"#7986cb"
    },
    secondary:{
      main:'#f50057',
      light:'#ff4081'
    },
    background:{
      default:'#f4f5fd',
    },
  },
  shape:{
    borderRadius:'12px'
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})


const useStyles = makeStyles({
  appMain:{
    paddingLeft:'320px',
    width:'100%'
  }
})


function App() {

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
    <SideMenu/>
    <div className={classes.appMain}>
    <HeaderComponent/>
    
      <Employee/>

    </div>
    <CssBaseline/>
    
    </ThemeProvider>
  );
}

export default App;
