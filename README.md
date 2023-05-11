# Using JWT and Devise for Authenication Frontend Process

At this point we should be fetching the apartments from the database and no longer using mock data.  
Now we need to look at providing authentication/authorization for a user to sign up, log in, or log out.

## Steps

### 1. Set our initial state variable values
We will set currentUser to `null` in its useState method and apartments to and empty array in it's useState method.
`App.js`
```javascript
const App = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [apartments, setApartments] = useState([])
  
  return(
    ...
  )
}
```
### 2. Update our Sign Up & Login components to collect the form input data
#### Part A - useRef
We will be using the React hook `useRef` from react.  The useRef hook is a way to refer to elements in the user interface and access them in our code.  Let's say you have a text input in your web page, and you want to do something with the value entered by the user. With useRef, you can create a reference to that input element and use it later to get the value.

Think about HTML and using `document.getElementById('nameInput')`. You are able to access that element's value.  This is basically what useRef does. 

Using useRef:
1. import it from 'react'
2. create a variable using `useRef` and give it a meaningful name. (similar to `useNavigation`)
3. attach the variable to the specific element you want to target by using the property `ref`.
4. with this reference, you can access its properties/values by using `variableName.current`
`src/components/signup`
```javascript
import { useRef } from "react"

const Signup = () => {
  //we want to get the input values from the signup form so we'll name the variable 'formRef'
  const formRef = useRef()
  
  const handleSubmit = () => {
    console.log('sign up')
  }

  return(
    <div>
     <form ref={formRef} onSubmit={handleSubmit}>
        Email: <input type="email" name='email' placeholder="email" />
        <br/>
        Password: <input type="password" name='password' placeholder="password" />
        <br/>
        <input type='submit' value="Submit" />
    </form>
    <br />
    <div>Already registered, <a href="/login">Login</a> here.</div>
    </div>
  )
}
export default Signup
```
#### Part B  - FormData
Now we need to collect the input and pass the user info.  For this we will use the javascript built-in object `FormData`. It allows you to construct and manipulate HTML form data before sending it to the server.  It provides a way to create key-value pair representation of form fields and their values (like what you send in an HTTP POST request).  We can pass in our `formRef.current` in creating a new FormData, then use Object.fromEntries to get the values.  We will do all in the handleSubmit function:
```javascript
 const handleSubmit = (e) => {
  //stop the default behavior of the form 
    e.preventDefault()
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData)
    const userInfo = {
        "user":{ email: data.email, password: data.password }
    }
}
```
Follow the same steps for the Login component

### Write the Functions for login and signup


...to be continued
