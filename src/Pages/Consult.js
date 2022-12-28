import '../App.css';
import React, {useState, useEffect } from "react"
import { settings } from '../Config/Config'

export default function Consult() {
  useEffect(() => {
    authentication()
  }, [])

  const [ state, setState ] = useState({
    identification:0,
    token: "",
    datos: [],
    patient: {}
  })

  const change = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setState({
      ...state,
      [name] : value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    patientData(state.identification)
  }

  const authentication = async () => {
    const url = settings.url + "/auth"

    const data = { email: settings.user, pass: settings.password }
    
    await fetch(url,{
      method:"POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json; charset=UTF-8","Access-Control-Allow-Origin":"*"},
      origin: "*"
    }).then(response => response.json() ).then((data) => {
      setState({
        ...state,
        token:"Bearer " + data.token
      })
    }).catch( (error) => {
      console.error(error)
    })
  }

  const patientData = async (id) => {
    const token = state.token
    const url = settings.url + "/getResults/" + id

    await fetch(url,{
      method:"GET",
      mode: "cors",
      headers: {"Content-Type": "application/json; charset=UTF-8","Authorization":token},
    }).then(response => response.json() ).then((data) => {
      document.getElementById("identification").value = ""
      console.log(data)
      setState({
        ...state,
        datos: data.BloodTest,
        patient: data.Pacients
      })
    }).catch( (error) => {
      console.error(error)
    })
  }
  
  return (
    <div className="App">
      <body>
        <h1>Consult Results</h1>
        <div className="container-fluid">
          <form name="add">
            <div className="row">
              <div className="col m-2">
                <input className="form-control w-50" type="number" name="identification" id="identification" placeholder="Identification" onChange={change} required/>
              </div>
              <div className="col-12 m-2">
                <div id="message" className="alert alert-warning invisible">{state.message}</div>
                <input className="form-control btn btn-success w-25" type="button" value="Consult" onClick={onSubmit}/>
              </div>
            </div>
            {
                <div className="col-12 m-2">
                  <h2>Data:</h2>
                  
                  <div className="col"><label className="fw-bold">Name</label>: { state.patient.name }</div>
                  <div className="row">
                  {
                    state.datos.map( (value, index) =>
                      <div className="col-6 border" key={index}>
                        <label className="fw-bold m-2">Sugar</label>: { value.sugar }
                        <label className="fw-bold m-2">Body Fat</label>: { value.bodyfat }
                        <label className="fw-bold m-2">Oxigen</label>: { value.oxigen }
                        <label className="fw-bold m-2">Result</label>: { value.result }
                      </div>
                    )
                  }
                  </div>
                </div>
              }
          </form>
        </div>
      </body>
    </div>
  );
}
