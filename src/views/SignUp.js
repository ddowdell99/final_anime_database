import React from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from 'react-router-dom';


export const SignUp = ({ setUser }) => {
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
          alert('Profile updated!')
          // ...
        }).catch((error) => {
          alert('An error occurred: ' + error)
          // ...
        });
        const database = getDatabase();

        set(ref(database, 'users/' + user.uid), {
          username: username,
          email: email,
          last_login: Date.now()
        })
          .then(() => {
            alert('data stored successfully')
          })
          .catch((error) => {
            alert('unsuccessful, error' + error)
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

  const password_match = (password, password2) => {
    if (password === password2) {
      return true
    } else {
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
      <form onSubmit={(e) => { register(e) }}>
        <div class="signup-container">
          <div class="card-signup card">
            <div class="card-body">
              <h5 class="signup-title">Create your Padawans Instagram Account!</h5>
              <h3>Discover what your friends are posting</h3>
              <p class="username-text my-2"><b>Username</b></p>
              <div class="input-group flex-nowrap">
                <input placeholder='Username' id='username' name='username' className='form-control' type='text' />
              </div>
              <p class="email-text my-2"><b>Email Address</b></p>
              <div class="input-group flex-nowrap">
                <input placeholder='Email' id='email' name='email' className='form-control' type='email' />
              </div>
              <div class="password-text">
                <p class="password my-2"><b>Password</b></p>
              </div>
              <div class="input-group flex-nowrap">
                <input placeholder='Password' id='password' name='password' className='form-control' type='password' />
              </div>
              <div class="confirm-password-text">
                <p class="password my-2"><b>Confirm Password</b></p>
              </div>
              <input placeholder='Confirm Password' id='password2' name='password2' className='form-control' type='password' />
            </div>
            <div class="sign-up-button">
              <button type='submit' className='btn btn-primary w-50'>Create Account</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
