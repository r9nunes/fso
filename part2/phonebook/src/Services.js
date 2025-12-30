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

function update() { }
function remove() { }
function doPatch() { }

export default { getAll, create, update, doPatch, remove };