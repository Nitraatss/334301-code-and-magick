'use strict';

(function () {
  // создание шаблона 1 волшебника
  var createTemplate = function (singleWizzard) {
    var similarWizardTemplate = window.setup.createDOM(document, '#similar-wizard-template').content;
    var wizard = similarWizardTemplate.cloneNode(true);
    window.setup.createDOM(wizard, '.wizard-coat').style.fill = singleWizzard.colorCoat;
    window.setup.createDOM(wizard, '.wizard-eyes').style.fill = singleWizzard.colorEyes;
    window.setup.createDOM(wizard, '.setup-similar-label').textContent = singleWizzard.name;

    return (wizard);
  };

  // создание DOM элементов
  var setupSimilar = window.setup.createDOM(document, '.setup-similar');
  var similarWizardElement = window.setup.createDOM(document, '.setup-similar-list');

  // отображение 4-х волшебников
  window.render = function (data) {
    // очистка от старых детей
    while (similarWizardElement.firstChild) {
      similarWizardElement.removeChild(similarWizardElement.firstChild);
    }

    // создание элементов  волшебников
    var fragment = document.createDocumentFragment();
    // отображение 4 волшебников
    for (var k = 0; k < 4; k++) {
      fragment.appendChild(createTemplate(data[k]));
    }

    similarWizardElement.appendChild(fragment);
    setupSimilar.classList.remove('hidden');
  };
})();
