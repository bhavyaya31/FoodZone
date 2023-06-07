import styled from 'styled-components'
import {useEffect, useState} from 'react'
import SearchResult from './SearchResult/SearchResult';
export const BASE_URL="http://localhost:9000";


const App = () => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [filteredData, setfilterData] = useState(null);
  const [selectedBtn, setselectedBtn] = useState("all");

useEffect(()=>{  
const fetchFoodData = async()=>{
  setloading(true )
 
try{
  const response = await fetch(BASE_URL)
  const json= await response.json();
  console.log(json)
  setdata(json);
  setfilterData(json);
  setloading(false ); 
}
catch(error){
  seterror("unable to fetch data ")
 
}
} 
fetchFoodData()
},[])    //[] this is called as dependency array to run the code once if you don't use it than it will run infinite times


const searchfood = (e) =>{
  const searchvalue = e.target.value; 
  console.log(searchvalue)

  if(searchvalue === ""){
    setfilterData(null);
  }
  const filter = data?.filter((food)=>
  food.name.toLowerCase().includes(searchvalue.toLowerCase()))
  setfilterData(filter)
}

const filterFood = (type) =>{
  if(type==="all"){
    setfilterData(data);
    setselectedBtn("all");
    return;
  }
  const filter = data?.filter((food)=>
  food.type.toLowerCase().includes(type.toLowerCase()))
  setfilterData(filter)
  setselectedBtn(type)
}


if(error) return <div>{error} </div>
if(loading) return <div> loading... </div>

  return (
  <>
  <Container> 
    <TopContainer>
  <div className='logo'>
    <img src="/logo.svg" alt="logo" />
  </div>
  <div className='search'>
    <input onChange={searchfood } placeholder='Search Food...' />
  </div>
    </TopContainer>


<FilterContainer>
<Button onClick={() => filterFood("all")}>All</Button>
<Button onClick={() => filterFood("Breakfast")}>Breakfast</Button>
<Button onClick={() => filterFood("Lunch")}>Lunch</Button>
<Button onClick={() => filterFood("Dinner")}>Dinner</Button>
</FilterContainer>
</Container>
<SearchResult data={filteredData}/>
  </>
)};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  
`
const TopContainer = styled.section`
  min-height:140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
 
 
  .search{
    input{
    background-color: transparent;
    color: white;
    font-weight: 400;
    font-size: 16px;
    border: 2px solid red;
    border-radius: 5px;
    height: 40px;
    width:200px;
    padding: 0 10px;
    &::placeholder{
      color:white;
    }
    }
  }
  
`
const FilterContainer =styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`
export const Button = styled.button`
  background: #FF4343;
  color: white;
border-radius: 5px;
padding: 6px 12px;
cursor: pointer;
&:hover{
  background-color: #c33737;
}
`
