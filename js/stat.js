'use strict';

window.renderStatistics = function (ctx, names, times) {
    var findArrayMaxMin = {
    // поиск максимального элемента в массиве
    findMaxiumElementArray: function (arrayMax) {
      var max = arrayMax[0];
      for (var i = 0; i < arrayMax.length; ++i) {
        max = (arrayMax[i] > max) ? arrayMax[i] : max;
      }
      return (max);
    },

    // поиск минимального элемента в массиве
    findMinimumElementArray: function (arrayMin) {
      var min = arrayMin[0];
      for (var j = 0; j < arrayMin.length; ++j) {
        min = (arrayMin[j] < min) ? arrayMin[j] : min;
      }
      return (min);
    }
  }

  //  Формируем 'облако'
  var cloudBuild = function (coordinateX, coordinateY, bias, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(coordinateX + bias, coordinateY + bias);
    ctx.quadraticCurveTo(coordinateX + bias, coordinateY + bias, coordinateX - 10 + bias, coordinateY + 10 + bias);
    ctx.quadraticCurveTo(coordinateX - 10 + bias, coordinateY + 260 + bias, coordinateX + bias, coordinateY + 270 + bias);
    ctx.quadraticCurveTo(coordinateX - 10 + bias, coordinateY + 260 + bias, coordinateX + bias, coordinateY + 270 + bias);
    ctx.quadraticCurveTo(coordinateX + bias, coordinateY + 270 + bias, coordinateX + 205 + bias, coordinateY + 260 + bias);
    ctx.quadraticCurveTo(coordinateX + 400 + bias, coordinateY + 270 + bias, coordinateX + 410 + bias, coordinateY + 260 + bias);
    ctx.quadraticCurveTo(coordinateX + 410 + bias, coordinateY + 10 + bias, coordinateX + 400 + bias, coordinateY + bias);
    ctx.quadraticCurveTo(coordinateX + 400 + bias, coordinateY + bias, coordinateX + 205 + bias, coordinateY + 10 + bias);
    ctx.closePath();
    ctx.fill();
  }

  // отображаем тень облака
  cloudBuild(100, 10, 10, 'rgba(0, 0, 0, 0.7)');

  // отображаем облако
  cloudBuild(100, 10, 0, '#94c6fd');

  // Текст сообщения
  ctx.fillStyle = 'white';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 210, 40);
  ctx.fillText('Список результатов:', 210, 60);

  // параметры гистограммы высота и ширина элементов
  var gistogramHeight = 150;
  var gistogramWidth = 40;
  // координаты первого элемента
  var gistogramCoordinateX = 140;
  var gistogramCoordinateY = 230;
  // расчет дистанции между элементами
  var distancebtwGistogram = gistogramWidth + 50;
  // расчет худшего результата
  var worstTime = findArrayMaxMin.findMaxiumElementArray(times);
  // расчет лучшего результата
  var bestTime = findArrayMaxMin.findMinimumElementArray(times);

  // вывод гистограммы
  for (var k = 0; k < times.length; ++k) {
    // специальный цвет для игрока
    ctx.fillStyle = (names[k] === 'Вы') ? 'rgba(255, 0, 0, 1)' : ctx.fillStyle = '#1cb34d';
    // специальный цвет для лучшего времени
    if (bestTime === times[k]) {
      ctx.fillStyle = '#ffcc00';
      if (names[k] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      }
    }

    // расчет позиции элемента
    var gistogramPositionX = gistogramCoordinateX + distancebtwGistogram * k;
    // расчет высоты элемента
    var calculatedGistogramHeight = Math.floor(gistogramHeight * (times[k] / worstTime));

    // отрисовка элемента
    ctx.fillRect(gistogramPositionX, gistogramCoordinateY, gistogramWidth, -calculatedGistogramHeight);
    // отображение текста
    ctx.fillStyle = 'white';
    // результат
    ctx.fillText(Math.floor(times[k]), gistogramPositionX, (gistogramCoordinateY - calculatedGistogramHeight));
    // имя
    ctx.fillText(names[k], gistogramPositionX, (gistogramCoordinateY + 10));
  }
}
