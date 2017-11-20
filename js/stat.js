window.renderStatistics = function(ctx, names, times)
{

var arrayMaxMin = {
    //поиск максимального элемента в массиве
    maxiumElementArray: function(arrayMax)
    {
        var max = arrayMax[0];
        for (i = 1; i < arrayMax.length; i++) {
            max = (arrayMax[i]>max)?arrayMax[i]:max;
        }
        return(max);
    },
    
    //поиск минимального элемента в массиве
    minimumElementArray: function(arrayMin)
    {
        var min = arrayMin[0];
        for (i = 1; i < arrayMin.length; i++) {
            min = (arrayMin[i]<min)?arrayMin[i]:min;
        }
        return(min);
    }
}

// Формируем "облако"
var cloud = function(coordinateX, coordinateY, bias, color)
{
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.moveTo(coordinateX+bias,coordinateY+bias);
    ctx.quadraticCurveTo(coordinateX+bias,coordinateY+bias,coordinateX-10+bias,coordinateY+10+bias);
    ctx.quadraticCurveTo(coordinateX-10+bias,coordinateY+260+bias,coordinateX+bias,coordinateY+270+bias);
    ctx.quadraticCurveTo(coordinateX-10+bias,coordinateY+260+bias,coordinateX+bias,coordinateY+270+bias);
    ctx.quadraticCurveTo(coordinateX+bias,coordinateY+270+bias,coordinateX+205+bias,coordinateY+260+bias);
    ctx.quadraticCurveTo(coordinateX+400+bias,coordinateY+270+bias,coordinateX+410+bias,coordinateY+260+bias);
    ctx.quadraticCurveTo(coordinateX+410+bias,coordinateY+10+bias,coordinateX+400+bias,coordinateY+bias);
    ctx.quadraticCurveTo(coordinateX+400+bias,coordinateY+bias,coordinateX+205+bias,coordinateY+10+bias);
    ctx.closePath();
    ctx.fill();
}

//отображаем тень облака
cloud(100, 10, 10, "rgba(0, 0, 0, 0.7)");

//отображаем облако
cloud(100, 10, 0, "#94c6fd");

//Текст сообщения
ctx.fillStyle="white";
ctx.font="16px PT Mono";
ctx.textBaseline="hanging"; 
ctx.fillText("Ура вы победили!",210,40);
ctx.fillText("Список результатов:",210,60);

//параметры гистограммы высота и ширина элементов
var gistogramHeight = 150;
var gistogramWidth = 40;
//координаты первого элемента
var gistogramCoordinateX = 140;
var gistogramCoordinateY = 230;
//расчет дистанции между элементами
var distancebtwGistogram = gistogramWidth+50;
//расчет худшего результата
var worstTime = arrayMaxMin.maxiumElementArray(times);
//расчет лучшего результата
var bestTime = arrayMaxMin.minimumElementArray(times);

//вывод гистограммы
for (var j=0; j < times.length; j++)
{
    //специальный цвет для игрока
    ctx.fillStyle = (names[j]==="Вы")?"rgba(255, 0, 0, 1)":ctx.fillStyle="#1cb34d";
    //специальный цвет для лучшего времени
    if (bestTime==times[j])
    {
        ctx.fillStyle="#ffcc00";
        if (names[j]==="Вы")
        {
            ctx.fillStyle="rgba(255, 0, 0, 1)";
        }
    }

    //расчет позиции элемента 
    var gistogramPositionX = gistogramCoordinateX+distancebtwGistogram*j;
    //расчет высоты элемента 
    var calculatedGistogramHeight = Math.floor(gistogramHeight*(times[j]/worstTime));

    //отрисовка элемента
    ctx.fillRect(gistogramPositionX, gistogramCoordinateY, gistogramWidth, -calculatedGistogramHeight);
    //отображение текста
    ctx.fillStyle="white";
    //результат
    ctx.fillText(Math.floor(times[j]), gistogramPositionX, (gistogramCoordinateY-calculatedGistogramHeight));
    //имя
    ctx.fillText(names[j],gistogramPositionX, (gistogramCoordinateY+10));
}
}
