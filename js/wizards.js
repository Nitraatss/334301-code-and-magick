
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
    },

    // массив для хранения данных о волшебниках
    allWizards: []
  };

  // загружаем волшебников и сохраняем их данные в отдельный массив
  var onLoad = function (data) {
    window.wizards.allWizards = data;
    window.render(data);
    window.setup.updateSimilar(window.wizards.allWizards, window.playerCoatColor, window.playerEyesColor);
  };

  // отображение формы с ошибкой
  var onError = function (errorInfo) {
    window.setup.showError(errorInfo);
  };

  // загрузка волшебников
  window.backend.load(onLoad, onError);
})();
