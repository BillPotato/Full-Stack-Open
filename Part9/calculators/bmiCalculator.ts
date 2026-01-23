interface Input {
  height: number,
  weight: number
}

const parseArguments = (argv: string[]): Input => {
  if (argv.length != 4) throw new Error("Provide height and weight as arguments");

  const height: number = Number(argv[2]);
  const weight: number = Number(argv[3]);

  if (isNaN(height) || isNaN(weight)) throw new Error("Invalid height/weight");

  return {
    height,
    weight
  }
}

const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / (height/100)**2;
    switch (true) {
        case (bmi < 18.5):
            return "Underweight";
        case (bmi < 25):
            return "Normal";
        case (bmi < 30):
            return "Overweight";
        default:
            return "Obese";
    }
};

const { height, weight } = parseArguments(process.argv);

console.log(calculateBmi(height, weight));