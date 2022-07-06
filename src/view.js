import $ from 'jquery';

const canvas = $('#canvas')[0];
const canvasContainer = $('#canvas-container')

//text properties box
const textField = $('#text-field');
const textSize = $('#particles-size-slider');
const textPosX = $('#particles-posX-slider');
const textPosY = $('#particles-posY-slider');
const textColor = $('#particle-color-picker');

//distortion box
const distRadius = $('#distortion-radius-slider');
const distSpeed = $('#distortion-speed-slider');
const distRetain = $('#retain-speed-slider');
const distColorCheckbox = $('#distortion-color-checkbox');
const distColor = $('#distortion-color-picker');

//trails box
const showTrails = $('#trails-checkbox');
const trailsAmount = $('#trails-amount-slider');

//vectors box
const showVectors = $('#vectors-checkbox');
const vectorsAmount = $('#vectors-amount-slider');

//glow box
const showGlow = $('#glow-checkbox');
const glowAmount = $('#glow-amount-slider');

//show/hide controls box buttons
const showControlsBtn = $('#show-controls-button');
const hideControlsBtn = $('#hide-controls-button');

let canvasWidth = canvasContainer.width();
let canvasHeight = canvasContainer.height();

canvas.width = canvasWidth;
canvas.height = canvasHeight;
let ctx = canvas.getContext('2d');

//resize canvas size
const resizeCanvas = () => {
    canvasWidth = canvasContainer.width();
    canvasHeight = canvasContainer.height();
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}
//recalculate canvas size on window resize and show/hide controls
export const restart = (handler) => {

    $(window).resize(function () {
        ctx = canvas.getContext("2d");
        resizeCanvas();
        handler();
    });

    hideControlsBtn.click(() => {
        $('#controller-container').hide();
        showControlsBtn.show();
        resizeCanvas();
    })

    showControlsBtn.click(() => {
        $('#controller-container').show();
        showControlsBtn.hide();
        resizeCanvas();
    });
}
export const setDefault = (handler) => {
    const textSizeVal = +textSize.val();
    const textPosXVal = +textPosX.val();
    const textPosYVal = +textPosY.val();
    const textColorVal = textColor.val();

    const distRadiusVal = +distRadius.val();
    const distSpeedVal = +distSpeed.val();
    const distRetainVal = +distRetain.val();
    const distColorVal = distColor.val();

    const trailAmountVal = +trailsAmount.val();
    const vectorsAmountVal = +vectorsAmount.val();
    const glowAmountVal = +glowAmount.val();

    handler({
        textSizeVal,
        textPosXVal,
        textPosYVal,
        textColorVal,
        distRadiusVal,
        distSpeedVal,
        distRetainVal,
        distColorVal,
        trailAmountVal,
        vectorsAmountVal,
        glowAmountVal
    });
}

//canvas listeners
export const canvasMouseMove = (handler) => $(canvas).mousemove(handler);

//text properties listeners
export const textFieldHandler = (handler) => textField.on('input', handler);
export const textSizeHandler = (handler) => textSize.on('input', handler);
export const textPosXHandler = (handler) => textPosX.on('input', handler);
export const textPosYHandler = (handler) => textPosY.on('input', handler);
export const textColorHandler = (handler) => textColor.on('input', handler);

//distortion listeners
export const distRadiusHandler = (handler) => distRadius.on('input', handler);
export const distSpeedHandler = (handler) => distSpeed.on('input', handler);
export const distRetainHandler = (handler) => distRetain.on('input', handler);
export const distColorHandler = (handler) => distColorCheckbox.on('change', (e) => {
    if (e.target.checked) $('#distortion-color-box').removeClass('disable'); else $('#distortion-color-box').addClass('disable')
    handler(e.target.checked);
});
export const distColorPickerHandler = (handler) => distColor.on('input', handler);

//trails listeners
export const showTrailsHandler = (handler) => showTrails.on('change', (e) => {
    if (e.target.checked) $('#trails-amount-box').removeClass('disable'); else $('#trails-amount-box').addClass('disable')
    handler(e.target.checked);
});
export const trailsAmountHandler = (handler) => trailsAmount.on('input', handler);

//vectors listeners
export const showVectorsHandler = (handler) => showVectors.on('change', (e) => {
    if (e.target.checked) $('#vectors-amount-box').removeClass('disable'); else $('#vectors-amount-box').addClass('disable')
    handler(e.target.checked);
});
export const vectorsAmountHandler = (handler) => vectorsAmount.on('input', handler);

//glow listeners
export const showGlowHandler = (handler) => showGlow.on('change', (e) => {
    if (e.target.checked) $('#glow-amount-box').removeClass('disable'); else $('#glow-amount-box').addClass('disable')
    handler(e.target.checked);
});
export const glowAmountHandler = (handler) => glowAmount.on('input', handler);

export default ctx;
export {canvasWidth, canvasHeight};