var config = {
    red: 30,
    yellow: 5,
    green: 45,
    get time() {
        return this.red + this.yellow + this.green;
    },
    set time(time) {
        if (time < this.red + this.yellow) {
            throw new Error('Bad value');
        }

        this.green = time - this.red - this.yellow;
    }
};

/**
 * Светофор
 *
 * @param {Object} config
 * @constructor
 */
function Lights(config) {
    // Обозначение публичных полей
    this.state = null;

    // Обозначение приватных полей
    this._timeout = null;
    this._config = config;
}

/**
 * Переключение в желтый
 */
Lights.prototype.toYellow = function () {
    if (this._timeout) {
        clearTimeout(this._timeout);
    }

    this.state = 'yellow';
    this._timeout = setTimeout(function () {
        this.toGreen();
    }.bind(this), this._config.yellow * 1000)
};

/**
 * Переключение в зеленый
 */
Lights.prototype.toGreen = function () {
    if (this._timeout) {
        clearTimeout(this._timeout);
    }

    this.state = 'green';
    this._timeout = setTimeout(function () {
        this.toRed();
    }.bind(this), this._config.green * 1000)
};

/**
 * Переключение в красный
 */
Lights.prototype.toRed = function () {
    if (this._timeout) {
        clearTimeout(this._timeout);
    }

    this.state = 'red';
    this._timeout = setTimeout(function () {
        this.toYellow();
    }.bind(this), this._config.red * 1000)
};

//function New (F, args) {
//    /*1*/  var n = {'__proto__': F.prototype};
//    /*2*/  F.apply(n, args);
//    /*3*/  return n;
//}

var lights = new Lights(config);
lights.toYellow();

setInterval(function () {
    console.log(lights.state);
}, 500);

/**
* Пешеходный светофор
*
* @param config
* @constructor
*/
function PedestrianLights (config) {
    Lights.call(this, config);
}



//function F(){}; // Подставной конструктор
//F.prototype = Lights.prototype; // Подсовываем прототип реального конструктора
//PedestrianLights.prototype = new F(); // Теперь реальный конструктор не будет выполнен
//
//
//PedestrianLights.prototype = Object.create(Lights.prototype);
//PedestrianLights.prototype.constructor = PedestrianLights;
PedestrianLights.prototype = Object.create(Lights);
PedestrianLights.prototype.toYellow = function () {
    this.toGreen();
};

var lights = new PedestrianLights(config);
lights.toYellow();

setInterval(function () {
    console.log(lights.state);
}, 500);