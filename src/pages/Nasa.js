import { useState } from "react"

const Nasa = () => {

  const [nasaData, setNasaData] = useState("")

  const apiKey = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=pjTcinZkpEa63aqAk0i3hGnfuuGDrf1ZOHHsFeir"

  const nasaFetch = () => {
    fetch(apiKey)
    .then(response => response.json())
    .then(payload => setNasaData(payload))
    .catch(errors => console.log(errors))
  }

  return (
    <>
      <h1>Mars Rovers Pictures</h1>
      <button onClick={nasaFetch}>Click me!</button>

      {nasaData && nasaData.photos.map((obj, index) => {
        return <img src={obj.img_src} alt="" key={index} />
      })}
    </>
  )
 }

 export default Nasa