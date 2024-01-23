function update() {
  let plus_dice = document.getElementById("plus_dice").value;
  let minus_dice = document.getElementById("minus_dice").value;
  let modifier = document.getElementById("modifier").value;
  let odds = calculate_odds(plus_dice,minus_dice);
  let modified_odds = modify(odds, modifier);

  let action = action_odds(modified_odds);
  document.getElementById("action_fail").innerText = action['Failure'];

  str = JSON.stringify(injury_odds(modified_odds), null, 4);
  document.getElementById("injury").innerText = str;
  str = JSON.stringify(modified_odds, null, 4);
  document.getElementById("scores").innerText = str;
}

document.addEventListener("DOMContentLoaded", update, false);
var calculate_button = document.getElementById('calculate_button');
calculate_button.addEventListener("click", update, false);
