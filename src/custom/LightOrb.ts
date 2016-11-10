import * as THREE from "three";

export default class LightOrb extends THREE.PointLight {
    static INTENSITY = 2.5;
    static DISTANCE = 2000;
    static DECAY = 0;

    readonly x: number;
    readonly y: number;
    readonly z: number;

    anchor: THREE.Vector3;

    constructor(color: number) {
        this.x = Math.floor(Math.random() * (9));
        this.y = Math.floor(Math.random() * (9));
        this.z = Math.floor(Math.random() * (9));
        super(color, LightOrb.INTENSITY, LightOrb.DISTANCE, LightOrb.DECAY);

        this.addMesh(color);
        this.anchor = new THREE.Vector3(4000 * ( 2.0 * Math.random() - 1.0 ), 4000 * ( 2.0 * Math.random() - 1.0 ), 4000 * ( 2.0 * Math.random() - 1.0 ));
        this.matrixAutoUpdate = true;
    }

    private addMesh(color: number) {
        let material = new THREE.MeshBasicMaterial({color: color});
        let sphere = new THREE.SphereGeometry(10, 16, 8);
        let mesh = new THREE.Mesh(sphere, material);

        this.add(mesh);
    }

    updateMatrix() {
        let time = Date.now() * 0.00001;
        let d = 2000;
        this.position.x = this.anchor.x + Math.cos(time * this.x) * d;
        this.position.y = this.anchor.y + Math.cos(time * this.y) * Math.sin(time * this.y) * d;
        this.position.z = this.anchor.z + Math.sin(time * this.z);
        super.updateMatrix();
    }
}