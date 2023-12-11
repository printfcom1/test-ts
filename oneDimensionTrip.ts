function minEnergy(
  start: number,
  shops: number[],
  stations: number[],
  target: number
): number {
  let energy = 0;
  let curPositions = start;
  while (shops.length != 0) {
    let next = findNextPosition(curPositions, shops, stations);
    const index = shops.indexOf(next);
    if (!(stations.includes(curPositions) && stations.includes(next))) {
      energy = energy + Math.abs(curPositions - next);
    }
    if (index > -1) {
      shops.splice(index, 1);
    }
    curPositions = next;
    if (shops.length === 0) {
      if (target - curPositions <= target - Math.max(...stations)) {
        energy = energy + (target - curPositions);
      } else {
        shops.push(target);
      }
    }
  }

  return energy;
}

// minEnergy(0, [4, 9], [3, 8, 13], 15);

function findNextPosition(
  curPositions: number,
  shops: number[],
  stations: number[]
): number {
  let nextPositions = 0;
  let checker = 0;
  let energy = 0;
  shops.sort((a, b) => a - b);
  stations.sort((a, b) => a - b);
  if (stations.includes(curPositions)) {
    energy = 0;
  } else {
    energy = 2;
  }
  //dif for current positsion and next shop
  let [checkerFn, station] = checkerDif(checker, curPositions, shops[0], 0);
  checker = checkerFn ? checkerFn : checker;
  nextPositions = station ? station : nextPositions;
  for (let i in stations) {
    //dif for current position
    [checkerFn, station] = checkerDif(
      checker,
      curPositions,
      stations[i],
      energy
    );
    checker = checkerFn ? checkerFn : checker;
    nextPositions = station ? station : nextPositions;
    //dif for next shop
    [checkerFn, station] = checkerDif(checker, shops[0], stations[i], energy);
    checker = checkerFn ? checkerFn : checker;
    nextPositions = station ? station : nextPositions;
  }
  return nextPositions;
}

function checkerDif(
  checker: number,
  pointMain: number,
  pointDif: number,
  plusEn: number
): [number | null, number | null] {
  const disDif = Math.abs(pointMain - pointDif) + plusEn;
  if (checker === 0) {
    return [disDif, pointDif];
  } else if (disDif < checker && disDif != 0) {
    return [disDif, pointDif];
  }
  return [null, null];
}
