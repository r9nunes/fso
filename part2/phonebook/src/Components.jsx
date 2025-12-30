export function Filter({ handleFilter }) {
  return (
    <div>
      filter shown with <input id="input#name#filter" onChange={handleFilter} />
    </div>
  )
}
export function Debug({ newName, newNumber, filterValue }) {
  return (
    <>
      <h2>Debub info</h2>
      <div>
        name: {newName} <br />
        number: {newNumber} <br />
        filter: {filterValue}
      </div>
    </>
  )
}

const espaco = (n) => " ".repeat(60-n);
const length = (person) => person.name.length + person.number.length + person.id.length;

export function Person({ person , handleRemove}) {
  return (
    <div style={{ whiteSpace: "pre" }}> {person.name} - {person.number} {espaco(length(person))} (id:{person.id}) <button onClick={() => handleRemove(person.id)}>Remover</button></div>)
}

export function Persons({ persons, filter, handleRemove }) {
  let person_list = [...persons]
  // console.debug("Person list: ",person_list) //DEBUG
  if (filter != undefined) {
    person_list = person_list.filter((person) => person.name.includes(filter))
  }
  return (<>{person_list.map((person) => <Person key={person.id} person={person} handleRemove={handleRemove} />)} </>)

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