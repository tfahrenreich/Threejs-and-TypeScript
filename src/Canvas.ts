/**
 * Created by timfahrenreich on 11/3/16.
 */

export default class Canvas {
    static HEIGHT = 950;
    static WIDTH = 950;

    bg: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    time: number;

    constructor() {
        this.bg = <HTMLCanvasElement> document.getElementById('background');
        this.context = this.bg.getContext("2d");
        this.time = 0;
    }

    init() {
        this.animate();
    }

    animate() {
        let gradient = this.context.createRadialGradient(10, 10, 0, 10 * 0.5, 10 * 0.5, 500);
        gradient.addColorStop(0, 'rgba(0, 70, 70, 1)');
        gradient.addColorStop(1, 'rgba(0, 8, 14, 1)');

        let context = this.context;

        let cos = Math.cos,
            sin = Math.sin,
            PI = Math.PI;

        context.clearRect(0, 0, Canvas.WIDTH , Canvas.HEIGHT);
        let gradient = this.context.createRadialGradient(Canvas.WIDTH * 0.5, Canvas.HEIGHT * 0.5, 0, Canvas.WIDTH * 0.5, Canvas.HEIGHT * 0.5, 500);
        gradient.addColorStop(Math.abs(0), 'red');
        gradient.addColorStop(Math.abs(.8), 'yellow');
        gradient.addColorStop(Math.abs(1), 'aqua');

        //context.fillStyle = gradient;
        //context.fillRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);

        context.fillStyle = gradient;
        context.globalCompositeOperation = 'lighten';
        this.time += .1;

        let i = 500;

        while (i--) {
            let r = (( Canvas.WIDTH + Canvas.HEIGHT ) * ( cos(( this.time + i ) * ( .004 + ( ( sin(this.time * 0.00002) / PI ) * 6 ) )) /PI ));

            let x = sin(i) * r + (Canvas.WIDTH  / 2);
            let y = cos(i) * r + (Canvas.HEIGHT  / 2);
            context.beginPath();
            context.arc(x, y, 5, 0, 2 * Math.PI);
            context.fill()

        }
        requestAnimationFrame(()=> {
            this.animate();
        })
    }

}