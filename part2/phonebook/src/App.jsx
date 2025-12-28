import { useState } from 'react';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function addPerson(person) {
    if(person != ""){
      const newPersons = [...persons];
      newPersons.push({ name: newName })
      setPersons(newPersons);
    }
  }
  function clean(){
    document.getElementById('input#name').value = '';
    setNewName('');
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    addPerson();
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