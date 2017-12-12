'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var loadXHR = new XMLHttpRequest();
      var loadURL = 'https://1510.dump.academy/code-and-magick/data';

      loadXHR.responseType = 'json';

      loadXHR.addEventListener('load', function () {
        if (loadXHR.status === 200) {
          onLoad(loadXHR.response);
        } else {
          onError('Неизвестный статус ' + loadXHR.status + ' ' + loadXHR.statusText);
        }
      });

      loadXHR.addEventListener('error', function () {
        onError('Ошибка соединения');
      });

      loadXHR.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + loadXHR.timeout + 'мс');
      });

      loadXHR.timeout = 100000;
      loadXHR.open('GET', loadURL);
      loadXHR.send();
    },

    // сохранение данных на сервер
    save: function (newData, onLoad, onError) {
      var saveXHR = new XMLHttpRequest();
      var saveURL = 'https://1510.dump.academy/code-and-magick';

      saveXHR.addEventListener('load', function () {
        if (saveXHR.status === 200) {
          onLoad(saveXHR.response);
        } else {
          onError('Неизвестный статус ' + saveXHR.status + ' ' + saveXHR.statusText);
        }
      });

      saveXHR.addEventListener('error', function () {
        onError('Ошибка соединения');
      });

      saveXHR.open('POST', saveURL);
      saveXHR.send(JSON.stringify(newData));
    }
  };


})();
