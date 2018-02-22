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
    this.numberG2;
    this.rowLength = 5;
    this.appArr = [];
    this.appArr2 = [];
    this.courseGradeValues = {};
    this.courseCredit = {};
    this.GPA;

    this.numGArr = [];
  }

  range(count) {
      let output = [];
      for (let i = 0; i < count; i++) {
          output.push(i)
      }
      return output;
  }

  multCreditGrade(numGrade, credit, index) {
      if (credit !== undefined && numGrade !== undefined) {
          this.numGArr[index] = (parseFloat(credit) * parseFloat(numGrade));
      }
  }

  calculateGPA() {
      let totalcreditz = 0;

      const total = this.numGArr.reduce((total, curr) => {
          return total + curr;
      }, 0);

      Object.keys(this.courseCredit).forEach(key => {
          totalcreditz += parseFloat(this.courseCredit[key]);
      });

      this.GPA = (total / totalcreditz).toFixed(2);
  }

  calcToOtherGrade(letterG, index) {
      switch(letterG.toUpperCase()) {
          case "A+":
              this.numberG2 = 4;
              break;
          case "A":
              this.numberG2 = 4;
              break;
          case "A-":
              this.numberG2 = 3.7;
              break;
          case "B+":
              this.numberG2 = 3.3;
              break;
          case "B":
              this.numberG2 = 3;
              break;
          case "B-":
              this.numberG2 = 2.7;
              break;
          case "C+":
              this.numberG2 = 2.3;
              break;
          case "C":
              this.numberG2 = 2;
              break;
          case "C-":
              this.numberG2 = 1.7;
              break;
          case "D+":
              this.numberG2 = 1.3;
              break;
          case "D":
              this.numberG2 = 1;
              break;
          case "D-":
              this.numberG2 = 0.7;
              break;
          case "E":
              this.numberG2 = 0;
              break;
          case "F":
              this.numberG2 = 0;
              break;
          default:
              this.numberG2 = null;
      }

      this.appArr2[index] = this.numberG2;
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
      this.multCreditGrade(this.appArr[index], this.courseCredit['field'+index], index);
      this.calcToOtherGrade(letterG, index)
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;