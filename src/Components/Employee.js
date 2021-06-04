import { Paper,makeStyles } from '@material-ui/core';
import React,{useEffect, useState} from 'react';
import CreateEmployeeForm from './pages/CreateEmployeeForm';
import DataTable from './pages/DataTable';



const useStyles = makeStyles((theme)=>({
   pageContent:{
       margin: theme.spacing(3),
       padding: theme.spacing(3) 
   }

    }))

function Employee(){

    const [values, setValues] = useState('');
    
    const [toggle,setToggle] = useState(true);
    const[edit,setEdit]=useState('');   
 
    const classes= useStyles();

    const changeToggle=() =>{
        setToggle(false);
    }
    const removeToggle=()=>{
        setToggle(true);
      
    }
    
    

    
     const getapi=()=> {  
    //**import all employees */
      
      const url="https://emp-crud-swagger.herokuapp.com/Employees"  
      fetch(url)
        .then(response => response.json())
        .then(response => {
         
          setValues(
             response
          )
          
        })
        .catch(err => { console.log(err); 
        });
       
        console.log(values);
       
    }  

    
      
      const postApi=(input)=>{
        console.log(input);          
            fetch("https://emp-crud-swagger.herokuapp.com/employees", {
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                "body": JSON.stringify({ ...values,
                    firstName: input.firstName,
                    lastName:input.lastName,
                    dob:input.dob,
                    email:input.email,
                    address:input.address,
                    phoneNumber:input.phoneNumber,
                    desigNation:input.desigNation,
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
        console.log(id);
     }
        //Update
          const Update = (id) => {
        // this will update entries with PUT
              fetch(`https://emp-crud-swagger.herokuapp.com/Employees/${id}`, {
              "method": "PUT",
              "headers": {
                  "content-type": "application/json",
                  "accept": "application/json"
              },
              "body": JSON.stringify({
                    firstName: edit.firstName,
                    lastName: edit.lasttName,
                    dob:edit.dob,
                    email:edit.email,
                    address:edit.address,
                    phoneNumber: edit.phoneNumber,
                    designation: edit.designation,
                    city:edit.city,
                    gender: edit.gender,
                    salary: edit.salary,
              })
              })
              .then(response => response.json())
              .then(response => { 
                setEdit(
                 response
                )
               
              })
             .catch(err => { console.log(err); });
            
            }
            useEffect(()=>{getapi()},[])

     
     // console.log(values);

    return(
        <>    
          <Paper  className={classes.pageContent}>
            {toggle?
                <CreateEmployeeForm changeToggle={changeToggle} values={values} postApi={postApi} />
            :<DataTable values={values} Toggle={removeToggle}  Delete={Delete} Update={Update} postApi={postApi}  />}
          </Paper>
        </>
    )
}

export default Employee;