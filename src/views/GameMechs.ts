

export class Game {
	problem: { addends_x: number; addends_y: number } = { addends_x: 0, addends_y: 0 };
	message: string;

	constructor() {
		this.GenerateProblem();
		this.message = "";
	}

	GenerateProblem() {
		this.problem = {
			addends_x: this.GenerateInts(10),
			addends_y: this.GenerateInts(10)

		};
	}

	GenerateInts(max: number): number {
		return Math.floor(Math.random() * max);
	}

	GetRightAnswer(): number {
		return this.problem.addends_x + this.problem.addends_y;
	}

	GetRandAnswer(): number {
		return this.GenerateInts(20);
	}

};

