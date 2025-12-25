function App() {
  const course = 'Desenvolvimento de aplicação Half Stack - Part1 E3.'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const content = [part1, part2, part3];

  return (
    <>
      <Header course={course} />
      <Content content={ content }/>
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
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
