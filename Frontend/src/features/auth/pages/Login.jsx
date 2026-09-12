import React, {useState} from 'react'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth.js'
import { useNavigate, Link } from 'react-router'

const Login = () => {

    const { loading, handleLogin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin({ email, password })
        navigate('/');
    }
    if (loading) {
    return(<main>Loading...</main>)
}

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                        <input
                            onChange={(e)=> {setEmail(e.target.value)}}
                            type="email" name="email" id="email" placeholder='input email' />
                </div>
                <div className="input-group">
                    <label htmlFor="password">password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" name="password" id="password" placeholder='input pw' />
                </div>
                <button className='button primary-button'>Login</button>
                </form>
                
                <p>Don't have an account? <Link to={"/Register"}>Register</Link></p>
            </div>
        </main>
  )
}

export default Login
