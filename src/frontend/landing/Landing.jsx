import { useState } from 'react';
import loginUser from './javascript/loginUser';
import registerUser from './javascript/registerPost';
import { useNavigate } from "react-router-dom";

function App() {
  let [displayLogin,setDisplayLogin]=useState(true)
  const navigate = useNavigate();
  function redirect(){
    navigate(localStorage.getItem("username") +'/feed');
  }
  return (
    <>
    {displayLogin ? 
        <form>
          <input name="loginEmail" id="loginEmail"  defaultValue={"qwe@gmail.com"}  />
          <input name="loginPassword" id="loginPassword" defaultValue={"looc"} />     
          <button onClick={(e)=>{event.preventDefault(),loginUser(redirect)}}>SUBMIT</button>

        </form>
    :
      <form>
        <label><input id="registerUsername" defaultValue={"cool"} placeholder="Username"/></label>
        <label><input id="registerEmail" defaultValue={"cool@gmail.com"} placeholder="Email"/></label>
        <label><input id="registerPassword" defaultValue={"cool"} placeholder="Password"/></label>

        <button onClick={(e)=>{e.preventDefault(),registerUser()}}>SUBMIT</button>
      </form>
    }
      <button onClick={()=>{setDisplayLogin(!displayLogin)}}>Change</button>


        
    </>
  )
}

export default App
