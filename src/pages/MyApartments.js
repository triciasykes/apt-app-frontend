import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap"
import { NavLink } from "react-router-dom"

const MyApartments = ({ apartments, current_user}) => {
  // use the filter method to create a new array of apartments belonging to the user by using user_id.
    const myApartments = apartments?.filter(apartment => current_user?.id === apartment.user_id)
  return(
    <>
      <div className="apartments-body">
        <h1 className="index-title">Recent Listings</h1>
        <div className="flex-apartments">
          {/* then map over filtered array to show only user's apartments */}
          {myApartments.map((apartment, index) => {
            return (
              <Card
                style={{
                  width: "14rem",
                }}
                key={index}
              >
                <img alt={`apartment exterior view`} src={apartment.image} />
                <CardBody>
                  <CardTitle tag="h5">${apartment.price}/month</CardTitle>
                  <CardSubtitle>
                     {apartment.city}, {apartment.state}
                  </CardSubtitle>
                  <NavLink
                    to={`/apartmentshow/${apartment.id}`}
                    className="nav-link"
                  >
                    <Button className="apartment-button">More Details</Button>
                  </NavLink>
                </CardBody>
              </Card>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default MyApartments