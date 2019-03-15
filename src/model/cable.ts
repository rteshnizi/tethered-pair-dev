import { fabric } from 'fabric';
import { Entity } from "./entity";
import { GapTreeNode } from "../ds/gap-tree";
import Model from './model-service';

const STROKE_WIDTH = 4;
const CABLE_COLOR = "GoldenRod";

/**
 * This uses a hack for rendering a single shape
 * It goes on a loop for beginning to the end and back to the beginning again
 */
export class Cable extends Entity {
	/**
	 * @param solution Solution to R1, we obtain solution to R0 ourselves in here
	 */
	constructor(public solution: GapTreeNode) {
		super(`cable`, CABLE_COLOR, new fabric.Polygon(Cable.CreateFabricPointArray(solution), {
			fill: CABLE_COLOR,
		}), true);
	}

	/**
	 * @param solution Solution to R1
	 */
	private static CreateFabricPointArray(solution: GapTreeNode): fabric.Point[] {
		// we start from R1 and then append R0 to the other end
		let oneWay: fabric.Point[] = [Model.Instance.Robots[1].Destination!.location];
		const points: fabric.Point[] = [];
		let section: fabric.Point[];
		section = Cable.CreateFabricPointArrayForOneRobot(solution);
		oneWay = oneWay.concat(section);
		// we need to reverse R0 section before appending to the other section
		section = Cable.CreateFabricPointArrayForOneRobot(solution.parent).reverse();
		oneWay = oneWay.concat(section);
		// Now we append R0
		oneWay.push(Model.Instance.Robots[0].Destination!.location);
		for (let i = 0; i < oneWay.length; i++) {
			points.push(oneWay[i]);
		}
		for (let i = oneWay.length - 1; i >= 0; i--) {
			points.push(new fabric.Point(oneWay[i].x + STROKE_WIDTH, oneWay[i].y + STROKE_WIDTH));
		}
		return points;
	}

	private static CreateFabricPointArrayForOneRobot(solution: GapTreeNode | undefined): fabric.Point[] {
		const oneWay: fabric.Point[] = [];
		while (solution) {
			if (solution.anchor) {
				oneWay.push(solution.anchor.location);
			}
			solution = solution.parent;
			if (!solution) break;
			solution = solution.parent;
		}
		return oneWay;
	}
}