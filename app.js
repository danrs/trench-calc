function asPercent(dec) {
	return dec.toFixed(2) * parseInt(100, 10) + '%';
}

function update() {
  let plus_dice = document.getElementById("plus_dice").value;
  let minus_dice = document.getElementById("minus_dice").value;
  let modifier = document.getElementById("modifier").value;
  let odds = calculate_odds(plus_dice,minus_dice);
  let modified_odds = modify(odds, modifier);

  let action = action_odds(modified_odds);
  document.getElementById("action_fail").innerText = asPercent(action['Failure']);
  document.getElementById("action_success").innerText = asPercent(action['Success']);
  document.getElementById("action_crit").innerText = asPercent(action['Critical Success']);

  let injury = injury_odds(modified_odds);
  document.getElementById("injury_no_effect").innerText = asPercent(action['No Effect']);
  document.getElementById("injury_minor").innerText = asPercent(action['Minor Hit']);
  document.getElementById("injury_down").innerText = asPercent(action['Down']);
  document.getElementById("injury_ooa").innerText = asPercent(action['Out of Action']);

  for (let row of document.getElementById("score_table").rows) {
    let prob = modified_odds[row.cells[0].innerText];
    row.cells[1].innerText = asPercent(prob);
  }

}

document.addEventListener("DOMContentLoaded", update, false);
var calculate_button = document.getElementById('calculate_button');
calculate_button.addEventListener("click", update, false);
