import { useState, useEffect } from 'react';
import { PersonForm, Persons, Filter, Debug } from './Components';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterVaue] = useState('');

  function doGet() {
    console.debug('lendo dados - json-db')
    axios
      .get('http://localhost:3001/persons')
      .then(
        (response) => {
          console.debug('axios.then')
          console.debug(response.data);
          setPersons(response.data)
        }).catch(
          (error) => {
            console.debug('axios.catch', error)
          })
  }

  function doPost(newPerson) { //also known as 'add' :-)
    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(
        (response) => {
          const person = response.data
          const personsList = [...persons];
          personsList.push(person);
          setPersons(personsList);
          return true;
        })
      .catch((error) => {
        console.debug('[Error]doPost#', error);
        return false;
      })
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

    const temp_person = { name: newName, number: newNumber } //removi id
    // console.debug(temp_person) //DEBUG
    doPost(temp_person)
    // .then( (person) => {     })
    // .catch((error)=>{ console.debug('[Error]doPost#',error); return false;})
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
      <Debug newName={newName} newNumber={newNumber} filterValue={filterValue} />

    </>
  )
}

export default App