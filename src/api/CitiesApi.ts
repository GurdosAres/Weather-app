

export default async function citiesApi(SearchTerm:string){



            const response = await fetch("https://api.api-ninjas.com/v1/city?name=" + SearchTerm ,{
                cache:"no-store",
                headers:{
                'X-Api-Key': 'GH1W/1K1hDU35K3DUNBB3A==Q5NioKWqQIja0EdN'
                }
            })
                                                                    
            return await response.json()
};






