import { Button, FormControl,  InputLabel, makeStyles, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import PageHeader from '../PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutline';
import{toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        },
        Button: {
            marginLeft: theme.spacing(6)
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        label: {
            textTransform: 'none'
        },
        '&.MuiButtonBase-root ': {
            padding: theme.spacing(2),
            margin: theme.spacing(1)
        }

    }
}))


toast.configure()


function CreateEmployeeForm({ values, changeToggle,postApi,validateOnChange = false}) {
    const initialFValues = {
        id: '',
        firstName: '',
        lastName: '',
        dob:Date(),
        email: '',
        address:'',
        phoneNumber: '',
        desigNation:'',
        city: '',
        gender: 'male',
        salary:''
    }

    const notify=()=>{
        toast.success('Employee is successfully addded',{position:toast.POSITION.TOP_CENTER});
    }
    

     const [input, setInput] = useState(initialFValues);
     const [errors,setErrors]= useState('');
  
    const classes = useStyles();
    
  

    //Validation
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "This field is required."
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "Minimum 10 numbers required."
        if ('phoneNumber' in fieldValues)
            temp.phoneNumber = fieldValues.phoneNumber.length > 9 ? "" : "Minimum 10 numbers required."
        if ('designation' in fieldValues)
            temp.designation = fieldValues.designation ? "": "This field is required."
        if ('city' in fieldValues)
            temp.city = fieldValues.city ? "": "This field is required."
        if ('salary' in fieldValues)
            temp.salary = fieldValues.salary ? "": "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    // HandleChange in Input Field
    const handleInputChange = e => {
        const { name,value } = e.target
        setInput({
            ...input,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })          
    }
    
    //Submit data to State
    const handleSubmit = () => {
        if (validate()) {            
        console.log(input);        
        postApi(input);        
        resetForm();
        changeToggle();
        }
      };

    //resetForm intialValues
    const resetForm = () => {
        setInput(initialFValues);
        ;
    };

    return (
        <div>
        <PageHeader
        title="New Employee"
        subTitle="Form design with validation"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
        />
        <FormControl className={classes.root}  >
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        label="First Name"
                        name="firstName"
                        value={input.firstName}
                        onChange={handleInputChange}
                        error={errors.firstName}
                     />
                    <TextField
                        variant="outlined"
                        label="last Name"
                        name="lastName"
                        value={input.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName} 
                    />
                    <TextField
                        variant="outlined"
                        label="Birthday"
                        type="date"
                        name="dob"
                        value={input.dob}
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
                        value={input.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <TextField
                        variant="outlined"
                        label="address"
                        name="address"
                        value={input.address}
                        onChange={handleInputChange}
                        error={errors.address}
                    />
                    <TextField
                        variant="outlined"
                        label="Phone Number"
                        name="phoneNumber"
                        value={input.phoneNumber}
                        onChange={handleInputChange}
                        error={errors.phoneNumber}
                    />

                </Grid>
                <Grid item xs={6}>

                        <FormControl>
                        <InputLabel variant='outlined' 
                        >Designation</InputLabel>
                        <Select onChange={handleInputChange} name="desigNation" 
                        value={input.desigNation}
                         >
                            <MenuItem value={"Senior Developer"}>Senior Developer</MenuItem>
                            <MenuItem value={"Junior Developer"}>Junior Developer</MenuItem>
                            <MenuItem value={"Human Resource"}>Human Resource</MenuItem>
                        </Select>
                        </FormControl>
                    <TextField
                        variant="outlined"
                        label="City"
                        name="city"
                        value={input.city}
                        onChange={handleInputChange}
                        error={errors.city}
                    />
                    <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup name="gender" value={input.gender} onChange={handleInputChange} row={true}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <   FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    <TextField
                        variant="outlined"
                        label="Salary in Rupees"
                        name="salary"
                        value={input.salary}
                        onChange={handleInputChange}
                        error={errors.salary}
                    />
                    <br></br>
                    <br></br>
                    <br></br>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        classes={{ root: classes.root, label: classes.label }}
                       
                        onClick={()=>{
                            handleSubmit()
                            notify()
                            }}           
                    >
                        Submit
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        color="default"
                        classes={{ root: classes.root, label: classes.label }}
                        onClick={resetForm}>
                        Reset
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        classes={{ root: classes.root, label: classes.label }}
                        onClick={changeToggle}>
                        Next
                    </Button>
                </Grid>
            </Grid>
        </FormControl>
        </div>
    );
}

export default CreateEmployeeForm;