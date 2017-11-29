'use strict';

// Возвращает случайное число между min (включительно) и max (не включая max)
var getRandomArbitrary = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// создание DOM элемента
var createDOM = function (father, elementName) {
  return (father.querySelector(elementName));
};

// Возвращает массив из 4 js объектов
var generateSimilarWizardsParam = function generateSimilarWizardsParam(names, lastNames, coatColors, eyesColors) {
  var similarCharacters = [];

  for (var i = 0; i < 4; i++) {
    var namesID = getRandomArbitrary(0, names.length);
    var name = names[namesID];

    var lastNamesID = getRandomArbitrary(0, lastNames.length);
    var lastName = lastNames[lastNamesID];

    var coatColorID = getRandomArbitrary(0, coatColors.length);
    var coatColor = coatColorsArr[coatColorID];

    var eyeColorID = getRandomArbitrary(0, eyesColors.length);
    var eyeColor = eyesColorsArr[eyeColorID];

    similarCharacters[i] = {
      wizName: name,
      wizLastName: lastName,
      coatColor: coatColor,
      eyeColor: eyeColor
    };
  }

  return similarCharacters;
};

// создание одного элемента по шаблону
var creatTemplate = function creatTemplate(data) {
  var wizard = similazrWizardTemplate.cloneNode(true);
  createDOM(wizard, '.wizard-coat').style.fill = data.coatColor;
  createDOM(wizard, '.wizard-eyes').style.fill = data.eyeColor;
  createDOM(wizard, '.setup-similar-label').textContent = data.wizName + ' ' + data.wizLastName;

  return (wizard);
};

// отображение меню
var showSetupMenu = function () {
  setupMenu.classList.remove('hidden');
};

// скрытие меню
var hideSetupMenu = function () {
  setupMenu.classList.add('hidden');
};

// определение ошибок при вводе имени
var onInputErrors = function () {
  if (setupUserName.validity.tooLong) {
    setupUserName.setCustomValidity('Имя не должно превышать 25 символов');
  } else if (setupUserName.validity.tooShort) {
    setupUserName.setCustomValidity('Имя должно быть больше 1 символа');
  } else if (setupUserName.validity.valueMissing) {
    setupUserName.setCustomValidity('Заполните поле');
  } else {
    setupUserName.setCustomValidity('');
  }
};

// смена цвета плаща
var onWizardCoatClick = function (event) {
  var target = event.target;
  var coatColorID = getRandomArbitrary(0, coatColorsArr.length);
  target.style.fill = coatColorsArr[coatColorID];
};

// смена цвета глаз
var onWizardEyesClick = function (event) {
  var target = event.target;
  var eyeColorID = getRandomArbitrary(0, eyesColorsArr.length);
  target.style.fill = eyesColorsArr[eyeColorID];
};

// изменение цвета фаербола
var onFireballClick = function (event) {
  var target = event.target;
  var fireballID = getRandomArbitrary(0, fireballColors.length);
  target.style.backgroundColor = fireballColors[fireballID];
};

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// параметры магов
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = 'rgb(101, 137, 164); rgb(241, 43, 107); rgb(146, 100, 161); rgb(56, 159, 117); rgb(215, 210, 55); rgb(0, 0, 0)';
var eyesColors = 'black red blue yellow green';
var coatColorsArr = coatColors.split('; ');
var eyesColorsArr = eyesColors.split(' ');

// цвета фаербола
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// создание магов
var similarWizards = generateSimilarWizardsParam(names, lastNames, coatColorsArr, eyesColorsArr);

// создание DOM элементов
var setupMenu = createDOM(document, '.setup');
var setupSimilar = createDOM(document, '.setup-similar');
var similarWizardElement = createDOM(document, '.setup-similar-list');
var setupOpen = createDOM(document, '.setup-open');
var setupClose = createDOM(setupMenu, '.setup-close');
var setupUserName = createDOM(setupMenu, '.setup-user-name');
var setupWizard = createDOM(document, '.setup-wizard');
var wizardCoat = createDOM(setupWizard, '.wizard-coat');
var wizardEyes = createDOM(setupWizard, '.wizard-eyes');
var setupFireballWrap = createDOM(setupMenu, '.setup-fireball-wrap');
var similazrWizardTemplate = createDOM(document, '#similar-wizard-template').content;

// создание элементов случайных волшебников
var fragment = document.createDocumentFragment();
for (var k = 0; k < 4; k++) {
  fragment.appendChild(creatTemplate(similarWizards[k]));
}

similarWizardElement.appendChild(fragment);
setupSimilar.classList.remove('hidden');

// отображение меню по нажатию на иконку
setupOpen.addEventListener('click', function () {
  showSetupMenu();
}
);

// отображение меню по нажатию на Enter при выборе иконки
setupOpen.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    showSetupMenu();
  }
}
);

// скрытие меню по клику на крестик
setupClose.addEventListener('click', function () {
  hideSetupMenu();
}
);

// скрытие меню по нажатию Enter при выборе крестика
setupClose.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    hideSetupMenu();
  }
}
);

// скрытие меню при нажатии Esc, но не при выбранном поле ввода
document.addEventListener('keydown', function (event) {
  if (event.keyCode === ESC_KEYCODE && event.target.name !== 'username') {
    hideSetupMenu();
  }
}
);

// отображение информации об ошибках при вводе имени
setupUserName.addEventListener('invalid', onInputErrors);

// смена цвета плаща по клику
wizardCoat.addEventListener('click', onWizardCoatClick);

// изменение цвета глаз по клику
wizardEyes.addEventListener('click', onWizardEyesClick);

// изменение цвета фаербола по клику
setupFireballWrap.addEventListener('click', onFireballClick);
