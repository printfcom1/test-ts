function getQuestionPart(phrases: string[]): string[] {
  const wordDupliArray = phrases.map((phrase) => {
    const chaArray: string[] = phrase.split("");
    chaArray.push("/n");
    let wordDupli: string = "";
    let checker: boolean[] = [];
    for (let i = 0; i < chaArray.length - 1; i++) {
      let word = chaArray[i];
      for (let j = 1; j < chaArray.length - i; j++) {
        word = word + chaArray[i + j];
        let dataCheck = phrases.map((data) => data.includes(word));
        let checkWord = dataCheck.every((v) => v === true);
        checker.push(checkWord);
        if (
          checker[checker.length - 1] === false &&
          checker[checker.length - 2] === true
        ) {
          break;
        }
        wordDupli = word;
      }
      if (
        checker[checker.length - 1] === false &&
        checker[checker.length - 2] === true
      ) {
        break;
      }
    }
    return wordDupli;
  });

  const wordDupli = wordDupliArray.filter(
    (item, index) => wordDupliArray.indexOf(item) !== index
  );

  const result = phrases.map((data) => {
    const strSplit = data.split("");
    strSplit.splice(data.search(wordDupli[0]), wordDupli[0].length);
    return strSplit.join("").trim();
  });

  return result;
}

// console.log(getQuestionPart(["BATHROOM", "BATH SALTS", "BLOODBATH"]));
// console.log(getQuestionPart(["BEFRIEND", "GIRLFRIEND", "FRIENDSHIP"]));
