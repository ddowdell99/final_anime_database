import React from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate, Link } from 'react-router-dom';


export const SignUp = ({ setUser, addMessage }) => {
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const password2 = document.getElementById('password2').value
    const username = document.getElementById('username').value

    if (validate_email(email) === false || validate_password(password) === false || password_match(password, password2) === false) {
      return
    }
    if (validate_fields(username) === false) {
      return
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: username
        }).then(() => {
          addMessage('Successfully created new user!', 'success')
          // ...
        }).catch((error) => {
          addMessage('An error occurred: ' + error, 'danger')
          // ...
        });
        const database = getDatabase();

        set(ref(database, 'users/' + user.uid), {
          username: username,
          email: email,
          last_login: Date.now()
        })
          .then(() => {
          })
          .catch((error) => {
            addMessage('An error occured: ' + error, 'danger')
          })

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    navigate('/login')

  };

  const validate_email = (email) => {
    const regex = /^[^@]+@\w+(\.\w+)+\w$/; //regex to test email is valid
    if (regex.test(email) === true) {
      return true
    } else {
      addMessage('Invalid Email. Please check what you have typed and try again', 'danger')
      return false
    }
  }

  const validate_password = (password) => {
    if (password < 6) {
      addMessage('Password must be longer than 6 characters!', 'danger')
      return false
    } else {
      return true
    }
  }

  const password_match = (password, password2) => {
    if (password === password2) {
      return true
    } else {
      addMessage('Passwords do NOT match!', 'danger')
      return false
    }
  }

  const validate_fields = (field) => {
    if (field === null) {
      return false
    }

    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }

  return (
    <div>
      <form className='signup-container' onSubmit={(e) => { register(e) }}>
        <div class="login-container w-50">
          <div class="card-login card">
            <div className='sideSignUpPic'>
            </div>
            <div class="card-body">
              <h2 class="login-title"><strong>Anime</strong>Dojo</h2>
              <h5 className='welcome-text'>Join the world of <strong>Anime</strong>Dojo!</h5>
              <div className='email-container'>
                <div class="input-group flex-nowrap emailInput">
                  <input placeholder='Username' id='username' name='username' className='form-control' type='text' />
                </div>
              </div>
              <div className='email-container'>
                <div class="input-group flex-nowrap emailInput">
                  <input placeholder='Email' id='email' name='email' className='form-control' type='email' />
                </div>
              </div>
              <div className='password-container'>
                <div class="input-group flex-nowrap">
                  <input placeholder='Password' id='password' name='password' className='form-control' type='password' />
                </div>
              </div>
              <div className='password-container'>
                <div class="input-group flex-nowrap">
                  <input placeholder='Confirm Password' id='password2' name='password2' className='form-control' type='password' />
                </div>
              </div>
              <div class="signup-button">
                <button type='submit' className='btn btn-primary' >Create Account</button>
              </div>
              <div id="middle-bar">
                <div class="left-bar">
                  <hr />
                </div>
                <div class="middle-text">Already Have an Account?</div>
                <div class="left-bar">
                  <hr />
                </div>
              </div>
              <div class="create-account">
                <Link to="/login">
                  <button type="button" class="btn btn-primary w-100">Log In</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
