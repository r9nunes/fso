function App() {
  const course = 'Desenvolvimento de aplicação Half Stack - Part1 E1 E2'
  const part1 = 'Fundamentos da biblioteca React'
  const exercises1 = 10
  const part2 = 'Usando props para passar dados'
  const exercises2 = 7
  const part3 = 'Estado de um componente'
  const exercises3 = 14

  return (
    <>
      <Header course={course}/>
      <Content content={
        [ {part:part1, exercise:exercises1}, 
          {part:part2, exercise:exercises2}, 
          {part:part3, exercise:exercises3}
        ]
      } />
      <Total total={exercises1 + exercises2 + exercises3} />
    </>
  )
}

function Content(params){
  return (
    <>
      <Part content={params.content[0]}/>
      <Part content={params.content[1]}/>
      <Part content={params.content[2]}/>
    </>
  )
}

function Part(params){
  console.log(params);
  return (
    <>
      <p>{params.content.part} {params.content.exercises} </p>
    </>
  )
}

function Header(params){
  return (
    <>
      <h1>{params.course}</h1>
    </>
  )
}



function Total(params){
  return (
    <>
      <p> Number of exercises: {params.total}</p>
    </>
  )
}

export default App
