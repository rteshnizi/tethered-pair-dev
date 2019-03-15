interface Preset {
	name: string;
	json: string;
}

const PresetUnset: Preset = {
	name: "Unset",
	json: '{"robots":["0, 0","0, 0"],"destinations":["0, 0","0, 0"],"obstacles":[],"cableLength":0}',
}

const Preset1: Preset = {
	name: "Preset 1",
	json: '{"robots":["100, 50","500, 50"],"destinations":["150, 500", "330, 520"], "obstacles":[["175, 100","225, 100","225, 150","175, 150"],["300, 200","425, 200","300, 225","425, 225"],["50, 300","50, 350","250, 300","250, 350"],["325, 400","350, 400","325, 425","350, 425"],["425, 410","400, 435","450, 435"]],"cableLength":500}',
}

const Preset2: Preset = {
	name: "Preset 2",
	json: '{"robots":["100, 50","500, 50"],"destinations":["370, 280", "270, 180"], "obstacles":[["175, 100","225, 100","225, 150","175, 150"],["300, 200","425, 200","300, 225","425, 225"],["50, 300","50, 350","250, 300","250, 350"],["325, 400","350, 400","325, 425","350, 425"],["425, 410","400, 435","450, 435"]],"cableLength":500}',
}

const Preset3: Preset = {
	name: "Preset 3",
	json: '{"robots":["100, 50","500, 50"],"destinations":["370, 280", "250, 220"], "obstacles":[["175, 100","225, 100","225, 150","175, 150"],["300, 200","425, 200","300, 225","425, 225"],["50, 300","50, 350","250, 300","250, 350"],["325, 400","350, 400","325, 425","350, 425"],["425, 410","400, 435","450, 435"]],"cableLength":500}',
}

const Preset4: Preset = {
	name: "Preset 4",
	json: '{"robots":["100, 50","305, 50"],"destinations":["150, 500", "330, 520"], "obstacles":[["175, 100","225, 100","225, 150","175, 150"],["300, 200","425, 200","300, 225","425, 225"],["50, 300","50, 350","250, 300","250, 350"],["325, 400","350, 400","325, 425","350, 425"],["425, 410","400, 435","450, 435"]],"cableLength":400}',
}

// FIXME: This seems to cause a bug in geometry.IsPointInsidePolygon(), it's the sorting of points clockwise
// Instead of sorting just test if r0->d0 crosses r1->d1 then swap d0 and d1 in the poly
// Pt(150, 500) Pt(300, 200) Pt(250, 350) Pt(330, 520)
const Preset5: Preset = {
	name: "Preset 5",
	json: '{"robots":["295, 50","505, 50"],"destinations":["150, 500", "330, 520"], "obstacles":[["175, 100","225, 100","225, 150","175, 150"],["300, 200","425, 200","300, 225","425, 225"],["50, 300","50, 350","250, 300","250, 350"],["325, 400","350, 400","325, 425","350, 425"],["425, 410","400, 435","450, 435"]],"cableLength":400}',
}

export const AllPresets = [PresetUnset, Preset1, Preset2, Preset3, Preset4, Preset5];