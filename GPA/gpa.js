function converter(letterG, type){
  let numberG;
  if(type == 9){
    switch (letterG) {
      case "A+":
        numberG = 9;
        break;
      case "A":
        numberG = 8;
        break;
      case "B+":
        numberG = 7;
        break;
      case "B":
        numberG = 6;
        break;
      case "C+":
        numberG = 5;
        break;
      case "C":
        numberG = 4;
        break;
      case "D+":
        numberG = 3;
        break;
      case "D":
        numberG = 2;
        break;
      case "E":
        numberG = 1;
        break;
      case "F":
        numberG = 0;
        break;
    }
  }
  else if (type == 4){
    switch (letterG) {
    case "A+":
      numberG = 4;
      break;
    case "A":
      numberG = 4;
      break;
    case "A-":
      numberG = 3.7;
      break;
    case "B+":
      numberG = 3.3;
      break;
    case "B":
      numberG = 3;
      break;
    case "B-":
      numberG = 2.7;
      break;
    case "C+":
      numberG = 2.3;
      break;
    case "C":
      numberG = 2;
      break;
    case "C-":
      numberG = 1.7;
      break;
    case "D+":
      numberG = 1.3;
      break;
    case "D":
      numberG = 1;
      break;
    case "D-":
      numberG = 0.7;
      break;
    case "E":
      numberG = 0;
      break;
    case "F":
      numberG = 0;
      break;}
  }
}
  return numberG;
}
