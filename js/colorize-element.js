'use strict';

(function () {
  // смена цвета плаща
  var onWizardCoatClick = function (coat) {
    var target = coat.target;
    window.setup.colorizeElement(target, (window.wizards.coatColorsArr)(), window.setup.fillElement);
  };

  // смена цвета глаз
  var onWizardEyesClick = function (eyes) {
    var target = eyes.target;
    window.setup.colorizeElement(target, (window.wizards.eyesColorsArr)(), window.setup.fillElement);
  };

  // изменение цвета фаербола
  var onFireballClick = function (fireball) {
    window.setup.colorizeElement(fireball.target, fireballColors, window.setup.changeBackgroundElement);
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
})();
