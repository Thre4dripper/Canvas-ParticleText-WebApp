import ctx from './view.js';
import * as View from './view.js';
import modelState from './model.js';
import * as Model from './model.js';
import Particle from "./Particle";

View.restart(() => drawText(modelState.text));
View.setDefault((val) => Model.setDefaultValues(val));

//text properties
View.textFieldHandler((e) => {
    Model.setText(e.target.value);
    drawText(modelState.text);
});
View.textSizeHandler((e) => {
    Model.setTextSize(+e.target.value)
    drawText(modelState.text);
});
View.textPosXHandler((e) => {
    Model.setTextPosX(+e.target.value)
    drawText(modelState.text);
});
View.textPosYHandler((e) => {
    Model.setTextPosY(+e.target.value)
    drawText(modelState.text);
});
View.textColorHandler((e) => {
    Model.setTextColor(e.target.value)
    drawText(modelState.text);
});

//distortion box
View.distRadiusHandler((e) => Model.setDistRadius(+e.target.value));
View.distSpeedHandler((e) => Model.setDistSpeed(+e.target.value));
View.distRetainHandler((e) => Model.setDistRetain(+e.target.value));
View.distColorHandler((val) => Model.setShowDistColor(val));
View.distColorPickerHandler((e) => Model.setDistColor(e.target.value));

//trails box
let alpha = 1;
View.showTrailsHandler((val) => Model.setShowTrails(val));
View.trailsAmountHandler((e) => Model.setTrailsAmount(+e.target.value));

//vectors box
View.showVectorsHandler((val) => Model.setShowVectors(val));
View.vectorsAmountHandler((e) => Model.setVectorsAmount(+e.target.value));

//glow box
View.showGlowHandler((val) => Model.setShowGlow(val));
View.glowAmountHandler((e) => Model.setGlowAmount(+e.target.value));

function drawText(text) {
    if (text.length === 0) text = 'TEXT'
    ctx.font = "30px Arial";
    ctx.fillText(text, 0, 50);
    const data = ctx.getImageData(0, 0, 500, 100);
    Model.setTextData(data);
    Model.resetParticles();
    drawParticles();
}

drawText(modelState.text);

function drawParticles() {
    const data = modelState.textData;
    for (let i = 0; i < data.height; i++) {
        for (let j = 0; j < data.width; j++) {
            if (data.data[i * data.width * 4 + j * 4 + 3] > 0) {
                const particle = new Particle(j * modelState.textSize + modelState.textPosX * 4 - 100, i * modelState.textSize + modelState.textPosY * 4 - modelState.textSize * 22, 2, modelState.textColor);
                modelState.particles.push(particle);
            }
        }
    }
}

View.canvasMouseMove((e) => {
    modelState.mouseEvent.x = e.offsetX;
    modelState.mouseEvent.y = e.offsetY;
});

const animate = () => {
    if (modelState.showTrails) {
        ctx.fillStyle = `rgba(17, 24, 39, ${alpha})`;
        ctx.fillRect(0, 0, View.canvasWidth, View.canvasHeight);
    } else {
        ctx.clearRect(0, 0, View.canvasWidth, View.canvasHeight);
    }

    for (let i = 0; i < modelState.particles.length; i++) {
        if (modelState.showGlow) {
            ctx.shadowColor = 'white'
            ctx.shadowBlur = modelState.glowAmount * 2;
        }
        modelState.particles[i].update(ctx);
        modelState.particles.forEach(particle => {
            const dx = particle.x - modelState.particles[i].x;
            const dy = particle.y - modelState.particles[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const mx = modelState.mouseEvent.x - particle.x;
            const my = modelState.mouseEvent.y - particle.y;
            const mDistance = Math.sqrt(mx * mx + my * my);

            ctx.shadowBlur = 0;

            if (distance < (15 + modelState.vectorsAmount * 2) && modelState.showVectors) {
                if (mDistance < modelState.mouseEvent.radius && modelState.showDistColor) ctx.strokeStyle = modelState.distColor; else ctx.strokeStyle = modelState.textColor;

                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(modelState.particles[i].x, modelState.particles[i].y);
                ctx.stroke();
                ctx.closePath();
            }
        })
    }

    if (modelState.particles.every(p => p.x === p.initX) && modelState.particles.every(p => p.y === p.initY) && alpha < 1) alpha += 0.1;
    if (modelState.particles.some(p => p.x !== p.initX) || modelState.particles.some(p => p.y !== p.initY)) alpha = 1 / (modelState.trailsAmount * 2);

    requestAnimationFrame(animate);
}

animate();