import * as THREE from "three";
import {MoveState} from "./interfaces/MoveState";

export default class FlyControls {
    camera: THREE.PerspectiveCamera;
    movementSpeed: number;
    rollSpeed: number;
    dragToLook: boolean;
    autoForward: boolean;

    tmpQuaternion: THREE.Quaternion;
    mouseStatus: number;
    moveState: MoveState;
    moveVector: THREE.Vector3;
    rotationVector: THREE.Vector3;

    constructor(camera: THREE.PerspectiveCamera, domElement = document) {
        this.camera = camera;
        this.movementSpeed = .001;
        this.rollSpeed = 0.005;
        this.dragToLook = false;
        this.autoForward = false;


        this.tmpQuaternion = new THREE.Quaternion();
        this.mouseStatus = 0;
        this.moveState = {
            up: 0,
            down: 0,
            left: 0,
            right: 0,
            forward: 0,
            back: 0,
            pitchUp: 0,
            pitchDown: 0,
            yawLeft: 0,
            yawRight: 0,
            rollLeft: 0,
            rollRight: 0
        };
        this.moveVector = new THREE.Vector3(0, 0, 0);
        this.rotationVector = new THREE.Vector3(0, 0, 0);

        this.bindings();
    }

    keydown(event) {
        if (event.altKey) return;

        switch (event.keyCode) {
            case 87: /*W*/
                this.moveState.forward = 1;
                break;
            case 83: /*S*/
                this.moveState.back = 1;
                break;
            case 65: /*A*/
                this.moveState.left = 1;
                break;
            case 68: /*D*/
                this.moveState.right = 1;
                break;
            case 82: /*R*/
                this.moveState.up = 1;
                break;
            case 70: /*F*/
                this.moveState.down = 1;
                break;
            case 38: /*up*/
                this.moveState.pitchUp = 1;
                break;
            case 40: /*down*/
                this.moveState.pitchDown = 1;
                break;
            case 37: /*left*/
                this.moveState.yawLeft = 1;
                break;
            case 39: /*right*/
                this.moveState.yawRight = 1;
                break;
            case 81: /*Q*/
                this.moveState.rollLeft = 1;
                break;
            case 69: /*E*/
                this.moveState.rollRight = 1;
                break;
        }

        this.updateMovementVector();
        this.updateRotationVector();
    }

    keyup(event) {
        switch (event.keyCode) {
            case 87: /*W*/
                this.moveState.forward = 0;
                break;
            case 83: /*S*/
                this.moveState.back = 0;
                break;
            case 65: /*A*/
                this.moveState.left = 0;
                break;
            case 68: /*D*/
                this.moveState.right = 0;
                break;
            case 82: /*R*/
                this.moveState.up = 0;
                break;
            case 70: /*F*/
                this.moveState.down = 0;
                break;
            case 38: /*up*/
                this.moveState.pitchUp = 0;
                break;
            case 40: /*down*/
                this.moveState.pitchDown = 0;
                break;
            case 37: /*left*/
                this.moveState.yawLeft = 0;
                break;
            case 39: /*right*/
                this.moveState.yawRight = 0;
                break;
            case 81: /*Q*/
                this.moveState.rollLeft = 0;
                break;
            case 69: /*E*/
                this.moveState.rollRight = 0;
                break;
        }

        this.updateMovementVector();
        this.updateRotationVector();
    }

    update(delta) {
        let moveMult = delta * this.movementSpeed;
        let rotMult = delta * this.rollSpeed;

        this.camera.translateX(this.moveVector.x * moveMult);
        this.camera.translateY(this.moveVector.y * moveMult);
        this.camera.translateZ(this.moveVector.z * moveMult);

        this.tmpQuaternion.set(this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult, 1).normalize();
        this.camera.quaternion.multiply(this.tmpQuaternion);

        this.camera.rotation.setFromQuaternion(this.camera.quaternion, this.camera.rotation.order);

    }

    updateMovementVector() {
        let forward = ( this.moveState.forward || ( this.autoForward && !this.moveState.back ) ) ? 1 : 0;

        this.moveVector.x = ( -this.moveState.left + this.moveState.right );
        this.moveVector.y = ( -this.moveState.down + this.moveState.up );
        this.moveVector.z = ( -forward + this.moveState.back );

        //console.log( 'move:', [ this.moveVector.x, this.moveVector.y, this.moveVector.z ] );
    }

    updateRotationVector() {
        this.rotationVector.x = ( -this.moveState.pitchDown + this.moveState.pitchUp );
        this.rotationVector.y = ( -this.moveState.yawRight + this.moveState.yawLeft );
        this.rotationVector.z = ( -this.moveState.rollRight + this.moveState.rollLeft );

        //console.log( 'rotate:', [ this.rotationVector.x, this.rotationVector.y, this.rotationVector.z ] );
    };

    bindings() {
        function bind(scope, fn) {
            return function () {
                fn.apply(scope, arguments);
            };
        }

        //let _mousemove = bind(this, this.mousemove);
        //let _mousedown = bind(this, this.mousedown);
        //let _mouseup = bind(this, this.mouseup);
        let _keydown = bind(this, this.keydown);
        let _keyup = bind(this, this.keyup);

        window.addEventListener('keydown', _keydown, false);
        window.addEventListener('keyup', _keyup, false);

        this.updateMovementVector();
        this.updateRotationVector();
    }

}
