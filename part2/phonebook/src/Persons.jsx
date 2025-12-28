function Persons({ persons }) {
    return (<>
        {persons.map((person, i) => {
            let id = person.name + i;
            return <p key={id}> {person.name}</p>;
        })
        }
    </>);

}

export default Persons