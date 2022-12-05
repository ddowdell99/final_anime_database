import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, update } from "firebase/database";
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


export const Login = ({ setUser }) => {

    const navigate = useNavigate()

    const validate_email = (email) => {
        const regex = /^[^@]+@\w+(\.\w+)+\w$/; //regex to test email is valid
        if (regex.test(email) === true) {
            return true
        } else {
            return false
        }
    }

    const validate_password = (password) => {
        if (password < 6) {
            return false
        } else {
            return true
        }
    }

    const login = (e) => {

        e.preventDefault()

        const email = document.getElementById('loginEmail').value
        const password = document.getElementById('loginPass').value

        if (validate_email(email) === false || validate_password(password) === false) {
            return
        }
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
                localStorage.setItem('user', JSON.stringify(user))
                alert('signed In')
                const database = getDatabase();

                update(ref(database, 'users/' + user.uid), {
                    last_login: Date.now()
                })
                    .then(() => {
                        alert('data stored successfully')
                    })
                    .catch((error) => {
                        alert('unsuccessful, error' + error)
                    })

            })
            .catch((error) => {
                alert(error)
                const errorCode = error.code;
                const errorMessage = error.message;

            })

            navigate('/')

    }

    return (
        <div>
            <form onSubmit={(e) => { login(e) }}>
                <div class="login-container">
                    <div class="card-signup card">
                        <div class="card-body">
                            <h5 class="signup-title">Login to your Account!</h5>
                            <p class="username-text my-2"><b>Email</b></p>
                            <div class="input-group flex-nowrap">
                                <input placeholder='Email' id='loginEmail' name='email' className='form-control' type='email' />
                            </div>
                            <div class="password-text">
                                <p class="password my-2"><b>Password</b></p>
                            </div>
                            <div class="input-group flex-nowrap">
                                <input placeholder='Password' id="loginPass" name='password' className='form-control' type='password' />
                            </div>
                            <div class="sign-up-button">
                                <button type='submit' className='btn btn-primary' >Log In</button>
                            </div>
                            <div id="middle-bar">
                                <div class="left-bar">
                                    <hr />
                                </div>
                                <div class="middle-text">New To Padawans Instagram?</div>
                                <div class="left-bar">
                                    <hr />
                                </div>
                            </div>
                            <div class="create-account">
                                <Link to="/signup">
                                    <button type="button" class="btn btn-primary w-100">Create an Account</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>



            </form>
        </div>
    )
}
