import angular from 'angular';

import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor() {
    this.url = 'https://github.com/preboot/angular-webpack';
    this.numberG;
    this.rowLength = 5;
    this.appArr = [];
    this.values = {};
  }

  $onInit() {

  }

  range(count) {
      let output = [];
      for (let i = 0; i < count; i++) {
          output.push(i)
      }
      return output;
  }

  calcToYorkGrade(letterG, index) {
      switch (letterG.toUpperCase()) {
          case "A+":
              this.numberG = 9;
              break;
          case "A":
              this.numberG = 8;
              break;
          case "B+":
              this.numberG = 7;
              break;
          case "B":
              this.numberG = 6;
              break;
          case "C+":
              this.numberG = 5;
              break;
          case "C":
              this.numberG = 4;
              break;
          case "D+":
              this.numberG = 3;
              break;
          case "D":
              this.numberG = 2;
              break;
          case "E":
              this.numberG = 1;
              break;
          case "F":
              this.numberG = 0;
              break;
          default:
              this.numberG = null;
      }

      this.appArr[index] = this.numberG;

  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;