import axios from 'axios';

function getAll() {
    console.debug('lendo dados - doGet')
    const request = axios.get('http://localhost:3001/persons')
    return request.then(response => response.data)
}

function create(newPerson) { //also known as 'add' :-)
    const request = axios.post('http://localhost:3001/persons', newPerson)
    return request.then((response) => { return response.data })
}

function update(person) {
    const request = axios.put(`http://localhost:3001/persons/${person.id}`, person)
    return request.then((response) => response.data)
}
function remove(id) {
    const request = axios.delete(`http://localhost:3001/persons/${id}`);
    return request.then((response) => (response.status === 200 || response.status === 204)
    )
}
function doPatch() { }

export default { getAll, create, update, doPatch, remove };