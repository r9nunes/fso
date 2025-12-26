import { useState } from 'react'

const rand_int = (max) => {
  const v = parseInt(Math.random() * max);
  console.log(v);
  return v;
}

const App = () => {
  const anecdotes = [
    'Se fazer algo dói, faça isso com mais frequência.',
    'Contratar mão de obra para um projeto de software que já está atrasado, faz com que se atrase mais ainda!',
    'Os primeiros 90% do código correspondem aos primeiros 10% do tempo de desenvolvimento... Os outros 10% do código correspondem aos outros 90% do tempo de desenvolvimento.',
    'Qualquer tolo escreve código que um computador consegue entender. Bons programadores escrevem código que humanos conseguem entender.',
    'Otimização prematura é a raiz de todo o mal.',
    'Antes de mais nada, depurar é duas vezes mais difícil do que escrever o código. Portanto, se você escrever o código da forma mais inteligente possível, você, por definição, não é inteligente o suficiente para depurá-lo.',
    'Programar sem o uso extremamente intenso do console.log é o mesmo que um médico se recusar a usar raio-x ou testes sanguíneos ao diagnosticar pacientes.',
    'A única maneira de ir rápido é ir bem.'
  ]
  
  const [selected, setSelected] = useState(rand_int(anecdotes.length));
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const vote = (index) => {
    const new_votes = [...votes];
    new_votes[index] ++;
    setVotes(new_votes);
    console.log(votes);
  }
  
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <button onClick={() => setSelected(rand_int(anecdotes.length))}>Next Anecdote</button>
      <button onClick={() => vote(selected)}>Vote</button>
      <MaisVotada anecdotes={anecdotes} votes={votes} />
    </div>
  )
}
   
function MaisVotada({anecdotes, votes}) {
  const maior_votacao = Math.max(...votes);
  const pos_maior_votacao = votes.indexOf(maior_votacao)
  const mais_votada = anecdotes[pos_maior_votacao];
  if (maior_votacao === 0) 
    return (<p></p>)
  return (<> 
    <h2>Anecdota mais votada</h2>
    <p>{mais_votada}</p>
    <p>com {maior_votacao} votos</p>
  </>)
}
export default App