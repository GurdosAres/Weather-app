import "@/components/ListOfCities.css";
import DataApi from "@/api/CitiesApi";
import { Dispatch, MouseEventHandler, SetStateAction, useReducer } from "react";

import Loading from "./Loading";
import { useEffect, useRef, useState,useContext } from "react";

import { AppContext } from "@/app/page"

type Props = {
  searchTerm: string,
  setSearch:any,
};


export default  function ListOfCities({ searchTerm,setSearch}: Props) {

  

  const [cities,setCities] = useState<Result[]>([])
  const [loading,setLoading] = useState(false)
  const [state,setState] = useState(-1)
  const [notFound,setNotFound] = useState(searchTerm)
  const ref = useRef<NodeJS.Timeout | undefined>(undefined)
  
  const {once,setOnce,data__,SetData} = useContext(AppContext)

  const saveCityToCard = (id:number,target:any):MouseEventHandler<HTMLButtonElement> | undefined  => {

    const city:Result | undefined = cities.find(elem => elem.id === id)
    if(city === null) {
      console.log("was not found")
      return
    }
    console.log(target)
    if(data__){
      const jsData:City[] = data__
      if(jsData.find((city_) => city_.id === city?.id)){
        alert("already Is Added!")
        setCities(cur => cur = [])
        setSearch("")
        return
      }else{
        SetData([...jsData,{id:city?.id,latitude:city?.latitude,longitude:city?.longitude}])
        setCities(curr => curr = [])
        setSearch("")
        setOnce(0)
        return 
      }
      
    }else{
      SetData([{id:city?.id,latitude:city?.latitude,longitude:city?.longitude}])
      setCities(curr => curr = [])
      setSearch("")
      setOnce(0)
    }

    //  const data = await WheatherApi(obj)
  }

 
    useEffect(()=>{

      clearTimeout(ref.current)
      if(searchTerm === ''){
        setCities([]);
      }
      ref.current = setTimeout( async () =>{
        if(searchTerm !== '' ){
          setLoading(true)
          setCities([]);
          setState(-1)
          const  data = await DataApi(searchTerm);
          setCities(current => current = data);
          setLoading(cur => cur = false)
          setNotFound(cur => cur = searchTerm)
        }
      },600)
    },[searchTerm])
 
    // Function to fetch data and update state
    

    
    if (loading) {
      return (<Loading></Loading>)
    }
    
  if (!loading && searchTerm !== "" && cities.length === 0 && state === 0) {
    return  (
      <button className="city" >
        <b>{notFound}</b> Not Found
      </button>
    );
  }
 

  return cities.map((result,index) => (
    <button className="city" key={index + "options"} onClick={(e) => {saveCityToCard(result.id,e)}} >
      {result.name}
    </button>
  ));
}
