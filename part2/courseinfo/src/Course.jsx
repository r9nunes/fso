function Course({ course }) {
    return (
        <>
            <Header name={course.name} />
            <Content content={course.parts} />
            <Total content={course.parts} />
        </>
    )
}

function Header({ name }) {
    return (
        <>
            <h1>{name}</h1>
        </>
    )
}


const Content = ({ content }) => (<> {content.map(part => <Part part={part} key={part.id} />)} </>);

function Part({ part }) {
    return (<><p>{part.name} {part.exercises} </p></>)
}

function Total({ content }) {
    const total = content.reduce((acc, cur) => acc + cur.exercises, 0);
    return (
        <>
            <p> <b> Total of {total} exercises </b></p>
        </>
    )
}

export default Course;