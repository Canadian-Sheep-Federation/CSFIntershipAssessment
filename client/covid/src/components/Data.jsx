import React, {useState, useEffect} from 'react'
import Navigation from './Navigation'
import {Button, Form} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import "../styles/GetData.css"

export default function Data() {
    let navigate = useNavigate();
    const [surveyId, setSurveyId] = useState(0)

    function handleSurveyId(e){
        setSurveyId(e.target.value)
    }

    const routeChange1 = () =>{ 
        navigate("/alldata")
      }
    
    const routeChange2 = () =>{ 
        let path = "/onedata/" + surveyId
        navigate(path)
      }
      
  return (
    <div className="data">
        <header>  
            <Navigation />
        </header>
        <form className="get-survey">
            <h3 className="all-submit">Get All Survey Data:</h3>
                <Button variant="primary" size="md" onClick={routeChange1}>
                    All Survey Data
                </Button>
            <br></br>
            <br></br>
            <h3>Get Survey Data By ID:</h3>

            <Form className="one-submit">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Survey ID:</Form.Label>
                    <Form.Control type="surveyId" placeholder="surveyId" onChange={handleSurveyId}/>
                </Form.Group>

                <Button variant="primary" size="md" onClick={routeChange2}>
                    Get Survey By ID
                </Button>
            </Form>

        </form>
    </div>
  )
}
