const createScene =  () => {
    const scene = new BABYLON.Scene(engine);

    /**** Set camera and light *****/
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    
    const between = (min,max) => {
        return Math.random() * (max - min) + min;
    }
    // calculate a midpoint with a random weight and deform it orthoganally
    const midpointish = (x0,y0,x1,y1,mag) => {
        const min = 0.25;
        const max = 0.75;
        mx = (x0 + x1) / 2;
        my = (y0 + y1) / 2;

    }
    // deform parallel to the points
    const deform = (x,y,min,max) => {
        return 
    }

    return scene;
}