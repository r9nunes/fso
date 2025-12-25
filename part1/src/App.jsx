function App() {
  const course = {
    name: 'Desenvolvimento de aplicação Half Stack - Part1 E5',
    parts : [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ], 
    total : () => {
      return course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
    }
  }

  return (
    <>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total total={course.total()} />
    </>
  )
}


function Content(params) {
  // console.log(params);
  // console.log('done');
  return (
    <>
      <Part content={params.content[0]} />
      <Part content={params.content[1]} />
      <Part content={params.content[2]} />
    </>
  )
}

function Part(params) {
  console.log(params);
  return (
    <>
      <p>{params.content.name} {params.content.exercises} </p>
    </>
  )
}

function Header(params) {
  return (
    <>
      <h1>{params.course}</h1>
    </>
  )
}



function Total(params) {
  return (
    <>
      <p> Number of exercises: {params.total}</p>
    </>
  )
}

export default App
