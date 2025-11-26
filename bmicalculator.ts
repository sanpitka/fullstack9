const calculateBmi = (height: number, weight: number): string => {
  if (height === 0) {
    throw new Error("Height cannot be zero");
  }
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters ** 2);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else if (bmi >= 30) {
    return 'Obesity';
  } else {
    return 'Normal weight';
  }
}

try {
  console.log(calculateBmi(0, 80));
} catch (error: unknown) {
  let errorMessage = 'Oops! ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}