

const CatFacts = ({facts, requestCatFacts, setCount}) => {

  return(
    <>
    <h1>Cat Facts</h1>
    <label>Enter a Number:</label>
    <input
      type="number"
      min="1"
      max="50"
      onChange={(e) => setCount(e.target.value)}
    />
    <div>
      <button onClick={requestCatFacts}></button>
    </div>
    <ul>
      {facts?.find((fact, index) => {
                  return <li key={index}>{fact}</li>

      })}
    </ul>
    </>
  )

}
export default CatFacts