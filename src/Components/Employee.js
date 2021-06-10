import { Paper, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CreateEmployeeForm from './pages/CreateEmployeeForm';
import DataTable from './pages/DataTable';
import TextField from '@material-ui/core/TextField';
import PageHeader from './PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutline';
import Pagination from './Pagination';
import { getPanelId } from '@material-ui/lab';




const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(3)
  }

}))

function Employee() {

  const [values, setValues] = useState('');

  const [toggle, setToggle] = useState(true);
  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const classes = useStyles();

  const changeToggle = () => {
    setToggle(false);
  }
  const removeToggle = () => {
    setToggle(true);

  }


  // const shallSearch = () => {
  //   if (search == '') {
        
  //     return values.employees
  //   } else {
  //     const url = `https://emp-crud-swagger.herokuapp.com/Employees?firstName=${search}&page=${page}&&limit=${rowsPerPage}`
  //     fetch(url)
  //       .then(response => response.json())
  //       .then(response => {

  //         console.log(response);

  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });

  //     return (values.employees.filter(row => row.firstName.toLowerCase() === search.toLowerCase()));

  //   }
  // }

  useEffect(() => { getapi()  }, [page, rowsPerPage,search])


  const getapi = () => {
    //**import all employees */

    let url = `https://emp-crud-swagger.herokuapp.com/Employees`
    if(page){
      url=url+`?page=${page}`
    }
    if(rowsPerPage){
      url=url+`&limit=${rowsPerPage}`
    }
    if(search){
      url=url+`&firstName=${search}`
    }
    fetch(url)
      .then(response => response.json())
      .then(response => {

        setValues(
          response
        )

      })
      .catch(err => {
        console.log(err);
      });
  }









  const postApi = (input) => {
    console.log(input);
    fetch("https://emp-crud-swagger.herokuapp.com/employees", {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        firstName: input.firstName,
        lastName: input.lastName,
        dob: input.dob,
        email: input.email,
        address: input.address,
        phoneNumber: input.phoneNumber,
        desigNation: input.desigNation,
        city: input.city,
        gender: input.gender,
        salary: input.salary,
      })

    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err);
      });


  }



  //delete function
  const Delete = (id) => {
    console.log(values._id);
    // deletes entities
    fetch(`https://emp-crud-swagger.herokuapp.com/Employees/${id}`, {
      "method": "DELETE",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });

  }
  //Update
  const Update = (inputData) => {


    // this will update entries with PUT
    fetch(`https://emp-crud-swagger.herokuapp.com/Employees/${inputData._id}`, {
      "method": "PUT",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({

        firstName: inputData.firstName,
        lastName: inputData.lasttName,
        dob: inputData.dob,
        email: inputData.email,
        address: inputData.address,
        phoneNumber: inputData.phoneNumber,
        designation: inputData.designation,
        city: inputData.city,
        gender: inputData.gender,
        salary: inputData.salary,
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);


      })
      .catch(err => { console.log(err); });

  }

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handlechange = (e) => {
    setSearch(e.target.value);
  }



  // console.log(values);


  return (
    <>
      <Paper className={classes.pageContent}>
        {toggle ?
          <CreateEmployeeForm changeToggle={changeToggle} values={values} postApi={postApi} />
          : <div>
            <PageHeader
              title="All Employee"
              subTitle="Form design with validation"
              icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <TextField
              variant="outlined"
              type='text'
              value={search}
              onChange={handlechange}
              className={classes.textField}></TextField>
            <DataTable values={values} Toggle={removeToggle} Delete={Delete} Update={Update} postApi={postApi} />
            <Pagination values={values} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} page={page} rowsPerPage={rowsPerPage} />
          </div>}

      </Paper>
    </>
  )
}

export default Employee;