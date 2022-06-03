import React, {useState, useEffect} from "react";
import Navigation from './Navigation'

export default function Alldata() {
    const [allData, setAllData] = useState([])
    const [state, setState] = useState(true)

    async function getAllData(){
        const res = await fetch("http://localhost:8000/forms", {
          method: "GET",
        });
        const data = await res.json();
        setAllData(data)
      }
    
    useEffect(()=>{
        if (state) {
          getAllData()
          setState(false)
        }
    }, [state])

  return (
    <div>   
        <header>  
            <Navigation />
        </header>
        <div>
            <pre>{JSON.stringify(allData, null, 2)}</pre>
        </div>
    </div>
  )
}
