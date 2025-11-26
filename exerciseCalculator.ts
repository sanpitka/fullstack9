interface Result {
  days: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

const parseArgs = (args: string[]): { dailyExercises: number[]; target: number } => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const dailyExercises = args.slice(2, -1).map(Number);
  const target = Number(args[args.length - 1]);

  if (dailyExercises.some(isNaN) || isNaN(target)) {
    throw new Error("All values must be numeric");
  }
  return { dailyExercises, target };
};

const calculateExercises = (dailyExercises: number[], target: number): Result => {
  if (dailyExercises.length === 0) {
    throw new Error("Daily exercises array cannot be empty");
  }
  const days = dailyExercises.length;
  const trainingDays = dailyExercises.filter(day => day > 0).length;
  const totalHours = dailyExercises.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / days;
  const success = average >= target;
  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "Well done, you met your target!";
  } else if (average >= target * 0.8) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "Try harder next time";
  }

  return {
    days,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription
  };
};

try {
  const { dailyExercises, target } = parseArgs(process.argv);
  console.log(calculateExercises(dailyExercises, target));
} catch (error: unknown) {
  let errorMessage = 'Oops! ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}