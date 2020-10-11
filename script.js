//Global Values
const tankPercent = 0.1
const ifvPercent = 0.1


function getValues(player){
  const unitBonus =           +document.querySelector(`#unitBonus${player}`).value
  const unitType =            +document.querySelector(`#unitType${player}`).value
  const startingMen =         +document.querySelector(`#startingMen${player}`).value
  const remainingMen =        +document.querySelector(`#remainingMen${player}`).value
  const ifv =              +document.querySelector(`#ifv${player}`).value
  const ifvNum =              +document.querySelector(`#ifvNum${player}`).value
  const tank =             +document.querySelector(`#tank${player}`).value
  const tankNum =             +document.querySelector(`#tankNum${player}`).value

  const defenderTerrain =     +document.querySelector(`#defenderTerrain${player}`).value
  const defenderEntrenched =  +document.querySelector(`#defenderEntrenched${player}`).value
  const airSupport =          +document.querySelector(`#airSupport${player}`).value
  const airSupportNum =       +document.querySelector(`#airSupportNum${player}`).value
  const mortarSupport =       +document.querySelector(`#mortarSupport${player}`).value
  const mortarSupportNum =    +document.querySelector(`#mortarSupportNum${player}`).value
  const artillerySupport =    +document.querySelector(`#artillerySupport${player}`).value
  const artillerySupportNum = +document.querySelector(`#artillerySupportNum${player}`).value
  

  const allValues = {
    unitBonus,
    unitType,
    startingMen,
    remainingMen,
    ifv,
    ifvNum,
    tank,
    tankNum,
    defenderTerrain,
    defenderEntrenched,
    airSupport,
    airSupportNum,
    mortarSupport,
    mortarSupportNum,
    artillerySupport,
    artillerySupportNum
  }

  return runCalculations(allValues)
}

function runCalculations(values){
  const {unitBonus, unitType, startingMen, remainingMen, ifv, ifvNum, tank, tankNum, 
    defenderTerrain, defenderEntrenched, airSupport, airSupportNum, 
    mortarSupport, mortarSupportNum, artillerySupport, artillerySupportNum} = values

  //? Retreat percentage. Exponential increase in moral loss

  //infintry damage => remaining men in Unit A (att) / remaining men in Unit B (def)

  let unitModifier = (unitBonus/10) * unitType 

  let casualities = startingMen - remainingMen
  let moral = 1 - (casualities / startingMen)

  let terrainModifier = defenderTerrain * defenderEntrenched

  let vehicleModifier = ifv * (1 + ((ifvNum/10)*0.1)) * tank * (1 + ((tankNum/10)*0.1))

  let airModifier = airSupport * (1 + ((airSupportNum/10)*0.1))
  let mortarModifier = mortarSupport * (1 + ((mortarSupportNum/10)*0.08))
  let artilleryModifier = artillerySupport * (1 + ((artillerySupportNum/10)*0.12))

  let supportModifier = airModifier * mortarModifier * artilleryModifier

  let damageResult = unitModifier * moral * terrainModifier * vehicleModifier * supportModifier


  return [damageResult, remainingMen]
  
}

function rollDice(rolls, diceNum){
  return (rolls * Math.ceil(Math.random() * diceNum))
}


function runBattle(){
  const player1 = getValues(1)
  const player2 = getValues(2)

  const player1DamageTotal = player1[0] * (player1[1] / player2[1])
  const player2DamageTotal = player2[0]


  const combatResult = document.querySelector("#combatResult")
  const damageTotal = Math.round(player1DamageTotal - player2DamageTotal)
  // combatResult.value = damageTotal >= 0 ? `Attackers did ${damageTotal}%` : `Defenders did ${damageTotal}%`
  combatResult.value = `Attackers did ${Math.round(player1DamageTotal)}%. Defenders did ${Math.round(player2DamageTotal)}%`
}



//Specific Dice Rolls
function unitBonusFunc1(){
  document.querySelector("#unitBonus1").value = rollDice(5,5)
}
function unitBonusFunc2(){
  document.querySelector("#unitBonus2").value = rollDice(5,5)
}


//Run application
document.querySelector("#submitVals").addEventListener("click", runBattle);

//Roll Dice
document.querySelector("#randomUnitBonus1").addEventListener("click", unitBonusFunc1);
document.querySelector("#randomUnitBonus2").addEventListener("click", unitBonusFunc2);