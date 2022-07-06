import modelState from './model.js';

export default class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.initX = x;
        this.initY = y;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(ctx) {
        let dx = modelState.mouseEvent.x - this.x;
        let dy = modelState.mouseEvent.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceX = dx / distance;
        const forceY = dy / distance;
        const maxDistance = modelState.mouseEvent.radius;
        const force = (maxDistance - distance) / maxDistance;
        if (distance < modelState.mouseEvent.radius) {
            this.x -= forceX * force * modelState.distSpeed;
            this.y -= forceY * force * modelState.distSpeed;
            if (modelState.showDistColor) this.color = modelState.distColor; else this.color = modelState.textColor
            this.radius = 3;
        } else {
            this.color = modelState.textColor
            this.radius = 2;

            if (this.x !== this.initX) {
                dx = this.initX - this.x;
                this.x += dx / (31 - modelState.distRetain * 3);
            }

            if (this.y !== this.initY) {
                dy = this.initY - this.y;
                this.y += dy / (31 - modelState.distRetain * 3);
            }

            if (dx < 0.5 && dx > -0.5) this.x = this.initX;
            if (dy < 0.5 && dy > -0.5) this.y = this.initY;
        }
        this.draw(ctx);
    }
}
