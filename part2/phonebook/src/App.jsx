import { useState } from 'react';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '123456' }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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
    newPersons.push({ name: newName, number: newNumber })
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
        <h2>Numbers</h2>
        <Persons persons={persons} />
      </div>
      <div>debug: {newName}</div>
    </>
  )
}

export default App