import "@/components/CardCity.css"
import windPng from "@/icons/wind.png"
import visibilityPng from "@/icons/visible.png"
import WheatherApi from "@/api/WheatherApi"
import { useEffect, useState, useContext } from "react"
import { AppContext } from "@/app/page"
import Image from "next/image"

enum WeatherOPT {
  Current  = "current",
  Forecast  = "forecast",
  Future  = "future",
}

export default  function CardCity({Data_}:{Data_:City[]}) {

  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  const [cities,setCities] = useState<DataWheather[]>([])
  const [loading,setLoading] = useState(false)
  const {once,setOnce} = useContext(AppContext)
 

  useEffect( () => {
    
    const func =  async () =>{
      setLoading( true)
      const promises= Data_.map( async (data_) => {
        const params:WheatherParams = {
          OnWhen:WeatherOPT.Current,
          latitude:data_.latitude.toString().trim(),
          longitude:data_.longitude.toString().trim(),
        }
        return await  WheatherApi(params)
      })

      setLoading( true)
      const values = await Promise.allSettled(promises).then( (values) => {
        
        
       
        return values.map((value) => { 
          
          if(value.status === "fulfilled"){
            
            return  value.value as DataWheather
          }
        }) as DataWheather[]
        
     
    })
    setLoading(false)
    setOnce(1)
    setCities(values)
  } 

  if(once === 0)
    func()  
    
  
  },[once])

    if(loading){
      return Data_.map((val,index)=>{
        return (
          <div className="card" key={index} >
               <h1>{val.name}</h1>
          </div>
        )
      })
    }

    const content = cities.map((data,index) => {
      return (
        <div className="card"  key={index} >
        <div>
          <span className="refresh-icon" onClick={ () => setOnce(0)}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="60" viewBox="0 0 30 30">
              <path d="M 15 3 C 12.053086 3 9.3294211 4.0897803 7.2558594 5.8359375 A 1.0001 1.0001 0 1 0 8.5449219 7.3652344 C 10.27136 5.9113916 12.546914 5 15 5 C 20.226608 5 24.456683 8.9136179 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.441216 7.8348596 21.297943 3 15 3 z M 4.3007812 9 L 0.30078125 15 L 3 15 C 3 21.635519 8.3644809 27 15 27 C 17.946914 27 20.670579 25.91022 22.744141 24.164062 A 1.0001 1.0001 0 1 0 21.455078 22.634766 C 19.72864 24.088608 17.453086 25 15 25 C 9.4355191 25 5 20.564481 5 15 L 8.3007812 15 L 4.3007812 9 z"></path>
            </svg>
          </span>
  
        </div>
        <Image className="time-image" src={data.current.condition.icon} width={64} height={64} alt={data.current.condition.text} ></Image>
        
  
        <p className="txt-4rem">{data.current.condition.text}</p>
  
        <h1>{data.location.name}</h1>
        
  
        <div className="tempetaure"><span className="lft" >{data.current.temp_c}°</span>  <span style={{}} className="rght"> feels like {data.current.feelslike_c}°</span> </div>
  
        <div className="weatherData">
  
          <p className="rain" >
            
            <svg width="60" height="69" viewBox="0 0 25 49" fill="none"  xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 2C12.5 2 -13.375 48 12.5 48C38.375 48 12.5 2 12.5 2Z" fill={`url(#${"paint0_linear_" + data.location.name.split(/\s/).join('')})`} stroke="#534848" />
              <defs>
                <linearGradient id={"paint0_linear_" + data.location.name.split(/\s/).join('')} x1="12.8057" y1="48" x2="12.5304" y2="1.99999" gradientUnits="userSpaceOnUse">
                  <stop offset={data.current.humidity/100 - 0.05 } stopColor="#11FDEF" />
                  <stop offset={data.current.humidity/100 - 0.05+ 0.1 } stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            {data.current.humidity}%</p>
          <p className="minmaxClass">{ <Image className="wind" width={60} height={60} src={windPng.src} alt="Visibility"></Image>}
  
            <span className="txt-4rem" >{data.current.wind_kph} km/h</span>
          </p>
          <p className="minmaxClass"> {<Image className="wind" width={60} height={60} src={visibilityPng.src} alt="Visibility"></Image>}<span className="txt-4rem">Good</span> </p>
        </div>
        <p className="time_cur"><span> {data.location.localtime.slice(11)}</span></p>
  
      </div>
      )
    })

  return content
}



