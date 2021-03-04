const avg = arr => {
  // sorting array
  arr.sort((a, b) => (a > b) ? 1 : (a < b) ? -1 : 0);

  const teamA = [];
  const teamB = [];

  const baseNum = arr.length / 4; // this number gives the reference for the operation

  // theam A will receive the first and the last from the array until the 5th position.
  //   adding element's rule: it increments the first team B array's item and decrease the second item.
  // while team B will receive 6th and 15th until 10th (it adds team B elements using the same rule above).
  for (let c = 0; c < baseNum; c++) {
    teamA.push(arr[c], arr[(arr.length - 1) - c]);
    teamB.push(arr[c + baseNum], arr[(arr.length - 1 - ( c + baseNum))]);
  }


    // returning a string
    // return ` - teamA: ${teamA} total score: ${teamA.reduce((acc, cur) => acc + cur)}\n - teamB: ${teamB} total score: ${teamB.reduce((acc, cur) => acc + cur)}`;

    // in case of returning teams as array items
    return ([teamA, teamB]);
}

const ar = [8, 5, 6, 9, 3, 8, 2, 4, 6, 10, 8, 5, 6, 1, 7, 10, 5, 3, 7, 6];

console.log(avg(ar));

// https://www.aconvert.com/video/webm-to-mp4/