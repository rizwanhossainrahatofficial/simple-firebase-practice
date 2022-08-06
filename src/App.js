import { getAuth, signInWithPopup,GoogleAuthProvider,signOut,createUserWithEmailAndPassword,sendEmailVerification,signInWithEmailAndPassword,updateProfile,sendPasswordResetEmail      } from "firebase/auth";
import { useState } from "react";
import './App.css';
import authenticationInitialize from './Firebase/firebase.init';

authenticationInitialize()
const googleProvider = new GoogleAuthProvider();

function App() {
  const [name,setName]=useState('')
  const [error,setError]=useState('')
const [user,setUser]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [islogin,setIsLogin]=useState(false)

  const auth = getAuth();



const handleRegistration=e=>{
  e.preventDefault();
  if(password.length<6){
    setError('password should be 6 character')
    return;
  }
  // if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
  //   setError('password must contain 2 upper case')
  //   return;
  // }
  if(islogin){
    processLogin(email,password)
  }
  else{
    registerNewUser(email,password)
  }
}


const processLogin=(email,password)=>{
  signInWithEmailAndPassword(auth,email,password)
  .then(result=>{
    const User=result.user
    setError('')
  })
  .catch(error=>{
    setError(error.message)
  })
}


const registerNewUser=(email,password)=>{
  createUserWithEmailAndPassword(auth,email,password)
  .then(result=>{
    const login=result.user
    console.log(login)
    setError('')
    emailverify()
    setuserName()
  })
  .catch(error=>{
    setError(error.message)
  })

}




const emailverify=()=>{
  sendEmailVerification(auth.currentUser)
  .then(result=>{console.log(result)})
  }

  const setuserName=()=>{
    updateProfile(auth.currentUser,{
      displayName:name
    })
    .then(result=>{console.log(result)})
  }

const handleName=e=>{
  setName(e.target.value)
}

const toggleLogin=e=>{
  setIsLogin(e.target.checked)
}

const handleEmail=e=>{
  setEmail(e.target.value)
}

const handlePassword=e=>{
  setPassword(e.target.value)
}

  const handleGoogleSignIn=()=>{
    signInWithPopup(auth,googleProvider)
    .then(result=>{
      console.log(result.user)
      const {displayName,email}=result.user
      const loggedUser={
        name:displayName,
        email:email
      }
      setUser(loggedUser)
    })
  }

  const handleResetPassword=()=>{
    sendPasswordResetEmail(auth,email)
    .then(result=>{})
  }

  const handleSignOut=()=>{
    signOut(auth)
    .then(result=>{})
    setUser({})
  }
  
  return (
    <div className="mx-5" >
<form onSubmit={handleRegistration}>
  <h3 className="text-primary">Please {islogin?'Login' :"Register"}</h3>


  {!islogin &&   <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input onBlur={handleName} type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your name"/>
    <div id="emailHelp" className="form-text"></div>
  </div>
  }

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input onBlur={handleEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input onBlur={handlePassword} type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
 <div className="mb-3 form-check">
    <input onChange={toggleLogin} type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Are you Registered?</label>
  </div>
  <div className="row mb-3 text-danger">{error}</div>

    <button  type="submit" className="btn btn-primary">
     {islogin ? "Sign in":"sign up"}
    </button>
    <button onClick={handleResetPassword}  style={{marginLeft:'10px'}} type="button" className="btn btn-danger btn-sm">Reset password</button>
    <br />
   
    
</form>
<br />
{!user.name ?   <div>
      <button onClick={handleGoogleSignIn} type="button" className="btn btn-primary">Google sign in</button>
      </div>:
      <div><button onClick={handleSignOut} type="button" className="btn btn-danger">sign out </button></div>
}

{/* after login */}
      {user.name &&<div>
        <h3>welcome {user.name}</h3>
        <p>email:{user.email}</p>
        </div>
      }
    </div>
  );
}

export default App;
