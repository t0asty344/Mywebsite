import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import './threestyle.css'
import '../public/styles.css'; // Adjust the path if necessary
import { OrbitControls } from 'three/examples/jsm/Addons.js';


const scene = new THREE.Scene();
//camera
const aspect = window.innerWidth / window.innerHeight;
const d = 10;
const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
camera.position.set(20, 20, 20); // Position the camera

const loader = new GLTFLoader();
const renderer = new THREE.WebGLRenderer( {canvas:document.querySelector('#bg')});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );
camera.position.set(9,9,80)

let importobs;

function importss(x=0,y=0,z=-10,path='3d/firstweb1.glb')
{
    let importobj;
    let importobjarray = [];
    loader.load( path, function ( gltf ) {
        importobj = gltf.scene
        scene.add( gltf.scene );
        
        importobj.position.set(x,y,z);
        importobj.rotation.set(1,1.6,6.9)
        importobjarray.push(importobj);

    }, undefined, function ( error ) {
    
        console.error( error );
    
    } );
}

var counter =0;
 function  creategrid(){
    let int1 = THREE.MathUtils.randInt(1,10)
    let int2 = THREE.MathUtils.randInt(1,10)
    for(var i=0; i<int1;i++){
        for(var e=0; e<int2;e++)
        {
            importss(e+e,i+i)
        }
        }
    }
    

creategrid()
let cor_array = [[7,3],[-3,7],[3,-7],[-7,-3]]

//first sphere
let cubex = 0
let cubey= 0
const texture = new THREE.TextureLoader().load('./images/nebula.jpg')
const geometry = new THREE.SphereGeometry( 6, 32, 32 );
const material = new THREE.MeshBasicMaterial( { map:texture } );
const cube = new THREE.Mesh( geometry, material );
cube.position.set(cubex,cubey,0)
scene.add( cube );


//second cube

//pivot
var pivotc2 = new THREE.Object3D();
cube.add(pivotc2)
pivotc2.position.set(0,0,0)
//adding cube to pivot

//light
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );

//Helpers
const lightHelp = new THREE.HemisphereLightHelper(light)
const gridHelper = new THREE.GridHelper(200,50);
scene.add(gridHelper)
scene.add(lightHelp)

//OrbitalControls
const control = new OrbitControls(camera,renderer.domElement);

for(var i=0;i<4;i++)
{
    
dynamic_shape(cor_array[i][0],cor_array[i][1])

}

const background = new THREE.TextureLoader().load('/images/space.jpg') 
scene.background = background

document.addEventListener("keydown",(event)=>{
   var key = event.key
    switch(event.key) 
    {
        case "a":
            camera.position.set(1,1,10)
            console.log("hello")
            break;
        case "d":
            camera.position.set(1,10,10)
            break;
        case "w":
            camera.position.set(10,1,10)
            break;
        case "s":
            camera.position.set(5,5,10)
            break;
    }
})

function animate() {
	requestAnimationFrame( animate );
    cube.rotation.y +=0.001

    pivotc2.rotation.z +=0.0001;

    control.update();
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
    const geometryd = new THREE.BoxGeometry( 0.5, 2, 1 );
    const materiald= new THREE.MeshBasicMaterial( { color: 0x000000 } );
    const cubed = new THREE.Mesh( geometryd, materiald );
    
    pivotc2.add(cubed)
    cubed.rotation.set(1,90,1);
    cubed.position.set(postionx,positiony,0)
}

animate();