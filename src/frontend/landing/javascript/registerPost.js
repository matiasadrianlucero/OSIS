import axios from 'axios'

export default function registerUser() {
  const registerUsername=document.getElementById("registerUsername").value 
  const registerEmail=document.getElementById("registerEmail").value
  const registerPassword=document.getElementById("registerPassword").value

  axios.post('http://localhost:5174/register', {
    headers: {
      headers: {'X-Requested-With': 'XMLHttpRequest'},    
    },
    registerUsername:registerUsername,
    registerEmail:registerEmail,
    registerPassword:registerPassword

  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error('Error:', error);
  });
}
