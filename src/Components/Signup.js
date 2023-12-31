import React,{useState} from 'react'
import { auth, fs } from '../Config/Config'
import { Link } from 'react-router-dom'
import {useHistory} from 'react-router-dom'

export const Signup = () => {

  const history = useHistory();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg]= useState('');

  const handlesSignup=(e)=>{
    e.preventDefault();
    //console.log(fullName,email,password); 
    //aqui para abajo es como creamo un usuario nuevo 
    auth.createUserWithEmailAndPassword(email,password).then((Credentials)=>{
      console.log(Credentials);
      fs.collection('users').doc(Credentials.user.uid).set({
        FullName: fullName,
        Email: email,
        Password: password
      }).then(()=>{
        setSuccessMsg('Successfull signup, you will get rediriected to the login page ');
        setFullName('');
        setEmail('');
        setPassword('');
        setErrorMsg('');
        setTimeout(()=>{
          setSuccessMsg('');
          history.push('/login')
        },3000)
      }).catch((error)=>setErrorMsg(error.message));
    }).catch((error)=>{
      setErrorMsg(error.message)


    }) //este metodo es asincronico entonces crear un usuario nuevo dura un poco
    //este catch es para agarrar usuarios que por ejemplo ya tengan ese email 
  }

  return (
    <div className='container'>
    <br></br>
    <br></br>
    <h1>Sign Up </h1>
    <hr></hr>
    {successMsg&&<>
      <div className='success-msg{'>{successMsg}</div>
      <br></br>
    </>}
    <form className='form-group' autoComplete='off' onSubmit={handlesSignup}>
      <label>Full Name</label>
      <input type='text' className='form-control' required 
        onChange={(e)=>setFullName(e.target.value)} value ={fullName}></input>
      <br></br>
      <label>Email</label>
      <input type='text' className='form-control' required
        onChange={(e)=>setEmail(e.target.value)} value ={email}></input>
      <label>Password</label>
      <input type='password' className='form-control' required
        onChange={(e)=>setPassword(e.target.value)} value ={password}></input>
      <br></br>
      <div className='btn-box'>
        <span>
          Do you already have an account? Log in
        <Link to='login' className='link'> here</Link></span>
        <button type="submit" className='btn btn-success btn-md'>SIGN UP</button>
      </div>
    </form>
    {errorMsg&&<>
    <br></br>
      <div className='error-msg{'>{errorMsg}</div>
      <br></br>
    </>}
  </div>
  )
}