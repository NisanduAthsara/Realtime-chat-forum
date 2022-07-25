import React,{useContext} from 'react'
import AuthContext from '../Auth.Context'

export default function Register(){
    const {register,errors,success} = useContext(AuthContext)
    const [values,setvalues] = React.useState({username:'',password:''})
    const handleChange = (e)=>{
        setvalues({...values,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        register(values.username,values.password)
    }
    return(
        <div className='wrapper'>
            <h1 className='m-5'>Register</h1>
            {errors.length > 0 && <div className='alert alert-danger m-5'>{errors}</div>}
            {success.length > 0 && window.location.assign('/chats')}
            <form onSubmit={(e)=>handleSubmit(e)} className='m-5'>
                <div className='inner-submition-form'>
                    <label for="username">Username:</label>
                    <input type="text" id="username" className='form-control' name="username" placeholder="Username" value={values.username} onChange={(e)=>handleChange(e)}/><br/>
                    <label for="pwd">Password:</label>
                    <input type="password" id="pwd" className='form-control' name="password" placeholder="Password" value={values.password} onChange={(e)=>handleChange(e)}/><br/>
                    <button type='submit' className='btn btn-info'>Register</button>
                    <div className='mt-5'>
                        <p>Already have an Account?</p>
                        <a href="/" className='btn btn-info'>Login</a>
                    </div>
                </div>
            </form>
        </div>
    )
}