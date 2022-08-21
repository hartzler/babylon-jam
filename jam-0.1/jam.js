    const createScene =  () => {
        const scene = new BABYLON.Scene(engine);

        /**** Set camera and light *****/
        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
        camera.attachControl(canvas, true);
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
        
        const logger = BABYLON.Logger;
        const height = 5;
        const width = 5;
        const field = 9;    
        const offset = field * width / 2;
        
        // materials
        const materials = {
            r: new BABYLON.StandardMaterial("r", scene),
            c: new BABYLON.StandardMaterial("c", scene),
            i: new BABYLON.StandardMaterial("i", scene),
        };
        const materialColors = {
            r: new BABYLON.Color3(0, 1, 0),
            c: new BABYLON.Color3(0, 0, 1),
            i: new BABYLON.Color3(1, 1, 0),
        };
        for(const [k, m] of Object.entries(materials)) {
            m.diffuseColor = materialColors[k];
        }

        const rules = {
            r: new Map(Object.entries({r: 0.75, c: 0.25})),
            c: new Map(Object.entries({r: 0.25, c: 0.50, i: 0.25})),
            i: new Map(Object.entries({c: 0.50, i: 0.50}))
        };

        // map N x M
        const map = {
            data: [],
            find: (x,z) => {
                if(x < 0 || x >= field) return null;
                if(z < 0 || z >= field) return null; 
                return map.data[z*field+x]; 
            },
            neighbors: (cell) => {
                return [
                    map.find(cell.x-1, cell.z),    // W
                    map.find(cell.x-1, cell.z-1),  // NW
                    map.find(cell.x, cell.z-1),    // N
                    map.find(cell.x+1, cell.z-1),  // NE
                    map.find(cell.x+1, cell.z),    // E
                    map.find(cell.x+1, cell.z+1),  // SE
                    map.find(cell.x, cell.z+1),    // S
                    map.find(cell.x-1, cell.z+1)   // SW
                ];
            },
            collapse: (cell) => {
                if(cell.material) return false; // already collapsed
                logger.Log(`collapse: ${cell.x},${cell.z} neighbors: ${map.neighbors(cell).filter(n=>n).map(n=>n.name)}`)
                map.neighbors(cell).filter(n=>n).forEach(n => {
                    // if this neighbor has been assigned a material remove from our possibilities based on its value
                    if(n.material) {                    
                        cell.possible = cell.possible.filter(p=>rules[n.material].has(p));
                    }
                });
            },
        };
        Array.from(Array(field)).forEach((_, z) => {
            Array.from(Array(field)).forEach((_, x) => {
                map.data[z*field+x] = {
                    name: `tile-${x}-${z}`,
                    x,
                    z,
                    position: [x*width-offset, 0, z*height-offset],
                    material: null,
                    possible: ['r','c','i'],
                };
            });
        });

        // wave collapse
        // shallow copy
        const shallow = [...map.data];
        while(shallow.length > 0) {
            // pick lowest entropy
            shallow.sort((a,b) => a.possible.length - b.possible.length).reverse();
            const cell = shallow.pop();

            // pick from possible, collapsing this cell's possible list to empty
            // TODO honor weights
            cell.material = cell.possible[Math.random()*cell.possible.length | 0];
            cell.possible = [];

            // remove all invalid possibles
            map.data.forEach(v => map.collapse(v));
        };


        // create the meshes
        for (const cell of map.data) {
            const ground = BABYLON.MeshBuilder.CreateGround("ground"+cell.name, {height, width});
            ground.position = new BABYLON.Vector3(...cell.position);
            ground.material = materials[cell.material];
        }

        return scene;
    }