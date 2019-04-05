import * as React from 'react';
import { BindMemberMethods } from '../utils/react';
import Model from '../model/model-service';
import * as Mui from '@material-ui/core';
import { Vertex } from '../model/vertex';
import { Cable } from '../model/cable';

class CablePickerState {
	public verts: Vertex[];
	constructor() {
		this.verts = [Model.Instance.Robots[0], Model.Instance.Robots[1]];
	}
}

export class CablePicker extends React.Component<{}, CablePickerState> {
	constructor(props: {}) {
		super(props);
		this.state = new CablePickerState();
		BindMemberMethods(CablePicker.prototype, this);
	}

	createCurrentCableElem(e: Vertex, ind: number): JSX.Element {
		return <span
			key={`current-cable-${e.name}`}
			className="cable-picker-elem"
			onMouseEnter={() => { e.select(); }}
			onMouseLeave={() => { e.deselect(); }}
			onClick={() => { this.removeVert(ind); }}>
			{e.name}
		</span>;
	}

	currentVerts(): JSX.Element {
		return <div>
		{ this.state.verts.map(this.createCurrentCableElem) }
		</div>;
	}

	getAllVertices(): JSX.Element[] {
		const elems: JSX.Element[] = [];
		Model.Instance.Vertices.forEach((e) => {
			elems.push(
				<div
					key={`cable-picker-${e.name}`}
					className="cable-picker-elem"
					onMouseEnter={() => { e.select(); }}
					onMouseLeave={() => { e.deselect(); }}
					onClick={() => { this.addVert(e); }}>
					{e.name}
				</div>
			);
		});
		return elems;
	}

	addVert(v: Vertex): void {
		const verts = this.state.verts;
		verts.splice(verts.length - 1, 0, v);
		this.setState({ verts });
	}

	removeVert(ind: number): void {
		const verts = this.state.verts;
		if (ind === 0 || ind === verts.length - 1) return;
		verts.splice(ind, 1);
		this.setState({ verts });
	}

	componentDidUpdate(prevProps: {}, prevState: CablePickerState): void {
		if (Model.Instance.CablePath) Model.Instance.CablePath.remove();
		Model.Instance.CablePath = Cable.CreateFromVerts(this.state.verts);
	}

	render() {
		return (
			<div className="cable-picker">
				{this.currentVerts()}
				{this.getAllVertices()}
			</div>
		);
	}
}
