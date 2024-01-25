function asPercent(dec) {
	return (dec * 100).toFixed(0) + '%';
}

function increment(field, max=9) {
	field.value = Math.min(max, parseInt(field.value) + 1);
}

function decrement(field, min=-9) {
	field.value = Math.max(min, parseInt(field.value) - 1);
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
  document.getElementById("injury_no_effect").innerText = asPercent(injury['No Effect']);
  document.getElementById("injury_minor").innerText = asPercent(injury['Minor Hit']);
  document.getElementById("injury_down").innerText = asPercent(injury['Down']);
  document.getElementById("injury_ooa").innerText = asPercent(injury['Out of Action']);

  for (let row of document.getElementById("score_table").rows) {
    let row_num = row.cells[0].innerText;
    if (row_num != "Score") {
      let prob = modified_odds[row.cells[0].innerText];
      row.cells[1].innerText = asPercent(prob);
    }
  }

}

document.addEventListener("DOMContentLoaded", update, false);
var calculate_button = document.getElementById('calculate_button');
calculate_button.addEventListener("click", update, false);

document.getElementById('dec_plus_dice_button').addEventListener("click", function() {
  decrement(document.getElementById("plus_dice"));
}, false);
document.getElementById('inc_plus_dice_button').addEventListener("click", function() {
  increment(document.getElementById("plus_dice"));
}, false);

document.getElementById('dec_minus_dice_button').addEventListener("click", function() {
  decrement(document.getElementById("minus_dice"));
}, false);
document.getElementById('inc_minus_dice_button').addEventListener("click", function() {
  increment(document.getElementById("minus_dice"));
}, false);

document.getElementById('dec_modifier_button').addEventListener("click", function() {
  decrement(document.getElementById("modifier"), -12);
}, false);
document.getElementById('inc_modifier_button').addEventListener("click", function() {
  increment(document.getElementById("modifier"), 12);
}, false);
