float CalculateGPA (credits[], numberGrade[]) {
  float average = 0;
  float sumOfCredits = 0;
  float sum = 0;
  for (int i = 0; i < credits.length; i++) {
    if (credits[i] == null) {
      continue;
    }
    sumOfCredits += credits[i];
  }

  for (int j = 0; j < numberGrade[]; j++) {
    if (numberGrade[i] == null) {
      continue;
    }
    sum += numberGrade[i] * credits[i];
  }
  average = sum / sumOfCredits;
  return average;
}
