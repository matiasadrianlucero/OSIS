import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from 'react'
function updateEmail(){
    
    const updateEmail=document.getElementById("updateEmail").value
    const email=localStorage.getItem("email")

    axios.post('http://localhost:5174/update/Email', {updateEmail:updateEmail,email:email}, 
    {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization':localStorage.getItem("token")
        }
    })
    .then(function (response) {
      if(response.data){
        console.log("email updated")
      }
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
}
function updateUsername(){
    
    const updateUsername=document.getElementById("updateUsername").value
    const username=localStorage.getItem("username")

    axios.post('http://localhost:5174/update/Username', {updateUsername:updateUsername,username:username}, 
    {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization':localStorage.getItem("token")
        }
    })
    .then(function (response) {
      if(response.data){
        console.log("email updated")
      }
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
}
function updatePassword(){
    
    const updatePasswordUpdate=document.getElementById("updatePasswordUpdate").value
    const updatePasswordCurrent=document.getElementById("updatePasswordCurrent").value

    axios.post('http://localhost:5174/update/Password', {updatePasswordUpdate:updatePasswordUpdate,updatePasswordCurrent:updatePasswordCurrent}, 
    {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization':localStorage.getItem("token")
        }
    })
    .then(function (response) {
      if(response.data){
        console.log("email updated")
      }
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
}
function logout(){
    localStorage.removeItem("email")
    localStorage.removeItem("username")
    localStorage.removeItem("token")
}
async function retrieveImg(avatarName){
  return new Promise((resolve, reject) => {
    let url = 'http://localhost:5174/avatar/' + avatarName
    axios.get(url, {
      responseType: 'blob',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': localStorage.getItem("token")
      }
    })
      .then(function (response) {
        if (response.status === 200 && response.data instanceof Blob) {
          const imgUrl = URL.createObjectURL(response.data);
          resolve(imgUrl);
        } else {
          reject(new Error('Failed to fetch image'));
        }
      })
      .catch(error => {
        reject(error);
      });
  }
)

}
function updateAvatar(){
  const updateAvatarFile=document.getElementById("updateAvatarFile").files[0]
  let formData=new FormData()
  formData.append('updateAvatarFile',updateAvatarFile)
  formData.append('folder',"avatars/")

  axios.post('http://localhost:5174/update/Avatar', formData, 
  {
      headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization':localStorage.getItem("token"),

      }
  },
)
  .then(function (response) {
    if(response.data){
      console.log("email updated")
    }
  })
  .catch(function (error) {
    console.error('Error:', error);
  });
}
async function createPost(){
  let formData=new FormData()
  const postImg=document.getElementById("postImg").files[0]
  const postText=document.getElementById("postText").value
  // formData.append("postImg",postImg)
  formData.append("folder","posts/")
  formData.append("postText",postText)
  console.log(postImg,postText)
  // formData.append("postText",postText)
  axios.post('http://localhost:5174/create/Post', formData, 
  {
      headers: {

          'X-Requested-With': 'XMLHttpRequest',
          'Authorization':localStorage.getItem("token")
      }
  })
  .then(function (response) {
    if(response.data){
      console.log("email updated")
    }
  })
  .catch(function (error) {
    console.error('Error:', error);
  });
}
function Feed(){
  let [img,setImg]=useState('')
    const navigate = useNavigate();
    // useEffect(()=>{
    //   let imageUrl = null;

    //   const fetchData = async () => {
    //     imageUrl = await retrieveImg("updateAvatarFile-1734835007075-764275559.jpg");
    //     setImg(imageUrl);
    //   };
    
    //   fetchData().catch(console.error);
    
    //   return () => {
    //     if (imageUrl) {
    //       URL.revokeObjectURL(imageUrl);
    //     }
    //   };
    // },[])
    return (
        <>
        <form>
            <input id="postText"></input>  
            <input type='file' id="postImg" name='postImg'></input>
            <button type="submit" onClick={(e)=>{e.preventDefault(),createPost()}}>Post</button>
        </form> 
        {/* <form>
          <input type="file" id="updateAvatarFile" name='updateAvatarFile'/>
          <button type="submit"onClick={(e)=>{e.preventDefault(),updateAvatar()}}>avatar</button>
        </form>  */}
        {/* <form>
            <input id="updateEmail"></input>
            <button type="submit" onClick={(e)=>{e.preventDefault(),updateEmail()}}>submit</button>
            
        </form> */}
        {/* <form>
            <input id="updateUsername"></input>
            <button type="submit" onClick={(e)=>{e.preventDefault(),updateUsername()}}>submit</button>    
        </form>
        <form>
            <input id="updatePasswordUpdate" placeholder='updatepass'></input>
            <input id="updatePasswordCurrent"  placeholder='current pass'></input>

            <button type="submit" onClick={(e)=>{e.preventDefault(),updatePassword()}}>submit</button>    
        </form> */}

        {/* <form>
            <input id="updateUsername"></input>
            <button type="submit" onClick={()=>{updateUsername()}}></button>
        </form>
        <form>
        <input id="currentPassword"></input>

            <input id="updatePassword"></input>
            <button type="submit" onClick={()=>{updatePassword()}}></button>
        </form> */}

        <button type="submit" onClick={(e)=>{e.preventDefault(),logout(),navigate("/")}}>llogut</button>

          {/* <img onClick={()=>{console.log(img)}} src={img} alt="Profile Picture" /> */}
          </>
    )
}
export default Feed
