function Persons({ persons }) {
    return (<>
        {persons.map((person, i) => {
            let id = person.name + i;
            return <p key={id}> {person.name} - {person.number}</p>;
        })
        }
    </>);

}

export default Persons