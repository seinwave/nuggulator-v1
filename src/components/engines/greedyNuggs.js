// let sack = []; —— gotta declare this where you fire the function
let fullSack;
let counted;
let extras;
let quotient;
let remainder;

function arrCount(arr) {
  return arr.reduce(function (obj, item) {
    obj[item] = (obj[item] || 0) + 1;
    return obj;
  }, {});
}

const GreedyNuggs = (
  denoms,
  amt,
  sack,
  fullSack,
  counted,
  extras,
  quotient,
  remainder
) => {
  let lastDenom = denoms[denoms.length - 1];

  if (amt === 0) {
    counted = arrCount(sack);
    return counted;
  }

  if (amt === lastDenom) {
    sack.push(lastDenom);
    counted = arrCount(sack);
    return counted;
  }

  if (amt < denoms[0]) {
    fullSack = sack.concat(denoms[0]);
    counted = arrCount(fullSack);
    extras = denoms[0] - amt;
    return counted, extras;
  } else quotient = Math.floor(amt / lastDenom);
  remainder = amt - quotient * lastDenom;
  let i = quotient;
  while (i > 0) {
    sack.push(lastDenom);
    i--;
  }
  amt = remainder;
  if (amt < denoms[0] && amt !== 0) {
    fullSack = sack.concat(denoms[0]);
    counted = arrCount(fullSack);
    extras = denoms[0] - amt;
    return counted, extras;
  }
  denoms.pop();
  GreedyNuggs(denoms, amt, sack); // run the function again
};

export default GreedyNuggs;
