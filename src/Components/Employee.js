import { Paper, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CreateEmployeeForm from './pages/CreateEmployeeForm';
import DataTable from './pages/DataTable';
import TextField from '@material-ui/core/TextField';
import PageHeader from './PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutline';




const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(3)
  }

}))

function Employee() {

  const [values, setValues] = useState('');

  const [toggle, setToggle] = useState(true);
  const [q, setQ] = useState('');
  
  


  const classes = useStyles();

  const changeToggle = () => {
    setToggle(false);
  }
  const removeToggle = () => {
    setToggle(true);

  }


  const search = () => {
    if(q===''){
      return values.employees
    }else{
    

    return values.employees.filter(row => row.firstName.toLowerCase() === q.toLowerCase())
  }
  }



  const getapi = () => {
    //**import all employees */

    const url = "https://emp-crud-swagger.herokuapp.com/Employees"
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


  useEffect(() => { getapi() }, [])
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
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className={classes.textField}></TextField>
            <DataTable values={search(values)} Toggle={removeToggle} Delete={Delete} Update={Update} postApi={postApi} />
          </div>}
      </Paper>
    </>
  )
}

export default Employee;