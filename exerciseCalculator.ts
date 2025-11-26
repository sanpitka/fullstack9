interface Result {
    days: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
}

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
}

console.log(calculateExercises([1.5, 0, 2, 3, 0, 3, 1], 1.5));