interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: 1 | 2 | 3,
    ratingDescription: string,
    target: number,
    average: number
}

interface ExerciseInput {
    target: number,
    record: number[]
}

const parseExerciseArguments = (argv: string[]): ExerciseInput => {
    if (argv.length <= 4) throw Error("Provide target and each day's value");

    const target: number = Number(argv[2]);
    if (isNaN(target)) throw Error("Invalid target");
    const record: number[] = argv.slice(3).map(a => {
        const val = Number(a);
        if (isNaN(val)) throw Error("Invalid day's value");
        return val;
    })

    console.log("target", target);
    console.log("record", record);

    return {
        target,
        record
    }
}

const calculateExercises = (record: number[], target: number): Result => {
    const periodLength = record.length;
    const trainingDays = record.filter(t => t > 0).length;
    const average = record.reduce((sum, val) => sum + val) / periodLength;
    const success = average >= target
    const rating: Result["rating"] = average < target ? 1
                                    : average < target * 2 ? 2
                                    : 3
    const ratingDescription = ["bad", "good", "amazing"][rating-1]

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

if (require.main === module) {
    const {record, target} = parseExerciseArguments(process.argv);

    console.log(calculateExercises(record, target));
}

export default calculateExercises;