import Employee from "../Components/Employee";



function employes(){

    const [results,setResults]=useState([]);


    //***Import data from api */
    useEffect(()=> {    
        const url="https://emp-crud-swagger.herokuapp.com/Employees"  
    fetch(url)
          .then(response => response.json())
          .then(response => {
            setResults({
             results : response
            })
          })
          .catch(err => { console.log(err); 
          });
        },[]);        
        
        console.log(results); 


    return(
        <Employee results={results}/>
    );

}

export default employes;




