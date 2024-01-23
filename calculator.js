const HIGH_FACE = 6;
const LOW_FACE = 1;

function sum_highest_pair(arr) {
  let first = arr[0];
  let second = arr[1];
  for (let i = 1; i < arr.length; i ++) {
    if (arr[i] > first) {
      second = first;
      first = arr[i];
    } else if (arr[i] > second)
      second = arr[i];
  }
  return (first + second);
}

function sum_lowest_pair(arr) {
  let first = arr[0];
  let second = arr[1];
  for (let i = 1; i < arr.length; i ++) {
    if (arr[i] < first) {
      second = first;
      first = arr[i];
    } else if (arr[i] < second)
      second = arr[i];
  }
  return (first + second);
}

function calc_sum_2(results, faces, die_index, sum_highest=true) {
  if(die_index < faces.length) {
    calc_sum_2(results, faces, die_index + 1, sum_highest);
  } else {
    if (sum_highest) {
      results[sum_highest_pair(faces)] += 1;
    } else {
      results[sum_lowest_pair(faces)] += 1;
    }
  }

  if(faces[die_index] < HIGH_FACE) {
    let next_faces = [...faces];
    next_faces[die_index] += 1;
    calc_sum_2(results, next_faces, die_index, sum_highest);  
  }

  return results;
}

function calculate_odds(plus_dice, minus_dice) {
  if (isNaN(plus_dice) || isNaN(minus_dice)) {
    throw new Error('plus_dice and minus_dice must be numbers');
  }
  let results = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
    7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 
  };
  let num_dice = 2 + Math.abs(parseInt(plus_dice, 10) - parseInt(minus_dice, 10));
  if (num_dice > 8) {
    let alert_text = "Error: total number of dice (${num_dice}) must not exceed 8."
    document.getElementById("input_alert").innerText = alert_text;
    throw new Error(alert_text);
  } else {
    document.getElementById("input_alert").innerText = '';
  }

  let faces = Array.from({ length: num_dice } , () => (LOW_FACE));
  let sum_highest = (plus_dice >= minus_dice);
  let odds = calc_sum_2(results, faces, 0, sum_highest);

  // apply divisor at end to reduce floating point math
  for (const [score, prob] of Object.entries(odds)) {
    odds[score] = (prob / Math.pow(HIGH_FACE, num_dice)).toFixed(3);
  }

  return odds;
}

function modify(odds, modifier=0) {
  if (isNaN(modifier)) {
    throw new Error('modifier must be a number');
  }
  if (Math.abs(modifier) > 12) {
    throw new Error('Modifier must be between -13 and 13');
  }
  if (modifier === 0) {
    return odds;
  }

  let modified_odds = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
    7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 
  };
  for (const [score, prob] of Object.entries(odds)) {
    let modified_score = parseInt(score,10)+parseInt(modifier, 10);
    modified_score = Math.min(Math.max(modified_score, 1), 12);
    modified_odds[modified_score] = prob;
  }
  return modified_odds;
}

function action_odds(odds) {
  let action_odds = {
    'Failure': 0,
    'Success': 0,
    'Critical Success': 0,
  };
  for (let i = 1; i <= 6; i++) {
    action_odds['Failure'] += odds[i];
  }
  for (let i = 7; i <= 11; i++) {
    action_odds['Success'] += odds[i];
  }
	action_odds['Critical Success'] = odds[12];
  return action_odds;
}

function injury_odds(odds) {
  let injury_odds = {
    'No Effect': 0,
    'Minor Hit': 0,
    'Down': 0,
    'Out of Action': 0,
  };
  injury_odds['No Effect'] = odds[1];
  for (let i = 2; i <= 6; i++) {
    injury_odds['Minor Hit'] += parseInt(odds[i]);
  }
  for (let i = 7; i <= 8; i++) {
    injury_odds['Down'] += parseInt(odds[i]);
  }
  for (let i = 9; i <= 12; i++) {
    injury_odds['Out of Action'] += parseInt(odds[i]);
  }
  return injury_odds;
}
