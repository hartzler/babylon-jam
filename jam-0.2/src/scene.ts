import { Engine, Scene, HemisphericLight, Vector3, MeshBuilder, Mesh, Space, StandardMaterial, Color3, PhysicsImpostor } from "@babylonjs/core";
import geo from "geometric";

// https://html-color.codes/
function color3FromRGB(r, g, b) { return new Color3(r / 255, g / 255, b / 255); }
const COLOR_BROWN = color3FromRGB(128,117,90);

export default function create(engine: Engine): Scene {
    var scene: Scene = new Scene(engine);

    var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    // room
    const WALL_HEIGHT = 30;

    // floor
    var ground: Mesh = MeshBuilder.CreateGround("ground", { height: 100, width: 100 }, scene);
    var groundMaterial = new StandardMaterial("ground", scene);
    groundMaterial.diffuseColor = COLOR_BROWN;   
    ground.material = groundMaterial;

    // walls ... W - E is Z axis, N - S is X axis.
    var walls: Mesh[] = [];

    walls.push(MeshBuilder.CreatePlane("wall-north", { height: WALL_HEIGHT, width: 100 }, scene));
    walls[0].rotation = new Vector3(0, -Math.PI / 2, 0);
    walls[0].translate(new Vector3(0,WALL_HEIGHT/2,50), 1, Space.LOCAL);
    walls[0].parent = ground;

    walls.push(MeshBuilder.CreatePlane("wall-east", { height: WALL_HEIGHT, width: 100 }, scene));
    walls[1].translate(new Vector3(0,WALL_HEIGHT/2,50), 1, Space.LOCAL);
    walls[1].parent = ground;  
    
    walls.push(MeshBuilder.CreatePlane("wall-south", { height: WALL_HEIGHT, width: 100 }, scene));
    walls[2].rotation = new Vector3(0, Math.PI / 2, 0);
    walls[2].translate(new Vector3(0,WALL_HEIGHT/2,50), 1, Space.LOCAL);
    walls[2].parent = ground;
    
    walls.push(MeshBuilder.CreatePlane("wall-west", { height: WALL_HEIGHT, width: 100 }, scene));
    walls[3].rotation = new Vector3(0, Math.PI, 0);
    walls[3].translate(new Vector3(0,WALL_HEIGHT/2,50), 1, Space.LOCAL);
    walls[3].parent = ground;   

    // ceiling
    var ceiling: Mesh = MeshBuilder.CreateGround("wall-ceiling", { height: 100, width: 100 }, scene);
    ceiling.rotation = new Vector3(Math.PI, 0, 0);
    ceiling.translate(new Vector3(0,-WALL_HEIGHT,0), 1, Space.LOCAL);
    ceiling.parent = ground;

    // player
    var player: Mesh = MeshBuilder.CreateSphere("player", { diameter: 1 }, scene);
    player.position.y = 1;
    
    // goal
    var goal: Mesh = MeshBuilder.CreateBox("goal", {height: 2, width: 1, depth: 1}, scene);
    goal.position = new Vector3(-49, 1, 0);
    goal.parent = ground;

    // UI
    var createButton = (name: string, text: string, top: string, right: string, onClick: Function) => {
        var button = document.createElement("button");
        button.style.top = top;
        button.style.right = right;
        button.textContent = text;
        button.style.width = "100px"
        button.style.height = "100px"
    
        button.setAttribute("id", name);
        button.style.position = "absolute";
        button.style.color = "black";
    
        document.body.appendChild(button);
    
        button.addEventListener("click", () => onClick());
    };

    var downbutton = createButton("downbutton", "Down", "190px", "80px", () => {
        if (player && player.position.x < 40) {
            player.position.x +=10;
        }
    });        
    var rightbutton = createButton("rightbutton", "-->", "100px", "30px", () => {
        if (player && player.position.z < 40) {
            player.position.z +=10;
        }        
    });
    var leftbutton = createButton("leftbutton", "<--", "100px", "130px", () => {
        if (player && player.position.z > -40) {
            player.position.z -=10;
        }  
    });    
    var topbutton = createButton("topbutton", "Up", "10px", "80px", () => {
        if (player && player.position.x > -40) {
            player.position.x -=10;
        }
    });    

    // TODO physics, have to figure out how to properly import CANNON to be accessible on the window object
    // scene.enablePhysics();
    // player.physicsImpostor = new PhysicsImpostor(player, PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
    // ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

    return scene;
}

// find a random midpoint-ish and tanslate by an amount between dmax and dmin
function bisectAndDistort(line: geo.Line, dmax: number, dmin: number): geo.Point {
    const max = 0.75;
    const min = 0.25;
    const angle = geo.lineAngle(line) + 90.0; // perpendicular
    const p = geo.lineInterpolate(line)(Math.random() * (max - min) + min);
    return geo.pointTranslate(p, angle*90.0, Math.random() * (dmax - dmin) + dmin);
}