import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import PageHeader from '../PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutline';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({

  table: {
    minWidth: 650,
  },

});


export default function DenseTable({  values,Toggle,Delete,Update}) {

  const classes = useStyles();
  
  const [open, setOpen] = React.useState(false);

  


  const handleClickOpen = () => {
   
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  
 
  
 

  //toggle
  const goggle = () => {
    Toggle();
  }

  return (
    <div>
      <PageHeader
        title="All Employee"
        subTitle="Form design with validation"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper>
        <Button variant="contained" color="primary" size="small" onClick={goggle}><AddIcon />Add New</Button>
        <br></br>
        <br></br>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell >Last name</TableCell>
                <TableCell >Email</TableCell>
                <TableCell >Phone Number</TableCell>
                <TableCell align="center">Actions</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {values.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.firstName}
                  </TableCell>
                  <TableCell >{row.lastName}</TableCell>
                  <TableCell >{row.email}</TableCell>
                  <TableCell >{row.phoneNumber}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={()=>Update(row._id)}>
                      UPDATE
                  </Button>
                    <Button variant="contained" color="secondary" onClick={()=>Delete(row._id)} >
                      DELETE
                  </Button>
                    <Button variant="contained" color="default" onClick={handleClickOpen} >
                      View
                  </Button>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Employee</DialogTitle>
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  label="First Name"
                  name="firstName"
                  value={values.firstName}
                />
                <TextField
                  variant="outlined"
                  label="last Name"
                  name="lastName"
                  value={values.lastName}
                />
                <TextField
                  variant="outlined"
                  label="Birthday"
                  type="date"
                  name="dob"
                  values={values.dob}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField

                  variant="outlined"
                  label="Email"
                  name="email"
                  value={values.email}
                />
                <TextField
                  variant="outlined"
                  label="address"
                  name="address"
                  value={values.address}
                />
                <TextField
                  variant="outlined"
                  label="Phone Number"
                  name="phoneNumber"
                  value={values.phoneNumber}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel variant='outlined'
                  >Designation</InputLabel>
                  <Select value={values.value}>
                    <MenuItem value={"Senior Developer"}>Senior Developer</MenuItem>
                    <MenuItem value={"Junior Developer"}>Junior Developer</MenuItem>
                    <MenuItem value={"human Resource"}>Human Resource</MenuItem>
                  </Select>
                </FormControl>
                <br></br>
                <TextField
                  variant="outlined"
                  label="City"
                  name="city"
                  value={values.city}
                />
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup name="gender" row={true}>
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
                <TextField
                  variant="outlined"
                  label="Salary in Rupees"
                  name="salary"
                  value={values.salary}
                />
                <br></br>
                <br></br>
                <br></br>
              </Grid>
            </Grid>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={handleClose} color="primary">
              Submit
          </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
}