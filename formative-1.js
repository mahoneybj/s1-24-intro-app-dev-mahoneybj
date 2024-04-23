console.log("Hello, World!");

{
  const isPrime = (num) => {
    if (n <= 1) return false;
    if (n <= 3) return true;

    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }

    return true;
  }
}

{
  const reverseString = (word) => {
    let reversed = word.split('').reverse().join('');
    return reversed;
  }
}

{
    
    
  const findMax = (numArray) => {
    let maxNum = 0;
    numArray.forEach(element => {
        if(element > maxNum){
            maxNum = element;
        }
    });
    return maxNum;
  }

  let array = [1,2,3,4,5,6,7];
    console.log(findMax(array));
}

{
  const isPalindrome = (word) => {
    if(reverseString(word) == word){
        return true;
    }else{
        return false;
    }
  }
}

{
  const factorial = (num) => {
    let factNum = 0;
    for(let i=0; i < num; i++){
        factNum += factNum * i;
    }
    return factNum;
  }
}

{
  const sort = (numArray) => {
    return Array.sort(numArray);
  }
}

{
  const count = (numArray, num) => {
    let countNum = 0;
    numArray.forEach(element => {
        if(element == num){
            count++;
        }
    });
  return countNum;
}
}

{
  const isAnagram = (word1, word2) => {
    if(word1 == reverseString(word2) || reverseString(word1) == word2){
        return true;
    }
    return false;
  }
}

{
  const findLongestWord = (words) => {
    let longestWord = '';
    let wordsArray = words.split('');
    wordsArray.forEach(element => {
        if(element > longestWord){
            longestWord = element;
        }
    })
    return longestWord;
  }
}

{
  const merge = (array1, array2) => {
    let merged = [array1, array2];
    return merged;
  }
}

{
  const learners = [
    { name: "Alice", age: 21 },
    { name: "Bob", age: 19 },
    { name: "Charlie", age: 20 },
  ];

  const learnersName = learners.map((learner) => learner.name);
  const learnersAge = learners.map((learner) => learner.age);

  for(let i = 0; i < learnersName.length; i++){
    console.log(`${learnersName[i]} is ${learnersAge[i]} years old`);
  }
  
}

{
  //  Write your solution for question 12 here
}

{
  //  Write your solution for question 13 here
}

{
  //  Write your solution for question 14 here
}

{
  //  Write your solution for question 15 here
}

{
  //  Write your solution for question 16 here
}

{
  //  Write your solution for question 17 here
}

{
  //  Write your solution for question 18 here
}

{
  //  Write your solution for question 19 here
}

{
  //  Write your solution for question 20 here
}