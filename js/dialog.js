'use strict';
(function () {
  var setupUser = window.setup.createDOM(document, '.upload');

  // начинаем перепещение по клику на иконку
  setupUser.addEventListener('mousedown', function (dEvent) {
    dEvent.preventDefault();

    // задаем стартовые координаты
    var startCoords = {
      X: dEvent.clientX,
      Y: dEvent.clientY,
    };

    // перемещаем  еню
    var onMouseMove = function (mEvent) {
      mEvent.preventDefault();

      // расчет смещения
      var move = {
        moveX: startCoords.X - mEvent.clientX,
        moveY: startCoords.Y - mEvent.clientY
      };

      // переопределение стартовой позиции
      startCoords = {
        X: mEvent.clientX,
        Y: mEvent.clientY
      };

      // смена позиции по мере движения
      window.setup.setupMenu().style.top = (window.setup.setupMenu().offsetTop - move.moveY) + 'px';
      window.setup.setupMenu().style.left = (window.setup.setupMenu().offsetLeft - move.moveX) + 'px';
    };

    var onMouseUp = function (uEvent) {
      uEvent.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
  );

})();

