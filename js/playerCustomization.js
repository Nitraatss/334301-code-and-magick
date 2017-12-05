'use strict';

(function () {
// смена цвета плаща
  var onWizardCoatClick = function (event) {
    var target = event.target;
    var coatColorID = window.setup.getRandomArbitrary(0, (window.wizards.coatColorsArr)().length);
    target.style.fill = (window.wizards.coatColorsArr)()[coatColorID];
  };

  // смена цвета глаз
  var onWizardEyesClick = function (event) {
    var target = event.target;
    var eyeColorID = window.setup.getRandomArbitrary(0, (window.wizards.eyesColorsArr)().length);
    target.style.fill = (window.wizards.eyesColorsArr)()[eyeColorID];
  };

  // изменение цвета фаербола
  var onFireballClick = function (event) {
    var target = event.target;
    var fireballID = window.setup.getRandomArbitrary(0, fireballColors.length);
    target.style.backgroundColor = fireballColors[fireballID];
  };

  // цвета фаербола
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // создание DOM элементов
  var setupWizard = window.setup.createDOM(document, '.setup-wizard');
  var wizardCoat = window.setup.createDOM(setupWizard, '.wizard-coat');
  var wizardEyes = window.setup.createDOM(setupWizard, '.wizard-eyes');
  var setupFireballWrap = window.setup.createDOM((window.setup.setupMenu)(), '.setup-fireball-wrap');

  // смена цвета плаща по клику
  wizardCoat.addEventListener('click', onWizardCoatClick);

  // изменение цвета глаз по клику
  wizardEyes.addEventListener('click', onWizardEyesClick);

  // изменение цвета фаербола по клику
  setupFireballWrap.addEventListener('click', onFireballClick);
}
)();
