function quickestPath(board: {
  ladders: [number, number][];
  snakes: [number, number][];
}): number[] {
  const ladders = board.ladders.sort((a, b) => a[0] - b[0]);
  const queue: [number] = [1];
  let roll: number[] = [];
  let path: [number, number][] = [];
  let status = true;
  let currentPos = 1;
  while (queue.length > 0) {
    currentPos = queue.shift()!;
    let nextPathLadder: [number, number] | undefined;
    let nextPathSanke: [number, number] | undefined;
    for (let i = 1; i <= 6; i++) {
      let nextPos = currentPos + i;
      nextPathLadder = ladders.find((data) => data[0] === nextPos);
      nextPathSanke = ladders.find((data) => data[0] === nextPos);
      if (nextPathLadder) {
        queue.push(nextPathLadder[1]);
        status = false;
        path.push(nextPathLadder);
        roll.push(i);
      } else if (nextPathSanke) {
        queue.push(nextPathSanke[1]);
        status = false;
        path.push(nextPathSanke);
        roll.push(i);
      }
    }

    if (status) {
      queue.push(currentPos + 6);
      status = !status;
      if (currentPos + 6 > 100) {
        roll.push(100 - currentPos);
      } else {
        roll.push(6);
      }
    }
    console.log(currentPos);
    if (currentPos >= 100) {
      break;
    }
  }

  if (currentPos !== 100) {
    while (currentPos < 100) {
      if (currentPos + 6 > 100) {
        roll.push(100 - currentPos);
        currentPos = 100;
      } else {
        roll.push(6);
        currentPos = currentPos + 6;
      }
    }
  }

  return roll;
}

quickestPath({
  ladders: [
    [3, 39],
    [14, 35],
    [31, 70],
    [44, 65],
    [47, 86],
    [63, 83],
    [71, 93],
  ],
  snakes: [
    [21, 4],
    [30, 8],
    [55, 38],
    [79, 42],
    [87, 54],
    [91, 48],
    [96, 66],
  ],
});
