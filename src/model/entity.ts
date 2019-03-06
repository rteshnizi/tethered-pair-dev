import { fabric } from 'fabric';
import Renderer from '../viewer/renderer-service';
import { DisableFabricJsMouseEvents } from '../utils/fabric';

const SELECT_COLOR = '#FF1493';
const SELECT_WIDTH = 3;

export abstract class Entity {
	private _shape: fabric.Object;
	set shape(s: fabric.Object) { this._shape = s; }
	get shape() { return this._shape; }

	private prevStrokeColor: string | undefined;
	private prevStrokeWidth?: number;

	constructor(public name: string, protected color: string, shape: fabric.Object) {
		this._shape = shape;
		this.prevStrokeColor = undefined;
		this.prevStrokeWidth = NaN; // Means it's not selected (undefined it is distinguishable from undefined)

		DisableFabricJsMouseEvents(this._shape);
		Renderer.Instance.addEntity(this);
		Renderer.Instance.render();
	}

	public isSelected(): boolean {
		return this.prevStrokeWidth === undefined || !isNaN(this.prevStrokeWidth);
	}

	/** Highlight the Entity */
	public select(): void {
		if (!this.isSelected()) {
			this.prevStrokeColor = this.shape.stroke;
			this.prevStrokeWidth = this.shape.strokeWidth;
			this.shape.set('stroke', SELECT_COLOR);
			this.shape.strokeWidth = SELECT_WIDTH;
			Renderer.Instance.render(true);
		}
	}

	public deselect(): void {
		if (this.isSelected()) {
			this.shape.set('stroke', this.prevStrokeColor);
			this.shape.strokeWidth = this.prevStrokeWidth;
			this.prevStrokeColor = undefined;
			this.prevStrokeWidth = NaN;
			Renderer.Instance.render(true);
		}
	}

	public remove(): void {
		Renderer.Instance.removeEntity(this, true);
	}
}