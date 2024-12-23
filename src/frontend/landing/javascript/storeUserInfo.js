export default function storeUserInfo(username,email,loginToken){
    localStorage.setItem("username",username)
    localStorage.setItem("email",email)
    localStorage.setItem("token",loginToken)
}