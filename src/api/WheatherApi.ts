require("dotenv").config()

export default async function WheatherApi(params:WheatherParams){

    const parameters = new URLSearchParams({
        key: `0af46f5e7d7240fc891114925232008`,
        q: params.latitude +"," +params.longitude,
        ...(params.days) && {days: params.days.toString()},
      }).toString();

    const response = await fetch("https://api.weatherapi.com/v1/"+params.OnWhen+".json?key=0af46f5e7d7240fc891114925232008&q="+params.latitude+" "+params.longitude,{
        cache:'no-store'
    })


    return await response.json()

};

