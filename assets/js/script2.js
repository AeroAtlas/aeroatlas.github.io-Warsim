//Global Values
const tankPercent = 0.1
const ifvPercent = 0.1


function getValues(player){
  const unitBonus =           +document.querySelector(`#unitBonus${player}`).value
  const unitType =            +document.querySelector(`#unitType${player}`).value
  const startingMen =         +document.querySelector(`#startingMen${player}`).value
  const remainingMen =        +document.querySelector(`#remainingMen${player}`).value
  const ifv =                 +document.querySelector(`#ifv${player}`).value
  const ifvNum =              +document.querySelector(`#ifvNum${player}`).value
  const tank =                +document.querySelector(`#tank${player}`).value
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

  return allValues
}

function runInfantryCalculations(values){
  const {unitBonus, unitType, startingMen, remainingMen, ifv, ifvNum, tank, tankNum, 
    defenderTerrain, defenderEntrenched, airSupport, airSupportNum, 
    mortarSupport, mortarSupportNum, artillerySupport, artillerySupportNum} = values

  //? Retreat percentage. Exponential increase in moral loss

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

  console.log(unitModifier +"*"+ moral +"*"+ terrainModifier +"*"+ vehicleModifier +"*"+ supportModifier)

  return [damageResult, remainingMen]
  
}

//static 3rd of all equipment aren't used (defenders)
//static 4th for attackers
//all specialist equipment vs specialist equipment

function getVehicleList(values){
  const {unitBonus, unitType, startingMen, remainingMen, ifv, ifvNum, tank, tankNum, 
    defenderTerrain, defenderEntrenched, airSupport, airSupportNum, 
    mortarSupport, mortarSupportNum, artillerySupport, artillerySupportNum} = values

    const allVehicles = []

    for(let i = 0; i < ifvNum; i++){                allVehicles.push(ifv)               }
    for(let i = 0; i < tankNum; i++){               allVehicles.push(tank)              }
    for(let i = 0; i < airSupportNum; i++){         allVehicles.push(airSupport)        }
    for(let i = 0; i < mortarSupportNum; i++){      allVehicles.push(mortarSupport)     }
    for(let i = 0; i < artillerySupportNum; i++){   allVehicles.push(artillerySupport)  }

    return allVehicles
}

function runVehicleCalculations(player1, player2){
  
}


function rollDice(rolls, diceNum){
  return (rolls * Math.ceil(Math.random() * diceNum))
}


function runBattle(){
  const player1Results = getValues(1)
  const player2Results = getValues(2)

  const vehicle1Results = getVehicleList(player1Results)
  const vehicle2Results = getVehicleList(player2Results)

  const vehicleCombatResults = runVehicleCalculations(vehicle1Results, vehicle2Results)



  const player1DamageTotal = player1[0] * (player1[1] / player2[1])
  const player2DamageTotal = player2[0]


  const combatResult = document.querySelector("#combatResult")
  const damageTotal = Math.round(player1DamageTotal - player2DamageTotal)
  // combatResult.value = damageTotal >= 0 ? `Attackers did ${damageTotal}%` : `Defenders did ${damageTotal}%`
  combatResult.value = `Attackers did ${Math.round(player1DamageTotal/4)}%. Defenders did ${Math.round(player2DamageTotal/4)}%`
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