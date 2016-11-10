import * as THREE from "three";
import {ok} from "../loader";

export default class LoadedGroup extends THREE.Group {
    static loader: ok.OBJLoader;
    static loading: boolean | string;
    static model: THREE.Group;

    private STATIC = <typeof LoadedGroup> this.constructor;
    private model: THREE.Group;

    constructor(objectUrl: string, private material: THREE.Material = new THREE.MeshStandardMaterial()) {
        super();

        if (!this.STATIC.loading) {
            this.STATIC.loading = true;
            this.STATIC.loader = new ok.OBJLoader();

            this.STATIC.loader.load(objectUrl, (object: THREE.Group)=> {
                this.STATIC.model = object;
                this.STATIC.loading = "done";
            });
        }
        this.loadModel();
        this.matrixAutoUpdate = false;

    }

    private loadModel() {
        if (this.STATIC.loading !== "done") {
            setTimeout(()=> {
                this.loadModel()
            }, 500)
        } else {
            this.model = this.STATIC.model;
        }
    }

    set model(group: THREE.Group) {
        group.children.forEach((child: THREE.Mesh)=> {
            let clone = child.clone();
            clone.material = this.material;
            this.add(clone);
        });
        this.modelIsSet()
    }

    modelIsSet() {
        this.matrixAutoUpdate = true;
    }

}
