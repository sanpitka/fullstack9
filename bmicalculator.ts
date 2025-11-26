const parseArguments = (args: Array<string>): { height: number; weight: number } => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error("Give only numeric values!");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
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
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Oops! ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}

