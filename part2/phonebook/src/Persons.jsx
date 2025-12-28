export function Filter({ handleFilter }) {
    return (
        <div>
            filter shown with <input id="input#name#filter" onChange={handleFilter} />
        </div>
    )
}
export function Debug({ newName, filterValue }) {
    return (
        <>
            <h2>Debub info</h2>
            <div>
                name: {newName} <br />
                filter: {filterValue}
            </div>
        </>
    )
}
export function Person({ person }) {
    return (
        <div> {person.name} - {person.number} </div>)
}

export function Persons({ persons, filter }) {
    let person_list = [...persons]
    if (filter != undefined)
        person_list = person_list.filter((person) => person.name.includes(filter))
    return (<>{person_list.map((person) => <Person key={person.id} person={person} />)} </>)

}

export default Persons