import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import { Button, DialogContent, Typography } from '@material-ui/core';
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';


const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}



const useStyles = makeStyles((theme) => ({

  table: {
    minWidth: 650,
  },
  Button: {
    marginLeft: theme.spacing(1)
  },
  addButton: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(120)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  }


}));


toast.configure()

export default function DenseTable({ values, Toggle, Delete, Update }) {

  const classes = useStyles();
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [edit, setEdit] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, values.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const [open, setOpen] = React.useState(false);
  const [view, setView] = useState(false);

  const notify = () => {
    toast.error('Employee is successfully deleted', { position: toast.POSITION.TOP_CENTER });
  }




  const handleSubmit = () => {
    console.log(edit);
    Update(edit);
  }

  const handleInputChange = e => {

    const { name, value } = e.target
    setEdit({
      ...edit,
      [name]: value
    })
  }

  //View Dialog Box
  const View = (rowData) => {
    setView(rowData);
    setView(true);

  }
  ///Close Dialog Box
  const closeView = () => {
    setView(false)
  }

  //Edit DialogOpen 
  const handleClickOpen = (rowData) => {
    setEdit(rowData);
    setOpen(true);

  };
  //Edit Dialog Close
  const handleClose = () => {
    setOpen(false);

  };

  //toggle
  const goggle = () => {
    Toggle();
  }
  //Delete PopUp
  const modelView = (row) => {
    setEdit(row);
    setModelIsOpen(true);

  }
  //Delete PopUp Close
  const modelClose = () => {
    setModelIsOpen(false);
  }
  //is Delete
  const isDelete = (edit) => {
    Delete(edit._id);
    notify();
    modelClose();
  }




  return (
    <div>

      <Paper>
        <Button variant="contained" color="primary" size="small" onClick={goggle} className={classes.addButton}><AddIcon />Add New</Button>

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
              {(rowsPerPage > 0
            ? values.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            :values).map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.firstName}
                  </TableCell>
                  <TableCell >{row.lastName}</TableCell>
                  <TableCell >{row.email}</TableCell>
                  <TableCell >{row.phoneNumber}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" size="small" className={classes.Button} onClick={() =>
                      handleClickOpen(row)}>
                      UPDATE
                  </Button>
                    <Button variant="contained" color="secondary" size="small" className={classes.Button} onClick={() => {
                      modelView(row)
                    }} >
                      DELETE
                  </Button>
                    <Button variant="contained" color="default" size="small" className={classes.Button} onClick={() => View(row)}  >
                      View
                  </Button>

                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={values.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>

          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose} className={classes.Dialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Employee</DialogTitle>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="First Name"
                name="firstName"
                value={edit.firstName}
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                label="last Name"
                name="lastName"
                onChange={handleInputChange}
                value={edit.lastName}
              />
              <TextField
                variant="outlined"
                label="Birthday"
                type="date"
                name="dob"
                value={edit.dob}
                onChange={handleInputChange}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField

                variant="outlined"
                label="Email"
                name="email"
                onChange={handleInputChange}
                value={edit.email}
              />
              <TextField
                variant="outlined"
                label="address"
                name="address"
                onChange={handleInputChange}
                value={edit.address}
              />
              <TextField
                variant="outlined"
                label="Phone Number"
                name="phoneNumber"
                onChange={handleInputChange}
                value={edit.phoneNumber}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel variant='outlined'
                >Designation</InputLabel>
                <Select value={edit.value} onChange={handleInputChange} name="desigNation">
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
                onChange={handleInputChange}
                value={edit.city}
              />
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup name="gender" row={true} value={edit.gender}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
              <TextField
                variant="outlined"
                label="Salary in Rupees"
                name="salary"
                onChange={handleInputChange}
                value={edit.salary}
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
            <Button onClick={() => {
              handleClose()
              handleSubmit()
            }} color="primary">
              Submit
          </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={view} onClose={closeView} className={classes.Dialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">View Employee</DialogTitle>

          <Grid container>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="First Name"
                name="firstName"
                value={edit.firstName}
              />
              <TextField
                variant="outlined"
                label="last Name"
                name="lastName"
                value={edit.lastName}
              />
              <TextField
                variant="outlined"
                label="Birthday"
                type="date"
                name="dob"
                value={edit.dob}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField

                variant="outlined"
                label="Email"
                name="email"
                value={edit.email}
              />
              <TextField
                variant="outlined"
                label="address"
                name="address"
                value={edit.address}
              />
              <TextField
                variant="outlined"
                label="Phone Number"
                name="phoneNumber"
                value={edit.phoneNumber}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel variant='outlined'
                >Designation</InputLabel>
                <Select value={edit.value} name="desigNation">
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
                value={edit.city}
              />
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup name="gender" row={true} value={edit.gender}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
              <TextField
                variant="outlined"
                label="Salary in Rupees"
                name="salary"
                value={edit.salary}
              />
              <br></br>
              <br></br>
              <br></br>
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={closeView} color="primary">
              Cancel
          </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={modelIsOpen} onClose={closeView}>
          <DialogTitle>
            <DialogContent>
              <Typography varient='h6'>
                Warning
                </Typography>
              <Typography varient='subtitle2'>
                Are You Sure,You Need To Delete Record?
                </Typography>
            </DialogContent>
            <DialogActions>
              <Button varient='contained' color='default' onClick={() => modelClose()}>
                No
                </Button>
              <Button varient='contained' color='secondary' onClick={() => isDelete(edit)
              }>
                Yes
                </Button>
            </DialogActions>
          </DialogTitle>
        </Dialog>
      </Paper>
    </div>
  );
}