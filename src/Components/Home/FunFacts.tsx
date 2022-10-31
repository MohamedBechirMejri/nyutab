import React, { useEffect } from "react"

const FunFacts = ({ className }: { className?: string }) => {
  const [facts, setFacts] = React.useState([
    {
      id: 1,
      text: "The bumblebee bat is the world’s smallest mammal.",
    },
    {
      id: 2,
      text: "The circulatory system is more than 60,000 miles long.",
    },
    {
      id: 3,
      text: "There are parts of Africa in all four hemispheres.",
    },
  ])
  const [fact, setFact] = React.useState({
    id: 1,
    text: "",
  })
  useEffect(() => {
    setFact(facts[Math.floor(Math.random() * facts.length)])
  }, [facts])

  return (
    <p
      className={`w-full p-3 font-medium text-center transition-all rounded-lg justify-centergap-2 dark:text-white center ${className}`}
      key={fact.id}
    >
      <span className="text-slate-400">Fact: </span>
      {fact.text}
    </p>
  )
}

export default FunFacts
