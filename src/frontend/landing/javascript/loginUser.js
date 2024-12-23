import storeUserInfo from './storeUserInfo';
import axios from 'axios'

export default async function loginUser(redirect) {
  
  const loginEmail=document.getElementById("loginEmail").value
  const loginPassword=document.getElementById("loginPassword").value

  axios.post('http://localhost:5174/login', {
    headers: {
      headers: {'X-Requested-With': 'XMLHttpRequest'},    
    },
    loginEmail:loginEmail,
    loginPassword:loginPassword,
  })
  .then(function (response) {
    if(response.data){
      storeUserInfo(response.data.username,response.data.email,response.data.token)
    }
    return response
  }).then(function(response){
    if(response.data.error){
      console.log(response.data)
    } else {
      redirect()
    }
    
  })
  .catch(function (error) {
    console.error('Error:', error);
  });
}