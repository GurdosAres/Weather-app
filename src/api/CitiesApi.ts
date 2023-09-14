

export default async function citiesApi(SearchTerm:string){



            const response = await fetch("http://geodb-free-service.wirefreethought.com/v1/geo/places?namePrefix=" + SearchTerm + "&hateoasMode=false&limit=10&offset=0",{
                cache:"no-store"
            })
                                                                    
            return await response.json()
};






