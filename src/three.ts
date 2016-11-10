import * as THREE from "three";
import Palm from "./custom/Palm";
import TimCube from "./custom/TimCube";
import FlyControls from "./custom/FlyControls";
import LightOrb from "./custom/LightOrb";
import R8 from "./custom/r8";

export class Test {
    renderer: THREE.WebGLRenderer;
    container: HTMLDivElement;
    camera: THREE.PerspectiveCamera;
    controls: FlyControls;
    clock: THREE.Clock;
    scene: THREE.Scene;
    lights: THREE.PointLight[];

    constructor() {
        this.lights = [];
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        this.clock = new THREE.Clock();
    }

    init(): void {
        this.container = document.createElement('div');
        document.body.appendChild(this.container);

        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 15000);
        this.camera.rotation.set(-1,.2,-3);

        this.controls = new FlyControls(this.camera);

        this.controls.movementSpeed = 250;
        //controls.domElement = container;
        this.controls.rollSpeed = Math.PI / 6;
        this.controls.autoForward = false;
        this.controls.dragToLook = false;

        this.scene = new THREE.Scene();
        this.sceneInit();

        console.log(this);

    }

    sceneInit() {
        let manager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
        };

        let textureLoader = new THREE.TextureLoader(manager);

        this.scene.fog = new THREE.FogExp2(0x000000);

        for (var i = 0; i < 2000; i++) {
            let cube = new TimCube();
            this.scene.add(cube);
        }

        for (var i = 0; i < 2000; i++) {
            let palm = new Palm();
            this.scene.add(palm);
        }


        for (let i = 0; i < 15; i++) {
            let orb = new LightOrb(Test.randomColor());
            this.scene.add(orb);
        }

        var light = new THREE.PointLight(0xffffff, 5, 4000);
        //this.scene.add(light);

        for (let i = 0; i < 1000; i++) {
            let r8 = new R8();
            this.scene.add(r8);
        }


        this.makeSky();

        this.render()
    }

    makeSky() {
        let textureLoader = new THREE.TextureLoader();

        let materials = [
            new THREE.MeshBasicMaterial({map: textureLoader.load('img/px.jpg')}), // right
            new THREE.MeshBasicMaterial({map: textureLoader.load('img/nx.jpg')}), // left
            new THREE.MeshBasicMaterial({map: textureLoader.load('img/py.jpg')}), // top
            new THREE.MeshBasicMaterial({map: textureLoader.load('img/ny.jpg')}), // bottom
            new THREE.MeshBasicMaterial({map: textureLoader.load('img/pz.jpg')}), // back
            new THREE.MeshBasicMaterial({map: textureLoader.load('img/nz.jpg')})  // front
        ];

        let box = new THREE.BoxGeometry(10000, 10000, 10000, 7, 7, 7);
        let material = new THREE.MultiMaterial(materials);
        let mesh = new THREE.Mesh(box, material);
        mesh.scale.x = -1;
        this.scene.add(mesh);
    }


    render() {
        this.renderer.setClearColor(this.scene.fog);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;

        this.animate()
    }

    animate() {
        requestAnimationFrame(()=> {
            this.animate();
        });

        this.refresh()
    }

    refresh() {
        let delta = this.clock.getDelta();

        this.controls.update(delta);
        this.renderer.render(this.scene, this.camera);
    }

    static randomColor() {
        return parseInt("0x" + (Math.floor(Math.random() * 16777215).toString(16)));

    }

    static lensFlareUpdateCallback(object) {
        var f, fl = object.lensFlares.length;
        var flare;
        var vecX = -object.positionScreen.x * 2;
        var vecY = -object.positionScreen.y * 2;
        for (f = 0; f < fl; f++) {
            flare = object.lensFlares[f];
            flare.x = object.positionScreen.x + vecX * flare.distance;
            flare.y = object.positionScreen.y + vecY * flare.distance;
            flare.rotation = 0;
        }
        object.lensFlares[2].y += 0.025;
        object.lensFlares[3].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad(45);
    }
}