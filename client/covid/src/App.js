import React, {useState, useEffect} from 'react';
import Navigation from './components/Navigation';
import Basic from './components/Basic'
import "../src/styles/App.css"
import {Button, Form, FloatingLabel} from 'react-bootstrap';

function App() {
  const [covidReportRow, setCovidReport] = useState()
  const [state, setState] = useState(true)
  const [province, setProvince] = useState("NL")

  const fullReport = {}
  fullReport.columns = [
    {
      label: 'Date',
      field: 'date',
      width: 150,
      attributes: {
        'aria-controls': 'DataTable',
        'aria-label': 'Name',
      },
    },
    {
      label: 'Total Cases',
      field: 'total_cases',
      width: 150,
    },
    {
      label: 'Total Fatalities',
      field: 'total_fatalities',
      width: 150,
    },
    {
      label: 'Total Tests',
      field: 'total_tests',
      width: 150,
    },
    {
      label: 'Total Vaccinations',
      field: 'total_vaccinations',
      width: 150,
    },
  ]

  async function getCovidReport(){
      const res = await fetch("https://api.covid19tracker.ca/reports/province/" + province , {
        method: "GET",
      });
      const data = await res.json();
      const rows = []
      for (let i = 0; i < data.data.length; i++) {
        const temp = {date: String(data.data[i].date),
                total_cases: String(data.data[i].total_cases),
                total_fatalities: String(data.data[i].total_fatalities),
                total_tests: String(data.data[i].total_tests),
                total_vaccinations: String(data.data[i].total_vaccinations)
               }
        rows.push(temp)
      }
      setCovidReport(rows.reverse())
    }

  useEffect(()=>{
      if (state) {
        getCovidReport()
        setState(false)
      }
  }, [state])

  useEffect(()=>{
    setProvince(province)
    getCovidReport()
    setState(false)
}, [province])

  fullReport.rows = covidReportRow

  return (
    <div className="Home">
      <header>
        <Navigation />
      </header>
      <div className="covid-data">
        <h3 className="cases-by-date">Cases by date:</h3>
        <Form.Group className="datatable">
              <Form.Label for="province">Select Province:</Form.Label>
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
        <Basic data={fullReport}/>
      </div>
    </div>
  );
}

export default App;
