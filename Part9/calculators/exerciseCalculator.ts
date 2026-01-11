interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: 1 | 2 | 3,
    ratingDescription: string,
    target: number,
    average: number
}
const calculateExercises = (record: number[], target: number): Result => {
    const periodLength = record.length;
    const trainingDays = record.filter(t => t > 0).length;
    const average = record.reduce((sum, val) => sum + val) / periodLength;
    const success = average >= target
    const rating: Result["rating"] = average < target ? 1
                                    : average < target * 2 ? 2
                                    : 3
    const ratingDescription = ["bad", "good", "amazing"][rating]

    const res = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };

    return res;
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))