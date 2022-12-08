import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, update } from "firebase/database";
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Alert}  from 'react-bootstrap/Alert';


export const Login = ({ setUser, getFavorites, getWatchLater, addMessage }) => {

    const navigate = useNavigate()

    const validate_email = (email) => {
        const regex = /^[^@]+@\w+(\.\w+)+\w$/; //regex to test email is valid
        if (regex.test(email) === true) {
            return true
        } else {
            return false
        }
    };

    const validate_password = (password) => {
        if (password < 6) {
            return false
        } else {
            return true
        }
    };

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
                getFavorites(user)
                getWatchLater(user)
                addMessage('Successfully Logged In!', 'success')
                const database = getDatabase();

                update(ref(database, 'users/' + user.uid), {
                    last_login: Date.now()
                })
                    .then(() => {
                    })
                    .catch((error) => {
                        addMessage('Unsuccessful, error' + error, 'danger')
                    })

            })
            .catch((error) => {
                addMessage(error, 'danger')
                const errorCode = error.code;
                const errorMessage = error.message;

            })

        navigate('/')

    };

    return (
        <div>
            <form className='login-form' onSubmit={(e) => { login(e) }}>
                <div class="login-container w-50">
                    <div class="card-login card">
                        <div className='sideLoginPic'>
                        </div>
                        <div class="card-body">
                            <h2 class="login-title"><strong>Anime</strong>Dojo</h2>
                            <h5 className='welcome-text'>Welcome back! Log in to your account to explore the world of anime:</h5>
                            <div className='email-container'>
                                <p class="username-text my-2"><i class="fa-regular fa-envelope"></i></p>
                                <div class="input-group flex-nowrap emailInput">
                                    <input placeholder='Email' id='loginEmail' name='email' className='form-control' type='email' />
                                </div>
                            </div>
                            <div className='password-container'>
                                <div class="password-text">
                                    <p class="password my-2"><i class="fa-solid fa-lock"></i></p>
                                </div>
                                <div class="input-group flex-nowrap">
                                    <input placeholder='Password' id="loginPass" name='password' className='form-control' type='password' />
                                </div>
                            </div>
                            <div class="login-button">
                                <button type='submit' className='btn btn-primary' >Log In</button>
                            </div>
                            <div id="middle-bar">
                                <div class="left-bar">
                                    <hr />
                                </div>
                                <div class="middle-text">New To&nbsp;<strong>Anime</strong>Dojo?</div>
                                <div class="left-bar">
                                    <hr />
                                </div>
                            </div>
                            <div class="create-account2">
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
