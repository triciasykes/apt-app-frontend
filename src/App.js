import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'
import Login from './components/Login'
import Signup from './components/Signup'
import ApartmentEdit from './pages/ApartmentEdit'
import ApartmentIndex from './pages/ApartmentIndex'
import ApartmentNew from './pages/ApartmentNew'
import ApartmentShow from './pages/ApartmentShow'
import Home from './pages/Home'
import MyApartments from './pages/MyApartments'
import NotFound from './pages/NotFound'

import './App.css'

const App = () => {
  const [currentUser, setCurrentUser] = useState(null)  // fake log in so pass in a user to simulate a user logged in.
  const [apartments, setApartments] = useState([])


  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      setCurrentUser(loggedInUser);
    }
    readApartments()
  }, [])

  const url = "https://apt-app-backend.onrender.com"
  // authentication methods
  const login = (userInfo) => {
    
    fetch(`${url}/login`,{
      method: "post",
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      localStorage.setItem("token", response.headers.get("Authorization"))
      return response.json();
    })
    .then(data => {
      setCurrentUser(data)
    })
    .catch(error => {
      console.log("error", error)
    })
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
      if (!response.ok) {
        throw Error(response.statusText)
      }
    localStorage.setItem("token", response.headers.get("Authorization"))
    return response.json()
  })
  .then(payload => {
    setCurrentUser(payload)
  })
  .catch(error => console.log("login errors: ", error))
  }

  const logout = () => {
    fetch(`${url}/logout`, {
      headers: {
        "Content-Type": 'application/json',
        "Authorization": localStorage.getItem("token")
      },
      method: 'DELETE'
    })
    .then(payload => {
      setCurrentUser(null)
      localStorage.removeItem("token")
  })
  .catch(error => console.log("log out errors: ", error))
  }
  
  
  // apartment fetches
  const readApartments = () => {
    fetch(`${url}/apartments`)
      .then(response => response.json())
      .then(payload => {
        setApartments(payload)
      })
      .catch((error) => console.log(error))
  }


  const createApartment = (apartment) => {
    fetch(`${url}/apartments`, {
      body: JSON.stringify(apartment),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    .then((response) => response.json())
    .then(() => readApartments())
    .catch((errors) => console.log("Apartment create errors:", errors))
  }

  const updateApartment = (apartment, id) => {
    fetch(`${url}/apartments/${id}`, {
      body: JSON.stringify(apartment),
      headers: {
        "Content-Type": "application/json"
      },
      method: "PATCH"
    })
    .then((response) => response.json)
    .then(() => readApartments())
    .catch((errors) => console.log("Apartment update errors", errors))
  }

  const deleteApartment = (id) => {
    fetch(`${url}/apartments/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
    .then((response) => response.json())
    .then(() => readApartments())
    .catch((errors) => console.log("delete errors:", errors))
  }
   
  return(
    <>
      <Header current_user={currentUser} logout={logout} />
      <div className="wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/signup" element={<Signup signup={signup}/>} />
        <Route path="/apartmentindex" element={<ApartmentIndex apartments={apartments}/>} />
        <Route path="/apartmentshow/:id" element={<ApartmentShow apartments={apartments} deleteApartment={deleteApartment}/>} />
        <Route path="/myapartments" element={<MyApartments apartments={apartments} current_user={currentUser}/>}/>
        <Route path="/apartmentnew" element={<ApartmentNew  createApartment={createApartment}/>} />
        <Route path="/apartmentedit/:id" element={<ApartmentEdit updateApartment={updateApartment} />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App;

