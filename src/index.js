import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


$(document).ready(function () {
  let audio1 = new Audio('./src/assets/sound/spell.wav');
  const manaBtn = $('button.mana'), //gets button for mana from html
    reset = $('button.reset'), // gets html reset button
    manaBarOne = $('.mana-bar'),
    manaBar = manaBarOne.find('.bar-2-div'),
    manaHit = manaBarOne.find('.mana-point'),
    manaDamage = Math.floor(Math.random() * 25) + 1; //random generator replace with plugin that calculates mp drain 1-25 replace 25 for new max
  const hitBtn = $('button.damage'),
    healthBarOne = $('.health-bar'),
    bar = healthBarOne.find('.bar-div'),
    hit = healthBarOne.find('.hit-point'),
    enemyDamage = Math.floor(Math.random() * 25) + 1; //random generator replace with plugin that calculates hp damage 1-25 replace 25 for new max
  hitBtn.on("click", function () {
    const total = healthBarOne.data('total'),
      value = healthBarOne.data('value');
    if (value < 0) {
      log2("you dead, reset");
      return;
    }
    // max damage is based of enemyDamage
    const damage = enemyDamage;
    const newHpValue = value - damage;
    // calculate percent of total width
    const barWidth = (newHpValue / total) * 100;
    const hitWidth = (damage / value) * 100 + "%";
    //adjust hp bar and sets width
    hit.css('width', hitWidth);
    healthBarOne.data('value', newHpValue);

    //affects speed of bar
    setTimeout(function () {
      hit.css({ 'width': '0' });
      bar.css('width', barWidth + "%");
    }, 100);

    //logs calculation dat
    log2(value, damage, hitWidth);

    if (value < 0) {
      log2("DEAD");
    }
  });
  //mostly same as above but using mana and blue css coloring
  manaBtn.on("click", function () {
    audio1.play();
    const manaTotal = manaBarOne.data('total'),
      manaValue = manaBarOne.data('value');
    if (manaValue < 0) {
      log("No magic, reset");
      return;
    }
    const manaDrain = manaDamage;
    const newManaValue = manaValue - manaDrain;
    const manaBarWidth = (newManaValue / manaTotal) * 100;
    const manaHitWidth = (manaDrain / manaValue) * 100 + "%";
    manaHit.css('width', manaHitWidth);
    manaBarOne.data('value', newManaValue);
    setTimeout(function () {
      manaHit.css({ 'width': '0' });
      manaBar.css('width', manaBarWidth + "%");
    }, 100);
    log(manaValue, manaDrain, manaHitWidth);

    if (manaValue < 0) {
      log("ManaBurn");
    }
  });
  reset.on('click', function () {
    manaBarOne.data('value', manaBarOne.data('total'));
    manaHit.css({ 'width': '0' });
    manaBar.css('width', '100%');
    log("reset mana to 100");
    healthBarOne.data('value', healthBarOne.data('total'));
    hit.css({ 'width': '0' });
    bar.css('width', '100%');
    log2("reset health to 100");
  });
});

// logs mana bar and drain info

function log(_manaTotal, _manaDrain, _manaHitWidth) {
  const log = $('.log');
  if (_manaDrain !== undefined && _manaHitWidth !== undefined) {
    log.append("<div>H:" + _manaTotal + " D:" + _manaDrain + " W:" + _manaHitWidth + " = " + (_manaTotal - _manaDrain) + "</div>");
  } else {
    log.append("<div>" + _manaTotal + "</div>");
  }
}
// logs hp bar and damage info
function log2(_total, _damage, _hitWidth) {
  const log = $('.log-2');
  if (_damage !== undefined && _hitWidth !== undefined) {
    log.append("<div>H:" + _total + " D:" + _damage + " W:" + _hitWidth + " = " + (_total - _damage) + "</div>");
  } else {
    log.append("<div>" + _total + "</div>");
  }
}