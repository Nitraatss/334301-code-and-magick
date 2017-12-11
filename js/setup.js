'use strict';

(function () {
  window.setup = {
    // Возвращает случайное число между min (включительно) и max (не включая max)
    getRandomArbitrary: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    // создание DOM элемента
    createDOM: function (father, elementName) {
      return (father.querySelector(elementName));
    },

    setupMenu: function () {
      return (window.setup.createDOM(document, '.setup'));
    },

    // изменение наполнение элемента
    fillElement: function (element, fillColor) {
      element.style.fill = fillColor;
    },

    // изменение наполнение элемента
    changeBackgroundElement: function (element, backgroundColor) {
      element.style.backgroundColor = backgroundColor;
    },

    // переопределние цвета и вызов функции смены наполнения или фона
    colorizeElement: function (target, possibleColors, changeTargetColor) {
      var newColor = possibleColors[window.setup.getRandomArbitrary(0, possibleColors.length)];
      if (typeof changeTargetColor === 'function') {
        changeTargetColor(target, newColor);
      }
    },

    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13

  };

  // отображение меню
  var showSetupMenu = function () {
    (window.setup.setupMenu)().classList.remove('hidden');
  };

  // скрытие меню
  var hideSetupMenu = function () {
    window.setup.setupMenu().style.left = basicCoordX;
    window.setup.setupMenu().style.top = basicCoordY;
    (window.setup.setupMenu)().classList.add('hidden');
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


  var setupOpen = window.setup.createDOM(document, '.setup-open');
  var setupClose = window.setup.createDOM((window.setup.setupMenu)(), '.setup-close');
  var setupUserName = window.setup.createDOM((window.setup.setupMenu)(), '.setup-user-name');
  var setupShop = window.setup.createDOM((window.setup.setupMenu)(), '.setup-artifacts-shop');
  var setupArtifacts = window.setup.createDOM((window.setup.setupMenu)(), '.setup-artifacts');

  // базовая позиция меню
  var basicCoordX = window.setup.setupMenu().style.left;
  var basicCoordY = window.setup.setupMenu().style.top;

  // отображение меню по нажатию на иконку
  setupOpen.addEventListener('click', function () {
    showSetupMenu();
  }
  );

  // отображение меню по нажатию на Enter при выборе иконки
  setupOpen.addEventListener('keydown', function (event) {
    if (event.keyCode === window.setup.ENTER_KEYCODE) {
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
    if (event.keyCode === window.setup.ENTER_KEYCODE) {
      hideSetupMenu();
    }
  }
  );

  // скрытие меню при нажатии Esc, но не при выбранном поле ввода
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === window.setup.ESC_KEYCODE && event.target.name !== 'username') {
      hideSetupMenu();
    }
  }
  );

  // отображение информации об ошибках при вводе имени
  setupUserName.addEventListener('invalid', onInputErrors);

  var draggedItem = null;

  // начинаем перетаскивание из магазина 
  setupShop.addEventListener('dragstart', function (dstart) {
    if (dstart.target.tagName === 'IMG') {
      draggedItem = dstart.target;
      dstart.dataTransfer.setData('text/plain', dstart.target.alt);

      setupArtifacts.style.outline = '2px dashed red';
    }
  });

  //  разрешаем перетаскивание в поле арртефактов
  setupArtifacts.addEventListener('dragover', function (dover) {
    dover.preventDefault();
    return false;
  });

  // сброс элемента
  setupArtifacts.addEventListener('drop', function (ddrop) {
    ddrop.target.style.backgroundColor = '';
    setupArtifacts.style.outline = '';

    // добавлем елемент и проверяем на заполненность ячейку
    if (ddrop.target.childElementCount < 1 && ddrop.target.nodeName !== 'IMG') {
      ddrop.target.appendChild(draggedItem.cloneNode(true));
    }

    ddrop.preventDefault();
  });

  //  при наведении меняем рамку
  setupArtifacts.addEventListener('dragenter', function (ddenter) {
    ddenter.target.style.backgroundColor = 'yellow';
    ddenter.preventDefault();
  });

  //  ушли с элемента
  setupArtifacts.addEventListener('dragleave', function (dleave) {
    dleave.target.style.backgroundColor = '';
    dleave.preventDefault();
  });

})();
