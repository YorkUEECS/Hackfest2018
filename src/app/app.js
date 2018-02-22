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
    this.courseGradeValues = {};
    this.courseCredit = {};
    this.creditArr = [];
    this.totalCredit = 0.0;
    this.sumGradeCreditProd = 0;
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
          console.log(index)
          console.log(this.numGArr[index])
      }
  }

  calculateGPA() {
      const total = this.numGArr.reduce((total, curr) => {
          return total + curr;
      }, 0);

      let totalcreditz = 0;
      Object.keys(this.courseCredit).forEach(key => {
          totalcreditz += parseFloat(this.courseCredit[key]);
      });

      this.GPA = (total / totalcreditz).toFixed(2);
  }

  addtoTotalCredit(credit) {
      this.totalCredit += parseFloat(credit);
  }

  calcToYorkGrade(letterG, index) {
      switch(letterG.toUpperCase()) {

      }
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

      console.log(this.courseCredit['field'+index])
      console.log(this.appArr[index])
      this.multCreditGrade(this.appArr[index], this.courseCredit['field'+index], index)
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;