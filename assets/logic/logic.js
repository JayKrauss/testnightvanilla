$(document).ready(function(){
const mapList = {
    map1 : [[0,0,0,0,0,0,0,0,0,0],
            [0,1,1,1,1,8,1,1,7,0],
            [0,1,2,1,1,1,0,0,0,0],
            [0,1,1,1,1,9,1,1,1,0],
            [0,8,8,10,10,10,10,1,1,0],
            [0,6,1,1,1,7,10,1,5,0],
            [0,0,0,0,0,0,0,10,0,0]],
            
    map2 : [[0,0,0,0,0,0,0,0,0,0],
            [0,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,0],
            [0,0,0,0,0,0,0,0,0,0]]
    };


let numMap = [[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]];

let map= mapList.map1;

let grids = [[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]];

function getIndexOfCurrent(arr, k) {
        for (var i = 0; i < arr.length; i++) {
        var index = arr[i].indexOf(k);
        if (index > -1) {
        return [i, index];
        }
    }
}

let currentPOS = getIndexOfCurrent(map, 2);
let currentType = 2;

// function createArray(num, dimensions) {
//     var array = [];
//     for (var i = 0; i < dimensions; i++) {
//       array.push([]);
//       for (var j = 0; j < dimensions; j++) {
//         array[i].push(num);
//       }
//     }
//     return array;
//   }

function  createMap(mapName) {
// let dimensions = 9, // width and height of the map
//   maxTunnels = 10, // max number of tunnels possible
//   maxLength = 100, // max length each tunnel can have
//   map = createArray(1, dimensions), // create a 2d array full of 1's
//   currentRow = Math.floor(Math.random() * dimensions), // our current row - start at a random spot
//   currentColumn = Math.floor(Math.random() * dimensions), // our current column - start at a random spot
//   directions = [[-1, 0], [1, 0], [0, -1], [0, 1]], // array to get a random direction from (left,right,up,down)
//   lastDirection = [], // save the last direction we went
//   randomDirection; // next turn/direction - holds a value from directions

// // lets create some tunnels - while maxTunnels, dimentions, and maxLength  is greater than 0.
// while (maxTunnels && dimensions && maxLength) {

//   // lets get a random direction - until it is a perpendicular to our lastDirection
//   // if the last direction = left or right,
//   // then our new direction has to be up or down,
//   // and vice versa
//   do {
//      randomDirection = directions[Math.floor(Math.random() * directions.length)];
//   } while ((randomDirection[0] === -lastDirection[0] && randomDirection[1] === -lastDirection[1]) || (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1]));

//   var randomLength = Math.ceil(Math.random() * maxLength), //length the next tunnel will be (max of maxLength)
//     tunnelLength = 0; //current length of tunnel being created

//     // lets loop until our tunnel is long enough or until we hit an edge
//   while (tunnelLength < randomLength) {

//     //break the loop if it is going out of the map
//     if (((currentRow === 0) && (randomDirection[0] === -1)) ||
//         ((currentColumn === 0) && (randomDirection[1] === -1)) ||
//         ((currentRow === dimensions - 1) && (randomDirection[0] === 1)) ||
//         ((currentColumn === dimensions - 1) && (randomDirection[1] === 1))) {
//       break;
//     } else {
//       map[currentRow][currentColumn] = 0; //set the value of the index in map to 0 (a tunnel, making it one longer)
//       currentRow += randomDirection[0]; //add the value from randomDirection to row and col (-1, 0, or 1) to update our location
//       currentColumn += randomDirection[1];
//       tunnelLength++; //the tunnel is now one longer, so lets increment that variable
//     }
//   }

//   if (tunnelLength) { // update our variables unless our last loop broke before we made any part of a tunnel
//     lastDirection = randomDirection; //set lastDirection, so we can remember what way we went
//     maxTunnels--; // we created a whole tunnel so lets decrement how many we have left to create
//   }
// }

map =  mapName;
console.log('Premap: ')
console.log(map)
return map; 
}

function mapGenerate(mapName){
grids = createMap(mapName);  
$("#play-field").html('');
for(var i = 0; i < map.length; i++) {
var innerArrayLength = map[i].length;
for(var j = 0; j<innerArrayLength; j++){

  let coordY = [i]
  let coordX = [j]
  let type = map[i][j];
  let coord = coordY + '-' + coordX + '-' + type;
  console.log('COORD : ' + coord);

  //0 : Unpassable Terrain ||| 1 : Passable clear Terrain ||| 2: Character
  //3 : Selectable terrain ||| adding a 3 to any type adds this selection
  //5 : Large castle ||| 9 : Castle gate
  //6 : Cave - 8 : Ruins ||| 7 : Chest
  //10 : Unpassable water

  switch (type){
  case 0:
      grids[i][j]=`<div id=${coord} class='badge outer'>`;
      break;
  case 2:
      grids[i][j]=`<div id=${coord} class='badge tile local'><img src='./assets/images/knight.png'></div>`;
      
      break;
  case 3:
      grids[i][j]=`<div id=${coord} class='badge option tile'>`;
      break;
  case 5:
      grids[i][j]=`<div id=${coord} class='badge castle tile'><img src='./assets/images/castle.png')}></div>`;
      break;
  case 53:
      grids[i][j]=`<div id=${coord} class='badge castle tile option'><img src='./assets/images/castle.png')}></div>`;
      break;    
  case 6:
      grids[i][j]=`<div id=${coord} class='badge cave tile'><img src='./assets/images/cave.png')}></div>`;
      break;
  case 63:
      grids[i][j]=`<div id=${coord} class='badge cave tile option'><img src='./assets/images/cave.png')}></div>`;
      break;
  case 7:
      grids[i][j]=`<div id=${coord} class='badge chest tile'><img src='./assets/images/chest.png')}></div>`;
      break;
  case 73:
      grids[i][j]=`<div id=${coord} class='badge chest tile option'><img src='./assets/images/chest.png')}></div>`;
      break;
  case 8:
      grids[i][j]=`<div id=${coord} class='badge ruins tile'><img src='./assets/images/ruins.png')}></div>`;
      break;
  case 83:
      grids[i][j]=`<div id=${coord} class='badge ruins tile option'><img src='./assets/images/ruins.png')}></div>`;
      break;
  case 9:
      grids[i][j]=`<div id=${coord} class='badge gate tile'><img src='./assets/images/gate.png')}></div>`;
      break;
  case 93:
      grids[i][j]=`<div id=${coord} class='badge gate tile option'><img src='./assets/images/gate.png')}></div>`;
      break;
  case 10:
      grids[i][j]=`<div id=${coord} class='badge water tile'>`;
      break;
  default:
      grids[i][j]=`<div id=${coord} class='badge tile'>`;
      break;
  }
}
$("#play-field").append(grids[i])
}  
}

function mapOptions(mapName){
let coordList = [];
let coord = getIndexOfCurrent(mapName, 2);
for(var i = 0; i < map.length; i++) {
var innerArrayLength = map[i].length;
for(var j = 0; j<innerArrayLength; j++){
let type = map[i][j];
if (type === 3){
  map[i][j] = 1;
}
}
}
console.log('CURRENT TYPE:')
console.log('INTERMEDIATE COORD');
console.log(coord)
let zeroPlace = Number(coord[0]);
let onePlace =  Number(coord[1]);
if (zeroPlace % 2 === 0){
  let topLeft = [(zeroPlace - 1),(onePlace - 1), map[(zeroPlace - 1)][(onePlace - 1)]];
  coordList.push(topLeft);
  let topRight = [(zeroPlace - 1),(onePlace), map[(zeroPlace - 1)][(onePlace)]];
  coordList.push(topRight);
  console.log('Top Left: ' + topLeft + ' Top Right: ' + topRight);
  let left = [zeroPlace, (onePlace - 1), map[zeroPlace][(onePlace - 1)]];
  coordList.push(left);
  let right = [zeroPlace, (onePlace + 1), map[zeroPlace][(onePlace + 1)]];
  coordList.push(right);
  console.log('Left: ' + left + ' Right: ' + right);
  let bottomLeft = [(zeroPlace + 1),(onePlace - 1), map[(zeroPlace + 1)][(onePlace - 1)]];
  coordList.push(bottomLeft);
  let bottomRight = [(zeroPlace + 1),(onePlace), map[(zeroPlace + 1)][(onePlace)]];
  coordList.push(bottomRight);
  console.log('Bottom Left: ' + bottomLeft + ' Bottom Right: ' + bottomRight);
}
else{
  let topLeft = [(zeroPlace - 1),(onePlace), map[(zeroPlace - 1)][(onePlace)]];
  coordList.push(topLeft);
  let topRight = [(zeroPlace - 1),(onePlace + 1), map[(zeroPlace - 1)][(onePlace)]];
  coordList.push(topRight);
  console.log('Top Left: ' + topLeft + ' Top Right: ' + topRight);
  let left = [zeroPlace, (onePlace - 1), map[zeroPlace][(onePlace - 1)]];
  coordList.push(left);
  let right = [zeroPlace, (onePlace + 1), map[zeroPlace][(onePlace + 1)]];
  coordList.push(right);
  console.log('Left: ' + left + ' Right: ' + right);
  let bottomLeft = [(zeroPlace + 1),(onePlace), map[(zeroPlace + 1)][(onePlace)]];
  coordList.push(bottomLeft);
  let bottomRight = [(zeroPlace + 1),(onePlace + 1), (map[(zeroPlace + 1)][(onePlace)])];
  coordList.push(bottomRight);
  console.log('Bottom Left: ' + bottomLeft + ' Bottom Right: ' + bottomRight);
}
console.log('COORD LIST')
console.log(coordList)
for (var i=0; i<coordList.length; i++){
let y = Number(coordList[i][0]);
let x = Number(coordList[i][1]);
let type = Number(coordList[i][2]);
switch (type){
case 1:
      mapName[y][x] = 3;
  break;
case 0:
      mapName[y][x] = 0;
  break;
case 10:
      mapName[y][x] = 10;
  break;
default:
  mapName[y][x] = 3;
  break;
}
}
}

function mapRebuild(stringArray){
for(var i = 0; i < stringArray.length; i++) {
var innerArrayLengthR = stringArray[i].length;
for(var j = 0; j<innerArrayLengthR; j++){
let Y = [i];
let X = [j];
let gridElementR = stringArray[Y][X];
let eleSplitR = String(gridElementR).split(' ')
let gridIDArrR = String(eleSplitR[1]).substring(3).split('-');
let gridYR = Number(gridIDArrR[0]);
let gridXR = Number(gridIDArrR[1]);
let gridTypeR = Number(gridIDArrR[2]);

numMap[gridYR][gridXR] = gridTypeR;
}
}
}
console.log('FINAL MAP')
console.log(map)

function handleMove(current, cType, chosen, chosenType){
console.log("Current: ");
console.log(current);
console.log("Current Type: ");
console.log(cType);
console.log("Chosen: ");
console.log(chosen);
console.log("Chosen Type: ");
console.log(chosenType);
mapRebuild(map);
console.log(numMap);
numMap[current[0]][current[1]] = 1;
numMap[chosen[0]][chosen[1]] = 2;
console.log(numMap);
map = numMap;
mapOptions(map);
mapGenerate(map);
};

mapOptions(map)
mapGenerate(mapList.map1); 

$('#play-field').on('click', '.option', function(){
    console.log("Clicked!")

    let splitID = this.id.split('-');
    let y = splitID[0];
    let x = splitID[1];
    let tileType = splitID[2];
    console.log(`New : Y : ${y} - X : ${x} - Type : ${tileType}`);
    let coords = [y, x];

    let cy = currentPOS[0];
    let cx = currentPOS[1];
    let currentTile = [cy, cx];

    console.log(map);
        
    handleMove(currentTile, currentType, coords, tileType);
});

});