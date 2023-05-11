import Navigation from "./Navigation"


const Header = ({ current_user, logout }) => {
  return(
    <>
      <Navigation current_user={current_user} logout={logout}/>
    </>
  )
}

export default Header