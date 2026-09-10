import React from 'react'
import { useNavigate, Link} from 'react-router';

const Register = () => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" placeholder='input username' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder='input email' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">password</label>
                        <input type="password" name="password" id="password" placeholder='input pw' />
                    </div>
                    <button className='button primary-button'>Register</button>
                </form>
                <p>Already have an account? <Link to={"/Login"}>Login</Link></p>
            </div>
        </main>

    )
}

export default Register
