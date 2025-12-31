import { useState, useEffect } from 'react';
import { PersonForm, Persons, Filter, Notification, Debug } from './Components';
import services from './Services';

const App = () => {
  import('./style.css');

  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterVaue] = useState('');
  const [notification, setNotification] = useState({ text: "", type: "empty" });
  const [count, setCount] = useState(0);

  function doGet() {
    services
      .getAll()
      .then((peopleList) => {
        setPeople(peopleList)
        setCount(peopleList.length)
        return peopleList.length;
      })
      .catch(
        (error) => {
          console.debug('[Error]doGet: ', error)
        })
  }

  function doCount() {
    const c = services.count();

    console.log('doCount', c)
    setCount(c)
    return c;
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

  function newNotification(text, type) {
    console.log(`${text} <<<--- ${type}`)
    // return
    setNotification({ text: text, type: type });
    setTimeout(() => {
      setNotification({ text: "", type: "empty" });
    }, 3000)
  }

  function addPerson() {
    const new_person = { name: newName, number: newNumber } //sem ID
    services.create(new_person)
      .then(
        (person) => {
          const pplList = [...people];
          pplList.push(person);
          setPeople(pplList);
          newNotification(`${newName} adicionado com sucesso`, "insert");
        })
    if (doCount() !== people.length) doGet();
    return true
  }

  function updatePerson() {
    const person = { ...people.find((p) => p.name === newName), number: newNumber } //com ID
    services.update(person)
      .then(
        (person) => {
          const pplList = [...people].filter((p) => p.id !== person.id);
          pplList.push(person);
          setPeople(pplList);
          newNotification(`${newName} atualizado com sucesso`, "update");
        })
    if (doCount() !== people.length) doGet();
    return true;
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
      return updatePerson()
    } else {
      return addPerson()
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
    if (addOrUpdatePerson()) {
      clean();
    }
  }

  function localRemove(id) {
    const new_list = people.filter((p) => p.id != id)
    setPeople(new_list)
  }

  function removePerson(id) {
    const person = people.find((p) => p.id == id);
    services
      .remove(id)
      .then((success) => {
        if (success) {
          console.log("removido: ", id)
          localRemove(id);
          newNotification(`${person.name} removido com sucesso`, "remove");
        } else {
          newNotification(`Erro 1 ao remover ${person.name}`, "error");
        }
      })
      .catch((error) => {
        newNotification(`Information of ${person.name} has already been remove from server [E2:${error}]`, "error")
      })
    if (doCount() !== people.length) doGet();
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
        <Notification text={notification.text} type={notification.type} />
        <Filter handleFilter={handleFilter} />
        <h2>Add a new</h2>
        <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
        <h2>Numbers</h2>
        <Persons persons={people} filter={filterValue} handleRemove={handleRemove} />
      </div>
      <Debug newName={newName} newNumber={newNumber} filterValue={filterValue} count={count} />

    </>
  )
}

export default App