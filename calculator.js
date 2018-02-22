import angular from 'angular';

import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllAs: 'app'
  }
};

class AppCtrl {
  constructor() {
    this.url = 'https://github.com/preboot/angular-webpack';
    this.OMSAS;
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

 calctoOMSASgrade (letterH, index) {
   switch (letterH.toUpperCase()) {
     case "A+":
        this.OMSAS = 4.00;

       break;
    case "A":
      this.OMSAS = 3.80;
      break;
    case "B+":
      this.OMSAS = 3.30;
      break;
    case "B":
      this.OMSAS = 3.00;
      break;
    case "C+":
      this.OMSAS = 2.30;
      break;
    case "C":
      this.OMSAS = 2.00;
      break;
    case "D+":
      this.OMSAS = 1.30;
      break;
    case "D":
      this.OMSAS = 1.00;
      break;
    case "E":
      this.OMSAS = 0.00;
      break;
    case "F":
      this.OMSAS = 0.00;
      break;
     default:
      this.OMSAS = null;

   }
   this.appArr[index] = this.OSAS;
 }
 }

 const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;
