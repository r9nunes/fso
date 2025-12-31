import axios from 'axios';

function getAll() {
    console.debug('lendo dados - doGet')
    const request = axios.get('http://localhost:3001/persons')
    return request.then(response => response.data)
}

// this tests doesn't return x-total-count
//         .get("http://localhost:3001/persons?_page=1&_limit=0")
//         //.head("http://localhost:3001/persons?_page=1&_limit=1")
async function count() {
    const lista = await getAll()
    const total = lista.length
    console.log(total)
    return total;
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

export default { getAll, create, update, doPatch, remove, count };