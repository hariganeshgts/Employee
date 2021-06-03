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
    const[notify,setNotify]= useState({isOpen:false,
      message:"",
      type:''})
    
    const [toggle,setToggle] = useState(true);   
 
    const classes= useStyles();

    const changeToggle=() =>{
        setToggle(false);
    }
    const removeToggle=()=>{
        setToggle(true);
      
    }
        
    //**import all employees */
    useEffect(()=> {    
      const url="https://emp-crud-swagger.herokuapp.com/Employees"  
      fetch(url)
        .then(response => response.json())
        .then(response => {
          console.log("getapi",response);
          setValues(
             response
          )
        })
        .catch(err => { console.log(err); 
        });
      },[]);        
      
      const postApi=(input)=>{
        console.log(input);     
            fetch("https://emp-crud-swagger.herokuapp.com/Employees", {
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                "body": JSON.stringify({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    dob:values.dob,
                    email:values.email,
                    address:values.address,
                    phoneNumber:values.phoneNumber,
                    desigNation:values.desigNation,
                    city: values.city,
                    gender: values.gender,
                    salary: values.salary,
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
        setNotify({
            isOpen:true,
            message:"Are sure you need to delete",
            type:'error'
          })
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
         useEffect(() => {
          fetch(`https://emp-crud-swagger.herokuapp.com/Employees/${id}`, {
              "method": "PUT",
              "headers": {
                  "content-type": "application/json",
                  "accept": "application/json"
              },
              "body": JSON.stringify({
                    
                    firstName: values.firstName,
                    lastName: values.lasttName,
                    D_O_B: values.D_O_B,
                    email: values.email,
                    address:values.address,
                    phoneNumber: values.phoneNumber,
                    designation: values.designation,
                    city: values.city,
                    gender: values.gender,
                    salary: values.salary,
              })
              })
              .then(response => response.json())
              .then(response => { console.log(response);
              })
              .catch(err => { console.log(err); });
         })
      }
     // console.log(values);

    return(
        <>    
          <Paper  className={classes.pageContent}>
            {toggle?
                <CreateEmployeeForm changeToggle={changeToggle} values={values} postApi={postApi} />
            :<DataTable values={values} Toggle={removeToggle}  Delete={Delete} Update={Update} />}
          </Paper>
        </>
    )
}

export default Employee;