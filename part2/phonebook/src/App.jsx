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
    const new_person = { name: newName, number: newNumber } //sem ID
    services.create(new_person)
      .then(
        (person) => {
          const pplList = [...people];
          pplList.push(person);
          setPeople(pplList);
        })
  }

  function updatePerson() {
    const person = { ...people.find((p) => p.name === newName), number: newNumber } //com ID
    services.update(person)
      .then(
        (person) => {
          const pplList = [...people].filter((p) => p.id !== person.id);
          pplList.push(person);
          setPeople(pplList);
        })

  }

  function addOrUpdatePerson() {
    if (!newName || newName.trim().length === 0) {
      alert(`Name can't be empty`);
      return false;
    }
    if (!newNumber || newNumber.trim().length === 0) {
      alert(`Number can't be empty`);
      return false;
    }
    const person_exists = people.some(list_person => list_person.name === newName)

    if (person_exists) {
      updatePerson()
    } else {
      addPerson()
    }
  }

  function clean() {
    document.getElementById('input#name').value = '';
    document.getElementById('input#number').value = '';
    setNewName('');
    setNewNumber('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (addOrUpdatePerson())
      clean();
  }

  function removePerson(id) {
    services
      .remove(id)
      .then((success) => {
        if (success) {
          console.log("removido: ", id)
          const new_list = people.filter((p) => p.id != id)
          setPeople(new_list)
        } else {
          console.log('erro?')
        }
      })
      .catch((erro) => console.log(erro))

  }

  function handleRemove(id) {
    const answer = confirm(`Tem certeza q deseja remover ${id}?`)
    if (answer)
      removePerson(id)
  }

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Filter handleFilter={handleFilter} />
        <h2>Add a new</h2>
        <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
        <h2>Numbers</h2>
        <Persons persons={people} filter={filterValue} handleRemove={handleRemove} />
      </div>
      <Debug newName={newName} newNumber={newNumber} filterValue={filterValue} />

    </>
  )
}

export default App