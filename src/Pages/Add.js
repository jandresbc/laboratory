import '../App.css';
import Menu from '../Components/Navbar'
import React, {useState, useEffect } from "react"
import { settings } from '../Config/Config'

export default function Add() {
  useEffect(() => {
    authentication()
  }, [])
  const [ state, setState ] = useState({
    name:"",
    identification:"",
    token: "",
    message:"",
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

    savePatient()
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

  const savePatient = async () => {
    const name = state.name
    const id = state.identification
    const token = state.token
    const url = settings.url + "/createPacient/"+name+"/"+id

    await fetch(url,{
      method:"POST",
      mode: "cors",
      headers: {"Content-Type": "application/json; charset=UTF-8","Authorization":token},
    }).then(response => response.json() ).then((data) => {
      document.getElementById("name").value = ""
      document.getElementById("identification").value = ""
      document.getElementById("message").classList.remove("invisible")
      
      setState({
        ...state,
        message: data.status ? "Patient Saved" : "The Patient is not saved"
      })

      setTimeout(resetState,3000)
    }).catch( (error) => {
      console.error(error)
    })
  }

  const resetState = () => {
    setState({
      name : "",
      identification : "",
      token:state.token
    })

    document.getElementById("message").classList.add("invisible")
  }
  
  return (
    <div className="App">
      <body>
        <h1>Add Patient</h1>
        <div className="container-fluid">
          <form name="add">
            <div className="row">
              <div className="col m-2">
                <input className="form-control w-50" type="text" name="name" id="name" placeholder="Your name" onChange={change}/>
              </div>
              <div className="col m-2">
                <input className="form-control w-50" type="number" name="identification" id="identification" placeholder="Your ID" onChange={change}/>
              </div>
              <div className="col-12 m-2">
                <div id="message" className="alert alert-warning invisible">{state.message}</div>
                <input className="form-control btn btn-success w-25" type="button" value="Add" onClick={onSubmit}/>
              </div>
            </div>
          </form>
        </div>
      </body>
    </div>
  );
}
