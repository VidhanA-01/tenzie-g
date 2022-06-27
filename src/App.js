import React from "react";
import Die from "./components/Die";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";
export default function App(){
  const [dice,setDice] = React.useState(allNewDice())
  const [tenzies,setTenzies] = React.useState(false)
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
            setTenzies(true)
        }
  },[dice])
  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}
  function allNewDice(){
    const Dices=[];
    for(let i=0;i<10;i++){
      Dices.push(generateNewDie())
    }
   return Dices;
  }
  function rollDice(){
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
          return die.isHeld ? 
              die :
              generateNewDie()
      }))
  } else {
      setTenzies(false)
      setDice(allNewDice())
  }
  }
  function holdDice(id){
    setDice(dice => dice.map( item => {
      if(id === item.id){
        return({...item,isHeld:!item.isHeld})
      }else{
        return item
      }
    }))
  }
  const showDice = dice.map(item => 
   (<Die  
    key={item.id} 
    value={item.value} 
    isHeld={item.isHeld}
    hold ={() => holdDice(item.id)}
    />)
   )
  return(
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-parent">
      {showDice}
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzies?"New Game":"Roll"}</button>
      {tenzies && <Confetti />}
    </main>
  )
}
