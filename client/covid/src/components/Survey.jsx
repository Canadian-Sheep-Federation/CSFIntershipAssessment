import React, {useState} from 'react'
import Navigation from './Navigation'
import {Form, FloatingLabel, InputGroup, FormControl, Button} from 'react-bootstrap';
import "../styles/Survey.css"


export default function Survey() {

  const [first, setFirstName] = useState('')
  function handleFirstNameChange(e){
      setFirstName(e.target.value)
  }

  const [last, setLastName] = useState('')
  function handleLastNameChange(e){
      setLastName(e.target.value)
  }

  const [email, setEmail] = useState('')
  function handleEmailChange(e){
      setEmail(e.target.value)
  }

  const [phone, setPhone] = useState('')
  function handlePhoneChange(e){
      setPhone(e.target.value)
  }

  const [province, setProvince] = useState("NL")
  const [dose, setDose] = useState(1)

  const [comment, setComment] = useState('')
  function handleCommentChange(e){
      setComment(e.target.value)
  }

  async function submitSurvey(data){
    await fetch('http://localhost:8000/forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        ///navigate('/')
    }).catch((error) => {
        console.error('Error:', error);
    });
  }

  function submitForm(){
    const data = {
        firstName: first,
        lastName: last,
        email: email,
        phone: phone,
        province: province,
        doses: dose,
        comment: comment
    }
    submitSurvey(data)
  }

  return (
    <div className="form">
        <header>  
            <Navigation />
        </header>
        <form className="survey">
            <Form.Group className="first" >
                <Form.Label for="firstName" >First Name:</Form.Label>
                <Form.Control id="firstName" placeholder="First Name" onChange={handleFirstNameChange}/>
            </Form.Group>
            <Form.Group className="last" >
                <Form.Label for="lastName" >Last Name:</Form.Label>
                <Form.Control id="lastName" placeholder="Last Name" onChange={handleLastNameChange}/>
            </Form.Group>
            <Form.Group className="email" >
                <Form.Label for="email" >Email Address:</Form.Label>
                <Form.Control id="email" placeholder="Email" onChange={handleEmailChange}/>
            </Form.Group>
            <Form.Group className="phone" >
                <Form.Label for="phone" >Phone Number:</Form.Label>
                <Form.Control id="phone" placeholder="Phone Numberr" onChange={handlePhoneChange}/>
            </Form.Group>
            
            <Form.Group className="province">
              <Form.Label for="province">Province:</Form.Label>
                <FloatingLabel controlId="province" label="Province">
                    <Form.Select aria-label="Province" onChange={(e) => setProvince(e.target.value)}>
                        <option value="NL">NL</option>
                        <option value="PE">PE</option>
                        <option value="NS">NS</option>
                        <option value="NB">NB</option>
                        <option value="QC">QC</option>
                        <option value="ON">ON</option>
                        <option value="MB">MB</option>
                        <option value="SK">SK</option>
                        <option value="AB">AB</option>
                        <option value="BC">BC</option>
                        <option value="YT">YT</option>
                        <option value="NT">NT</option>
                        <option value="NU">NU</option>
                    </Form.Select>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="doses">
              <Form.Label for="doses">Doses:</Form.Label>
                <FloatingLabel controlId="doses" label="Doses">
                    <Form.Select aria-label="Dose" onChange={(e) => setDose(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </Form.Select>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="comment">
              <Form.Label for="comment">Tell us about your COVID-19 side effects and experiences:</Form.Label>
              <InputGroup>
                <FormControl as="textarea" aria-label="With textarea" onChange={handleCommentChange}/>
              </InputGroup>
            </Form.Group>

            <Button variant="primary" size="submit" onClick={submitForm}>
              Submit
            </Button>
        </form>
    </div>
  )
}
