import React, {useState, useEffect} from 'react'
import Navigation from './Navigation'

export default function Onedata() {
    const path = window.location.pathname
    const surveyId = path.substring(9,path.length)

    const [oneData, setOneData] = useState([])
    const [state, setState] = useState(true)

    async function getOneData(){
        const res = await fetch("http://localhost:8000/forms/" + surveyId, {
          method: "GET",
        });
        const data = await res.json();
        setOneData(data)
      }

    useEffect(()=>{
        if (state) {
          getOneData()
          setState(false)
        }
    }, [state])

  return (
    <div>
        <header>
            <Navigation/>
        </header>
        <div>
            <pre>{JSON.stringify(oneData, null, 2)}</pre>
        </div>
    </div>
  )
}
