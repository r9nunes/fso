import { useState, useEffect } from 'react';
import { PersonForm, Persons, Filter, Debug } from './Components';
import services from './Services';

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterVaue] = useState('');

  function doGet() {
    services.getAll()
      .then((peopleList) => { setPeople(peopleList) })
      .catch((error) => { console.debug('[Error]doGet: ', error) })
  }

  useEffect(doGet, []);

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
    const person_exists = people.some(list_person => list_person.name === newName)
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

    const temp_person = { name: newName, number: newNumber } //sem ID
    services.create(temp_person)
      .then(
        (person) => {
          const pplList = [...people];
          pplList.push(person);
          setPeople(pplList);
          return true;
        })
      .catch((error) => {
        console.debug('[Error]doPost#', error);
        return false;
      })
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
        <Persons persons={people} filter={filterValue} />
      </div>
      <Debug newName={newName} newNumber={newNumber} filterValue={filterValue} />

    </>
  )
}

export default App