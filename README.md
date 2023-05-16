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
When writing our fetch calls for authenticating/authorizing users, we need to store the token created by JWT.  `localStorage` and its methods will allow us to store, retrieve, and remove the token locally on the user's devise.  

What is localStorage:

`localStorage` allows us to store key-value pairs in the form of strings. The data stored remains available even after the user closes the browser or navigates away from the website.

Basic methods:

`localStorage.setItem(key, value)`: Used to store a value in localStorage. The key is a unique identifier for the data, and the value is the actual data you want to store. Both the key and value must be strings.

`localStorage.getItem(key)`: Retrieves the value associated with a given key from localStorage. It returns null if the key does not exist.

`localStorage.removeItem(key)`: Removes the item associated with the specified key from localStorage.

`localStorage.clear()`: Removes all items stored in localStorage, effectively clearing the entire storage.


Note: Data must be stored as strings. If you need to store objects or arrays, you need to convert them to strings using JSON.stringify() before storing, and then parse them back to their original format using JSON.parse() when retrieving from localStorage.


 ```javascript
  // authentication methods
  const login = (userInfo) => {
    fetch(`${url}/login`, {
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      method: 'POST'
    })
    .then(response => {
    // store the token
    localStorage.setItem("token", response.headers.get("Authorization"))
    return response.json()
  })
  .then(payload => {
    setCurrentUser(payload)
  })
  .catch(error => console.log("login errors: ", error))
  }

  const signup = (userInfo) => {
    fetch(`${url}/signup`, {
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      method: 'POST'
    })
    .then(response => {
      // store the token
    localStorage.setItem("token", response.headers.get("Authorization"))
    return response.json()
  })
  .then(payload => {
    setCurrentUser(payload)
  })
  .catch(error => console.log("login errors: ", error))
  }
  ```

  ```javascript
  const logout = () => {
    fetch(`${url}/logout`, {
      headers: {
        "Content-Type": 'application/json',
        "Authorization": localStorage.getItem("token") //retrieve the token 
      },
      method: 'DELETE'
    })
    .then(payload => {
    localStorage.removeItem("token")  // remove the token
    setCurrentUser(null)
  })
  .catch(error => console.log("log out errors: ", error))
  }
  ```
  
### Pass the methods and call in appropriate components

```javascript
      <Header current_user={currentUser} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/signup" element={<Signup signup={signup}/>} />
```
#### Signup and Signin
```javascript
const handleSubmit = (e) => {
  ...
  signup(userInfo)
  navigate("/")
  e.target.reset()  // resets the input field
}
```

### Navigation.js
```javascript
const handleClick = () => {
    logout()
    navigate("/")
  }
```
