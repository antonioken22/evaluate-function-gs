/* GLOBAL VARIABLES */
const OPERATORS = ["+", "-", "*", "/"];
const POWER = "POWER(",
  FACTORIAL = "FACTORIAL";
// let RADIAN = true;

/* TEST THE FUNCTION: */
// EVALUATEFUNCTION("x^(2) + (8/3)*x - 20","x", 3);
// EVALUATEFUNCTION("x^(3) - 2*x -5","x", 1);
// EVALUATEFUNCTION("cos(x) - x","x", 0);
// EVALUATEFUNCTION("log(x) - 1/x", "x", 3);
// EVALUATEFUNCTION("log10(x) - 1/x", "x", 3);

/**
 * Evaluates a mathematical expression with a variable substituted by a given value.
 *
 * @param {string} expression The mathematical expression to evaluate.
 * @param {string} variable The variable character in the expression to replace.
 * @param {number} value The numeric value to substitute in place of the variable.
 * @return {number} The result of the evaluated expression.
 * @customfunction
 */
function EVALUATEFUNCTION(expression, variable, value) {
  // Splitting Every Character from 'expression' into an Array Element:
  array_expression = modifiedExpressionSplitter(expression, variable, value);

  // Joining Every Character from the Splitted 'expression':
  joined_expression = array_expression.join("");

  /* SEARCH FOR FACTORIAL AND POWER FUNCTIONS */
  let POWER_SEARCH_RESULT = search(array_expression, POWER);
  let FACTORIAL_SEARCH_RESULT = search(array_expression, FACTORIAL);

  /* GET POWER BASE */
  const BASES = powerBaseGetter(array_expression, POWER_SEARCH_RESULT);

  /* REPLACE POWER BASE WITH THE RIGHT FORMULA */
  BASES.forEach((base) => {
    let toReplace = base + POWER;
    let replacement = "Math.pow(" + base + ",";

    joined_expression = joined_expression.replace(toReplace, replacement);
  });

  /* GET FACTORIAL NUMBER */
  const NUMBERS = factorialNumberGetter(
    array_expression,
    FACTORIAL_SEARCH_RESULT
  );

  /* REPLACE FACTORIAL NUMBER WITH THE RIGHT FORMULA */
  NUMBERS.forEach((factorial) => {
    joined_expression = joined_expression.replace(
      factorial.toReplace,
      factorial.replacement
    );
  });

  /* LOG THE TEST */
  // console.log(joined_expression);
  // console.log(eval(joined_expression));

  try {
    var result = eval(joined_expression);
    return result;
  } catch (e) {
    // If evaluation fails, return the original expression
    console.error("Error evaluating expression:", e);
    return joined_expression;
  }
}

/* CUSTOM EXPRESSION SPLITTER */
function modifiedExpressionSplitter(expression, variable, value) {
  // Step 1: Replace the variable with its value
  let modifiedExpression = expression.replaceAll(variable, value);

  // Step 2: Replace trigonometric functions
  // Note: It's evaluated only in DEGREES though
  // Replace "(Math.PI/180)" to "(180/Math.PI)" for RADIANS
  modifiedExpression = modifiedExpression
    .replace(/sin\(/g, "Math.sin((Math.PI/180)*")
    .replace(/cos\(/g, "Math.cos((Math.PI/180)*")
    .replace(/tan\(/g, "Math.tan((Math.PI/180)*")
    .replace(/asin\(/g, "Math.asin((Math.PI/180)*")
    .replace(/acos\(/g, "Math.acos((Math.PI/180)*")
    .replace(/atan\(/g, "Math.atan((Math.PI/180)*");

  // Step 3: Replace logarithmic functions
  modifiedExpression = modifiedExpression
    .replace(/log\(/g, "Math.log(")
    .replace(/ln\(/g, "Math.log(")
    .replace(/log10\(/g, "Math.log10(");

  // Step 4: Replace "^(" with "POWER(" and "!" with "FACTORIAL"
  modifiedExpression = modifiedExpression
    .replace(/\^\(/g, " POWER(")
    .replace(/!/g, " FACTORIAL");

  // Splitting logic: Use a placeholder for splits
  modifiedExpression = modifiedExpression.replace(
    /([0-9]+|POWER\(| FACTORIAL|\(|\))/g,
    " $1 "
  );

  // Step 5: Split the string into an array, trimming and removing empty strings
  const elements = modifiedExpression
    .split(" ")
    .filter((element) => element.trim() !== "");

  return elements;
}

/* POWER BASE GETTER FUNCTION */
function powerBaseGetter(character, POWER_SEARCH_RESULT) {
  let powers_bases = []; // save all bases in the same array

  POWER_SEARCH_RESULT.forEach((power_index) => {
    let base = []; // current base
    let parentheses_count = 0;
    let previous_index = power_index - 1;

    while (previous_index >= 0) {
      if (character[previous_index] == "(") parentheses_count--;
      if (character[previous_index] == ")") parentheses_count++;

      let is_operator = false;
      OPERATORS.forEach((OPERATOR) => {
        if (character[previous_index] == OPERATOR) is_operator = true;
      });

      let is_power = character[previous_index] == POWER;
      if ((is_operator && parentheses_count == 0) || is_power) break;

      base.unshift(character[previous_index]);
      previous_index--;
    }

    powers_bases.push(base.join(""));
  });

  return powers_bases;
}

/* FACTORIAL NUMBER GETTER FUNCTION */
function factorialNumberGetter(character, FACTORIAL_SEARCH_RESULT) {
  let numbers = []; // save all numbers in the same array
  let factorial_sequence = 0;

  FACTORIAL_SEARCH_RESULT.forEach((factorial_index) => {
    let number = []; // current factorial number
    let next_index = factorial_index + 1;
    let next_input = character[next_index];

    if (next_input == FACTORIAL) {
      factorial_sequence += 1;
      return;
    }

    // If there was a factorial sequence, we need to get
    // the index of the very first factorial function
    let first_factorial_index = factorial_index - factorial_sequence;

    // Then to get the number right before it
    let previous_index = first_factorial_index - 1;
    let parentheses_count = 0;

    while (previous_index >= 0) {
      if (character[previous_index] == "(") parentheses_count--;
      if (character[previous_index] == ")") parentheses_count++;

      let is_operator = false;
      OPERATORS.forEach((OPERATOR) => {
        if (character[previous_index] == OPERATOR) is_operator = true;
      });

      if (is_operator && parentheses_count == 0) break;

      number.unshift(character[previous_index]);
      previous_index--;
    }

    let number_string = number.join("");
    const factorial = "factorial(",
      close_parenthesis = ")";
    let times = factorial_sequence + 1;

    let toReplace = number_string + FACTORIAL.repeat(times);
    let replacement =
      factorial.repeat(times) + number_string + close_parenthesis.repeat(times);

    numbers.push({
      toReplace: toReplace,
      replacement: replacement,
    });

    // Reset factorial_sequence
    factorial_sequence = 0;
  });

  return numbers;
}

/* SEARCH FUNCTION */
function search(array, keyword) {
  let search_result = [];
  array.forEach((element, index) => {
    if (keyword == element) search_result.push(index);
  });
  return search_result;
}

/* FACTORIAL FUNCTION */
function factorial(number) {
  if (number % 1 != 0) return gamma(number + 1);
  if (number === 0 || number === 1) return 1;

  let result = 1;
  for (let i = 1; i <= number; i++) {
    result *= i;
    if (result === Infinity) return Infinity;
  }
  return result;
}

// /* TRIGONOMETRIC FUNCTION */
// function trigo(callback, angle){
//   if(!RADIAN){
//     angle = angle * Math.PI/180;
//   }
//   return callback(angle);
// }

// /* INVERSE TRIGONOMETRIC FUNCTION*/
// function trigo(callback, value){
//   let angle = callback(value);
//
//   if(!RADIAN){
//     angle = angle * 180/Math.PI;
//   }
//
//   return angle;
// }

/* GAMMA FUNCTION */
function gamma(n) {
  // accurate to about 15 decimal places
  //some magic constants
  var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
    p = [
      0.99999999999980993, 676.5203681218851, -1259.1392167224028,
      771.32342877765313, -176.61502916214059, 12.507343278686905,
      -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
    ];
  if (n < 0.5) {
    return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
  } else {
    n--;
    var x = p[0];
    for (var i = 1; i < g + 2; i++) {
      x += p[i] / (n + i);
    }
    var t = n + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
  }
}
