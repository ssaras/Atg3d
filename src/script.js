import * as THREE from '/node_modules/three/build/three.module.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from '/node_modules/three/examples/jsm/loaders/STLLoader.js';

let container, stats;

let camera, cameraTarget, scene, renderer;
let gridHelper = new THREE.GridHelper( 100, 100 );
let controls;

init();
animate();

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 15 );
    camera.position.set( 3, 0.15, 3 );

    cameraTarget = new THREE.Vector3( 0, - 0.25, 0 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x72645b );
    scene.fog = new THREE.Fog( 0x72645b, 2, 15 );


    controls = new OrbitControls( camera, container );

    // Ground

    const plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 40, 40 ),
        new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
    );
    plane.rotation.x = - Math.PI / 2;
    plane.position.y = - 0.5;
    scene.add( plane );

    plane.receiveShadow = true;

    const material = new THREE.MeshPhongMaterial( { color: 0xAAAAAA, specular: 0x111111, shininess: 200 } );
    const loader = new STLLoader();

    // Colored binary STL
    loader.load( '/assets/colored.stl', function ( geometry ) {

        let meshMaterial = material;

        if ( geometry.hasColors ) {

            meshMaterial = new THREE.MeshPhongMaterial( { opacity: geometry.alpha, vertexColors: true } );

        }

        const mesh = new THREE.Mesh( geometry, meshMaterial );

        mesh.position.set( 0.5, 0.2, 0 );
        mesh.rotation.set( - Math.PI / 2, Math.PI / 2, 0 );
        mesh.scale.set( 0.3, 0.3, 0.3 );

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add( mesh );

    } );


    // Lights

    scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );

    addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
    addShadowedLight( 0.5, 1, - 1, 0xffaa00, 1 );
    // renderer

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;

    renderer.shadowMap.enabled = true;

    container.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

    // scene.add( gridHelper );

}

function addShadowedLight( x, y, z, color, intensity ) {

    const directionalLight = new THREE.DirectionalLight( color, intensity );
    directionalLight.position.set( x, y, z );
    scene.add( directionalLight );

    directionalLight.castShadow = true;

    const d = 1;
    directionalLight.shadow.camera.left = - d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = - d;

    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;

    directionalLight.shadow.bias = - 0.002;

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    renderer.render( scene, camera );
}

// const scene = new THREE.Scene();
// const renderer = new THREE.WebGLRenderer();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// const gridHelper = new THREE.GridHelper( 10, 10 );
// const controls = new OrbitControls( camera, renderer.domElement );

// camera.position.z = 5;
// camera.position.y = 10;
// camera.position.x = 0;
// camera.lookAt(0,0,0)

// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// scene.add( gridHelper );

// const loader = new STLLoader();
// loader.load( '/assets/brassknuckles.STL', function ( geometry ) {

//     const material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
//     const mesh = new THREE.Mesh( geometry, material );

//     mesh.position.set( 0,0,0 );
//     // mesh.rotation.set( 0, - Math.PI / 2, 0 );
//     mesh.scale.set( 100,100,100 );

//     mesh.castShadow = true;
//     mesh.receiveShadow = true;

//     scene.add( mesh );

// } );

// let directLight = new THREE.DirectionalLight(0xffffff, .50);
// directLight.castShadow = false;
// directLight.position.set(20, 20, 0);
// scene.add(directLight);        

// // const geometry = new THREE.BoxGeometry();
// // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// // const cube = new THREE.Mesh( geometry, material );
// // scene.add( cube );

// const animate = function () {
//     requestAnimationFrame( animate );

//     // cube.rotation.x += 0.01;
//     // cube.rotation.y += 0.01;

//     renderer.render( scene, camera );
// };

// animate();