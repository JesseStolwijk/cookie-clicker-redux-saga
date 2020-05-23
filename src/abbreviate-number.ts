// https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
const SI_SYMBOL = [
  "",
  "",
  "million",
  "billion",
  "trillion",
  "quadriliion",
  "quintillion",
];

export const abbreviateNumber = (number: number): string => {
  // what tier? (determines SI symbol)
  var tier = (Math.log10(number) / 3) | 0;

  // if zero, we don't need a suffix
  if (tier <= 1) return number.toLocaleString();

  // get suffix and determine scale
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);

  // scale the number
  var scaled = number / scale;

  // format number and add suffix
  if (suffix) {
    return scaled.toFixed(1).replace(".", ",") + " " + suffix;
  } else {
    return number.toLocaleString();
  }
};
