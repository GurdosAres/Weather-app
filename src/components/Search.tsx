import "@/components/Search.css"
import { Dispatch, SetStateAction, Suspense, useState } from "react";
import ListOfCities from "./ListOfCities";
import Loading from "./Loading";

function Search() {

        const [search, setSearch] = useState('')
    return (
        <div className="search">
        <input 
            type="text"
            value={search}
            onChange={(e) => {setSearch(e.target.value.trimStart())}   }
            className="search-field"
            placeholder="Type a City... " />
        <div className="cities">
        <Suspense  fallback={<Loading/>}> 
            <ListOfCities searchTerm={search} setSearch={setSearch} ></ListOfCities>    
        </Suspense >
        
            </div>
        </div>
    )
}

export default Search;