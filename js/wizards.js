'use strict';
// создание схожих магов
(function () {

  window.wizards = {
    coatColorsArr: function () {
      var coatColors = 'rgb(101, 137, 164); rgb(241, 43, 107); rgb(146, 100, 161); rgb(56, 159, 117); rgb(215, 210, 55); rgb(0, 0, 0)';
      return (coatColors.split('; '));
    },
    eyesColorsArr: function () {
      var eyesColors = 'black red blue yellow green';
      return (eyesColors.split(' '));
    }
  };

  // Возвращает массив из 4 js объектов
  /* var generateSimilarWizardsParam = function generateSimilarWizardsParam(names, lastNames, coatColors, eyesColors) {
    var similarCharacters = [];

    for (var i = 0; i < 4; i++) {
      var namesID = window.setup.getRandomArbitrary(0, names.length);
      var name = names[namesID];

      var lastNamesID = window.setup.getRandomArbitrary(0, lastNames.length);
      var lastName = lastNames[lastNamesID];

      var coatColorID = window.setup.getRandomArbitrary(0, coatColors.length);
      var coatColor = (window.wizards.coatColorsArr)()[coatColorID];

      var eyeColorID = window.setup.getRandomArbitrary(0, eyesColors.length);
      var eyeColor = (window.wizards.eyesColorsArr)()[eyeColorID];

      similarCharacters[i] = {
        wizName: name,
        wizLastName: lastName,
        coatColor: coatColor,
        eyeColor: eyeColor
      };
    }
    return similarCharacters;
  }; */

  // создание одного элемента по шаблону
  var creatTemplate = function creatTemplate(data) {
    var wizard = similazrWizardTemplate.cloneNode(true);
    window.setup.createDOM(wizard, '.wizard-coat').style.fill = data.colorCoat;
    window.setup.createDOM(wizard, '.wizard-eyes').style.fill = data.colorEyes;
    window.setup.createDOM(wizard, '.setup-similar-label').textContent = data.name;

    return (wizard);
  };

  // параметры магов
  // var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  // var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  // создание магов
  // var similarWizards = generateSimilarWizardsParam(names, lastNames, (window.wizards.coatColorsArr)(), (window.wizards.eyesColorsArr)());

  // создание DOM элементов
  var setupSimilar = window.setup.createDOM(document, '.setup-similar');
  var similarWizardElement = window.setup.createDOM(document, '.setup-similar-list');
  var similazrWizardTemplate = window.setup.createDOM(document, '#similar-wizard-template').content;

  // загрузка волшебников
  window.backend.load(
      function (wizards) {
      // создание элементов случайных волшебников
        var fragment = document.createDocumentFragment();
        // отображение 4 случайных волшебников
        for (var k = 0; k < 4; k++) {
          fragment.appendChild(creatTemplate(wizards[window.setup.getRandomArbitrary(0, wizards.length)]));
        }

        similarWizardElement.appendChild(fragment);
        setupSimilar.classList.remove('hidden');
      }
  );
})();
