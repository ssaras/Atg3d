import * as THREE from '/node_modules/three/build/three.module.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const gridHelper = new THREE.GridHelper( 10, 10 );
const controls = new OrbitControls( camera, renderer.domElement );

// camera.position.set( 400, 400, 2200 );
// camera.lookAt( 400, 400, 0 );

camera.position.z = 5;
camera.position.y = 10;
camera.position.x = 0;
camera.lookAt(0,0,0)

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.add( gridHelper );

// let directLight = new THREE.DirectionalLight(0xffffff, .50);
// directLight.castShadow = true;
// directLight.position.set(20000, 100000, 0);
// scene.add(directLight);        

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();