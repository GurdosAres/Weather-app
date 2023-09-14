"use client"
import CardCity from "@/components/CardCity";
import  "./page.css"  
import Search from "@/components/Search";
import React,{useState,createContext, useEffect } from "react";


type GlobalContent = {
  once: number,
  setOnce:any,
  data__:City[],
  SetData:any,
}

export const AppContext = createContext<GlobalContent>({
  once: 0, 
  setOnce: () => {},
  data__:[],
  SetData:() => {}
})

export default function Home() {
  
  const [once,setOnce] = useState(0)
  const [data__,SetData]  = useState<City[]>([])

  useEffect(()=>{

    setOnce(1)
  },[once])

  return (  
    <AppContext.Provider value={{once,setOnce,data__,SetData} }>
    <div  className="bg">
     
        <div className="main">
          
            <Search />
          
          
         
          </div>
            <section className="card-place">


                { data__.length > 0 ? 
                  
                  <CardCity  Data_={data__ as City[]} /> 
                  :
                  <h1>{new Date().toString().slice(16, 21)}</h1>
                  }
              
          </section>
         
        </div>
        </AppContext.Provider>
  )
  
  
}

