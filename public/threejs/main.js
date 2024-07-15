

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let cor_array = [[3,-3],[-3,3],[-3,-3],[3,3]]

let cubex = 0
let cubey= 0
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
cube.position.set(cubex,cubey,0)
scene.add( cube );

let cube2x = 2.5
let cube2y = 1.25
var pivotc2 = new THREE.Object3D();
const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
const material2 = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const cube2 = new THREE.Mesh( geometry2, material2 );

cube.add(pivotc2)
pivotc2.position.set(0,0,0)
pivotc2.add(cube2);
cube2.position.set(cube2x,cube2y,0);

for(var i=0;i<4;i++)
{
    
    dynamic_shape(cor_array[i][0],cor_array[i][1])
}



camera.position.z = 5;
document.addEventListener("keydown",(event)=>{
   var key = event.key
    switch(event.key) 
    {
        case "a":
            camera.position.x -=0.1;
            console.log("hello")
            break;
        case "d":
            camera.position.x +=0.1;
            break;
        case "w":
            camera.position.y +=0.1;
            break;
        case "s":
            camera.position.y -=0.1;
            break;
    }
})
function animate() {
	requestAnimationFrame( animate );
    
    pivotc2.rotation.z +=0.01;
    console.log(pivotc2.rotation)
	renderer.render(scene, camera );
}

function object_animation(object_name,object_movementx=0,object_movementy=0,object_rotationx=0,object_rotationy=0)
{
    object_name.rotation.x +=object_rotationx;
    object_name.rotation.y += object_rotationy
    object_name.position.x += new THREE.Vector3(object_movementx,object_movementy,0)
}
function dynamic_shape(postionx=0,positiony=0){
    var pivotd = new THREE.Object3D();
    const geometryd = new THREE.BoxGeometry( 1, 1, 1 );
    const materiald= new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    const cubed = new THREE.Mesh( geometry2, material2 );
    cubed.position.set(postionx,positiony,0)
    scene.add(cubed)
}

document.addEventListener("mousedown",(event)=>{
    
    mouse.x
})
animate();