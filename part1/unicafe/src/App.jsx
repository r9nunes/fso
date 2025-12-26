import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (<tr><td>{text}</td><td>{value}</td></tr>)

const Statistics = ({ stats: { good, neutral, bad } }) => {
  const all = good + neutral + bad;
  const avg = (good - bad) / all;
  const pos = (good / (all));
  if (all <= 0)
    return (<div> No feedback given</div>)
  return (<div>
    <h2> statistics </h2>
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={all} />
        <StatisticLine text="Average" value={avg} />
        <StatisticLine text="Positive" value={pos * 100 + "%"} />
      </tbody>
    </table>
  </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const on_good = () => setGood(good + 1)
  const on_neutral = () => setNeutral(neutral + 1)
  const on_bad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={on_good} text="good" />
      <Button onClick={on_neutral} text="neutral" />
      <Button onClick={on_bad} text="bad" />
      <Statistics stats={{ good: good, neutral: neutral, bad: bad }} />
    </div>
  )
}

export default App