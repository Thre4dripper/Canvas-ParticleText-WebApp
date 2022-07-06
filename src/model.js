const state = {
    particles: [],
    textData: [],
    mouseEvent: {
        x: null, y: null, radius: null
    },
    text: 'TEXT',
    textSize: undefined,
    textPosX: undefined,
    textPosY: undefined,
    textColor: undefined,
    distSpeed: undefined,
    distRetain: undefined,
    showDistColor: false,
    distColor: 'yellow',
    showTrails: false,
    trailsAmount: undefined,
    showVectors: false,
    vectorsAmount: undefined,
    showGlow: false,
    glowAmount: undefined,
}

export const resetParticles = () => state.particles = [];
export const setTextData = (textData) => state.textData = textData;

export const setDefaultValues = (val) => {
    state.textSize = val.textSizeVal;
    state.textPosX = val.textPosXVal;
    state.textPosY = val.textPosYVal;
    state.textColor = val.textColorVal;

    state.mouseEvent.radius = val.distRadiusVal;
    state.distSpeed = val.distSpeedVal;
    state.distRetain = val.distRetainVal;
    state.distColor = val.distColorVal;

    state.trailsAmount = val.trailAmountVal;
    state.vectorsAmount = val.vectorsAmountVal;
    state.glowAmount = val.glowAmountVal;
}

export const setText = (val) => state.text = val;
export const setTextSize = (val) => state.textSize = val;
export const setTextPosX = (val) => state.textPosX = val;
export const setTextPosY = (val) => state.textPosY = val;
export const setTextColor = (val) => state.textColor = val;

export const setDistRadius = (val) => state.mouseEvent.radius = val;
export const setDistSpeed = (val) => state.distSpeed = val;
export const setDistRetain = (val) => state.distRetain = val;
export const setShowDistColor = (val) => state.showDistColor = val;
export const setDistColor = (val) => state.distColor = val;

export const setShowTrails = (val) => state.showTrails = val;
export const setTrailsAmount = (val) => state.trailsAmount = val;

export const setShowVectors = (val) => state.showVectors = val;
export const setVectorsAmount = (val) => state.vectorsAmount = val;

export const setShowGlow = (val) => state.showGlow = val;
export const setGlowAmount = (val) => state.glowAmount = val;

export default state;