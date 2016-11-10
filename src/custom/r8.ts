import * as THREE from "three";
import LoadedGroup from "./LoadedGroup";
import {Test} from "../three";

export default class R8 extends LoadedGroup {
    readonly x: number;
    readonly y: number;
    readonly z: number;

    constructor() {
        this.x = Math.floor(Math.random() * (9))+1;
        this.y = Math.floor(Math.random() * (9))+1;
        this.z = Math.floor(Math.random() * (9))+1;

        let material = new THREE.MeshStandardMaterial({color: Test.randomColor(), roughness: 0.5, metalness: 1.0});
        super('img/audi.obj', material);

        this.position.x = 4000 * ( 2.0 * Math.random() - 1.0 );
        this.position.y = 4000 * ( 2.0 * Math.random() - 1.0 );
        this.position.z = 4000 * ( 2.0 * Math.random() - 1.0 );
        this.scale.set(.7,.7,.7);
    }

    updateMatrix(){
        if(this.position.y < -3999) this.position.y = 4000;

        let time = Date.now() * 0.0000025;
        let d = 10;
        this.rotation.x = Math.sin(time * this.x) * d;
        this.rotation.y = Math.cos(time * this.y) * d;
        this.rotation.z = Math.sin(time * this.z) * d;
        this.position.y -= 1;
        
        super.updateMatrix()
    }

}
