import '../App.css';
import React, {useState, useEffect } from "react"
import { settings } from '../Config/Config'

export default function Evaluate() {
  useEffect(() => {
    authentication()
  }, [])

  const [ state, setState ] = useState({
    identification:0,
    result:"",
    sugar:0,
    bodyfat:0,
    oxigen:0,
    token: "",
    message:"",
    patient: {},
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
    process()
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

  const process = () => {
    patientData(state.identification)
  }

  const patientData = async (id) => {
    const token = state.token
    const url = settings.url + "/getResults/" + id

    await fetch(url,{
      method:"GET",
      mode: "cors",
      headers: {"Content-Type": "application/json; charset=UTF-8","Authorization":token},
    }).then(response => response.json() ).then((data) => {
      setState({
        ...state,
        patient: data.Pacients
      })
      
      getResult(data.Pacients.id)
    }).catch( (error) => {
      console.error(error)
    })
  }

  const getResult = async (id) => {
    const token = state.token
    const url = settings.url + "/bloodtest"
    
    const data = {
      pacient_id:id,
      sugar:state.sugar,
      oxigen:state.oxigen,
      bodyfat:state.bodyfat
    }
    
    await fetch(url,{
      method:"POST",
      mode: "cors",
      headers: {"Content-Type": "application/json; charset=UTF-8","Authorization":token},
      body : JSON.stringify(data)
    }).then(response => response.json() ).then((data) => {
      document.getElementById("identification").value = ""
      document.getElementById("bodyfat").value = ""
      document.getElementById("oxigen").value = ""
      document.getElementById("sugar").value = ""
      document.getElementById("message").classList.remove("invisible")
      
      setState({
        ...state,
        message: data.status ? "Your result is: " + data.result : "No results"
      })

      setTimeout(resetState,10000)
    }).catch( (error) => {
      console.error(error)
    })
  }

  const resetState = () => {
    setState({
      identification:0,
      result:"",
      sugar:0,
      bodyfat:0,
      oxigen:0,
      patient: {},
      token:state.token
    })

    document.getElementById("message").classList.add("invisible")
  }
  
  return (
    <div className="App">
      <body>
        <h1>Evaluate Blood</h1>
        <div className="container-fluid">
          <form name="add">
            <div className="row">
              <div className="col m-2">
                <input className="form-control w-50" type="number" name="identification" id="identification" placeholder="Identification" onChange={change} required/>
              </div>
              <div className="col m-2">
                <input className="form-control w-50" type="number" name="sugar" id="sugar" placeholder="Sugar" onChange={change} min = "0" max = "100"/>
              </div>
              <div className="col m-2">
                <input className="form-control w-50" type="number" name="bodyfat" id="bodyfat" placeholder="Body Fat" onChange={change} min = "0" max = "100"/>
              </div>
              <div className="col m-2">
                <input className="form-control w-50" type="number" name="oxigen" id="oxigen" placeholder="Oxigen" onChange={change} min = "0" max = "100"/>
              </div>
              <div className="col-12 m-2">
                <div id="message" className="alert alert-warning invisible">{state.message}</div>
                <input className="form-control btn btn-success w-25" type="button" value="Evaluate" onClick={onSubmit}/>
              </div>
            </div>
          </form>
        </div>
      </body>
    </div>
  );
}
