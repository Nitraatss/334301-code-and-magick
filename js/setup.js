'use strict';

// Возвращает случайное число между min (включительно) и max (не включая max)
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Возвращает массив из 4 js объектов
function generateSimilarWizardsParam(names, lastNames, coatColors, eyesColors) {
  var similarCharacters = [];
  var coatColorsArr = coatColors.split('; ');
  var eyesColorsArr = eyesColors.split(' ');

  for (var i = 0; i < 4; i++) {
    var namesID = getRandomArbitrary(0, names.length);
    var name = names[namesID];

    var lastNamesID = getRandomArbitrary(0, lastNames.length);
    var lastName = lastNames[lastNamesID];

    var coatColorID = getRandomArbitrary(0, coatColorsArr.length);
    var coatColor = coatColorsArr[coatColorID];

    var eyeColorID = getRandomArbitrary(0, eyesColorsArr.length);
    var eyeColor = eyesColorsArr[eyeColorID];

    similarCharacters[i] = {
      wizName: name,
      wizLastName: lastName,
      coatColor: coatColor,
      eyeColor: eyeColor
    };
  }

  return similarCharacters;
}

// создание DOM элемента
function createDOM(father, elementName) {
  return (father.querySelector(elementName));
}

// создание одного элемента по шаблону
function creatTemplate(data) {
  var wizard = similazrWizardTemplate.cloneNode(true);
  createDOM(wizard, '.wizard-coat').style.fill = data.coatColor;
  createDOM(wizard, '.wizard-eyes').style.fill = data.eyeColor;
  createDOM(wizard, '.setup-similar-label').textContent = data.wizName + ' ' + data.wizLastName;

  return (wizard);
}

// параметры магов
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = 'rgb(101, 137, 164); rgb(241, 43, 107); rgb(146, 100, 161); rgb(56, 159, 117); rgb(215, 210, 55); rgb(0, 0, 0)';
var eyesColors = 'black red blue yellow green';

// создание магов
var similarWizards = generateSimilarWizardsParam(names, lastNames, coatColors, eyesColors);

// создание DOM элементов
var setupMenu = createDOM(document, '.setup');
var setupSimilar = createDOM(document, '.setup-similar');
var similarWizardElement = createDOM(document, '.setup-similar-list');

var similazrWizardTemplate = createDOM(document, '#similar-wizard-template').content;

// создание элементов случайных волшебников
var fragment = document.createDocumentFragment();
for (var k = 0; k < 4; k++) {
  fragment.appendChild(creatTemplate(similarWizards[k]));
}

similarWizardElement.appendChild(fragment);

setupMenu.classList.remove('hidden');
setupSimilar.classList.remove('hidden');
