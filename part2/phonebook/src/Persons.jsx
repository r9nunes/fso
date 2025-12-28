function Persons({ persons, filter }) {
    let person_list = [...persons]
    if (filter != undefined)
        person_list = person_list.filter((person) => person.name.includes(filter))
    return (<>{person_list.map((person) => <p key={person.id}> {person.name} - {person.number}</p>)}</>);

}

export default Persons