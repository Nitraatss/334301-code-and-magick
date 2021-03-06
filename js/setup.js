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

    // поле с информацией об ошибке
    showError: function (errorMessage) {
      var node = document.createElement('canvas');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.width = 500;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);

      var ctx = node.getContext('2d');

      // Текст сообщения
      ctx.fillStyle = 'white';
      ctx.font = '16px PT Mono';
      ctx.textBaseline = 'hanging';
      ctx.fillText(errorMessage, 40, 50);
    },

    // ранг по имени если попались два одинаковых ранга
    sortByName: function (leftName, rightName) {
      if (leftName > rightName) {
        return 1;
      } else if (leftName < rightName) {
        return -1;
      } else {
        return 0;
      }
    },

    // вычисление ранга схожести для волшебников
    rankWizardsParams: function (singleWizard, playerCoat, playerEyes) {
      var rank = 0;

      if (singleWizard.colorCoat === playerCoat) {
        rank = rank + 2;
      }

      if (singleWizard.colorEyes === playerEyes) {
        rank = rank + 1;
      }

      return rank;
    },

    // обновление схожих волшебников
    updateSimilar: function (data, playerCoat, playerEyes) {
      var newData = data.sort(function (left, right) {
        var rankDifference = window.setup.rankWizardsParams(right, playerCoat, playerEyes) - window.setup.rankWizardsParams(left, playerCoat, playerEyes);
        if (rankDifference === 0) {
          rankDifference = window.setup.sortByName(left.name, right.name);
        }
        return rankDifference;
      });

      window.render(newData);
    },

    debounce: function (pauseFunc, pauseTime) {
      var timeout;
      if (timeout) {
        window.clearTimeout(timeout);
      } else {
        timeout = window.setTimeout(pauseFunc, pauseTime);
      }
    },

    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

  };

  // базовые данные об игроке
  window.playerCoatColor = 'rgb(101, 137, 164)';
  window.playerEyesColor = 'black';

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
  var submitButton = window.setup.createDOM((window.setup.setupMenu)(), '.setup-submit');
  var formPlayer = window.setup.createDOM((window.setup.setupMenu)(), '.setup-wizard-form');

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

  // разрешаем перетаскивание в поле арртефактов
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

  // при наведении меняем рамку
  setupArtifacts.addEventListener('dragenter', function (ddenter) {
    ddenter.target.style.backgroundColor = 'yellow';
    ddenter.preventDefault();
  });

  // ушли с элемента
  setupArtifacts.addEventListener('dragleave', function (dleave) {
    dleave.target.style.backgroundColor = '';
    dleave.preventDefault();
  });

  // отправка данных
  submitButton.addEventListener('click', function (sendData) {
    window.backend.save(new FormData(formPlayer),
        // функция срабатывает при успешной отправке и прячет форму
        function () {
          hideSetupMenu();
        },
        // функция информирует об ошибке
        function (errorInfo) {
          hideSetupMenu();
          // отображение ошибки
          window.setup.showError(errorInfo);
        }
    );

    sendData.preventDefault();
  });

})();
