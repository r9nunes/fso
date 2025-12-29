export function Filter({ handleFilter }) {
  return (
    <div>
      filter shown with <input id="input#name#filter" onChange={handleFilter} />
    </div>
  )
}
export function Debug({ newName, filterValue }) {
  return (
    <>
      <h2>Debub info</h2>
      <div>
        name: {newName} <br />
        filter: {filterValue}
      </div>
    </>
  )
}
export function Person({ person }) {
  return (
    <div> {person.name} - {person.number} </div>)
}

export function Persons({ persons, filter }) {
  let person_list = [...persons]
  console.log(person_list)
  if (filter != undefined) {
    person_list = person_list.filter((person) => person.name.includes(filter))
  }
  return (<>{person_list.map((person) => <Person key={person.id} person={person} />)} </>)

}

export function PersonForm({ handleSubmit, handleNameChange, handleNumberChange }) {
  return (<>
    <form onSubmit={handleSubmit}>
      <div>
        name: <input id="input#name" onChange={handleNameChange} />
      </div>
      <div>
        number: <input id="input#number" onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>

  </>)

}

export default Persons