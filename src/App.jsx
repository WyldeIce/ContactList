import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [people, setPeople] = useState([])
  const [hash, setHash] = useState(window.location.hash.slice(1)*1)


  useEffect(() => {
    const fetchPerson = async () => {
      const response = await fetch('https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users')
      const data = await response.json()
      setPeople(data)
    }
    fetchPerson()
  }, [])

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setHash(window.location.hash.slice(1)*1)
    })
  },[])

  const person = people.find((person) => {
    return hash === person.id
  })

  return (
    <div>
      <h1>Contact List ({people.length})</h1>
      <ul>
        {people.map((person) => {
          return (
            <li className={hash === person.id ? "selected" : ""} key={person.id}>
              <a href={`#${person.id === hash ? "" : person.id}`}>{person.username}</a>
            </li>
          )
          })}
      </ul>
      <div>
        <p>Name: {person ? person.name : null}</p>
        <p>Email: {person ? person.email : null}</p>
        <p>Company: {person ? person.company.name : null}</p>
        <p>Phone: {person ? person.phone : null}</p>
      </div>
    </div>
  )
}

export default App
