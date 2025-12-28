import { useState } from 'react';
import { Persons, Filter, Debug } from './Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterVaue] = useState('');

  function handleFilter(event) {
    setFilterVaue(event.target.value)
  }

  function handleNameChange(event) {
    setNewName(event.target.value);
  }
  function handleNumberChange(event) {
    setNewNumber(event.target.value);
  }

  function addPerson() {
    const person_exists = persons.some(list_person => list_person.name === newName)
    if (person_exists) {
      alert(`${newName} is already added to phonebook`);
      return false
    }
    if (newName.trim().length === 0) {
      return false;
    }
    if (newNumber.trim().length === 0) {
      return false;
    }
    const newPersons = [...persons];
    const temp_person = { name: newName, number: newNumber, id: persons.length + 1 }
    console.log(temp_person)
    newPersons.push(temp_person)
    setPersons(newPersons);
    return true;
  }

  function clean() {
    document.getElementById('input#name').value = '';
    document.getElementById('input#number').value = '';
    setNewName('');
    setNewNumber('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (addPerson())
      clean();
  }

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Filter handleFilter={handleFilter} />
        <h2>Add a new</h2>
        <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
        <h2>Numbers</h2>
        <Persons persons={persons} filter={filterValue} />
      </div>
      <Debug newName={newName} filterValue={filterValue} />

    </>
  )
}

function PersonForm({ handleSubmit, handleNameChange, handleNumberChange }) {
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

export default App