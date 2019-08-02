import React from 'react';

export default class Room extends React.Component {

    HSVtoRGB(h, s, v) {
        var r, g, b, i, f, p, q, t;
        if (arguments.length === 1) {
            s = h.s;
            v = h.v;
            h = h.h;
        }
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1: 
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4: 
                r = t;
                g = p;
                b = v; 
                break;
            case 5: 
                r = v;
                g = p;
                b = q;
                break;
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

    drawRoom(room, drawBorder = true) {
        if (!this.ctx) {
            return;
        }

        this.ctx.fillStyle = "#536473";
        this.ctx.fillRect(room.x, room.y, room.w, room.h);
        
        if (drawBorder) {
            this.ctx.beginPath();
            this.ctx.lineWidth = "4";
            this.ctx.strokeStyle = "#212126";
            this.ctx.setLineDash([6, 10]);
            this.ctx.rect(room.x, room.y, room.w, room.h);
            this.ctx.stroke();
        }
    }

    drawLight(light) {
        const radius = 150;

        this.ctx.globalCompositeOperation = 'lighter';
        var color1 = this.HSVtoRGB(light.hue, light.sat, light.brightness * 0.8);
        var color2 = this.HSVtoRGB(light.hue, light.sat, light.brightness * 0.6);
        var color3 = this.HSVtoRGB(light.hue, light.sat, light.brightness * 0.3);
        var color4 = this.HSVtoRGB(light.hue, light.sat, 0.1);

        var gradiant = this.ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, radius);
        gradiant.addColorStop(0.0, "rgb(" + color1.r + "," + color1.g + "," + color1.b + ")");
        gradiant.addColorStop(0.2, "rgb(" + color2.r + "," + color2.g + "," + color2.b + ")");
        gradiant.addColorStop(0.7, "rgb(" + color3.r + "," + color3.g + "," + color3.b + ")");
        gradiant.addColorStop(0.9, "rgb(" + color4.r + "," + color4.g + "," + color4.b + ")");
        gradiant.addColorStop(1, "#000");
        this.ctx.fillStyle = gradiant;
        this.ctx.beginPath();
        this.ctx.arc(light.x, light.y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.restore();
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        this.ctx = canvas.getContext("2d");

        var room = {
            x: 10,
            y: 10,
            w: 220,
            h: 300
        };

        this.drawRoom(room);
        
        var light = {
            x: 30,
            y: 30,
            hue: 186.0 / 360.0,
            sat: 0.86,
            brightness: 1
        }
        this.drawLight(light);
        var light = {
            x: 110,
            y: 200,
            hue: 25.0 / 360.0,
            sat: 0.86,
            brightness: 1
        }
        this.drawLight(light);
        this.ctx.globalCompositeOperation = 'destination-in';
        this.drawRoom(room, false);
    }

    render() {
        return (
            <div>
                <canvas ref="canvas" width={480} height={320} style={{border: "1px solid #000000"}}/>
            </div>
        );
    }
}