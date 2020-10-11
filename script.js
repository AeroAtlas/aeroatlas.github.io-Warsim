function getValues(){
  const unitBonus = document.querySelector("#unitBonus").value
  const unitType = document.querySelector("#unitType").value
  const startingMen = document.querySelector("#startingMen").value
  const remainingMen = document.querySelector("#remainingMen").value
  const ifvNum = document.querySelector("#ifvNum").value
  const tankNum = document.querySelector("#tankNum").value
  

  const allValues = {
    unitBonus,
    unitType,
    startingMen,
    remainingMen,
    ifvNum,
    tankNum
  }
  runCalculations(allValues)
}

function runCalculations(values){
  const {unitBonus, unitType, startingMen, remainingMen, ifvNum, tankNum } = values
  console.log(unitBonus, unitType, startingMen, remainingMen, ifvNum, tankNum)

  let result = unitBonus * unitType * remainingMen * (ifvNum*0.1) * (tankNum*0.1)

  const combatResult = document.querySelector("#combatResult")
  combatResult.value = result
  
}

function rollDice(num){
  document.querySelector("#unitBonus").value = Math.ceil(Math.random() * num)
}


//Run application
document.querySelector("#submitVals").addEventListener("click", getValues);

//Roll Dice
document.querySelector("#randomUnitBonus").addEventListener("click", () => rollDice(100));