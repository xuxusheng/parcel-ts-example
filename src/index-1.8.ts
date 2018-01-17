/**
 *  使用 ASCII 效果
 * */


import {
    AxisHelper, CubeGeometry, Mesh, MeshLambertMaterial, PerspectiveCamera, PlaneGeometry, Scene, SphereGeometry,
    SpotLight,
    WebGLRenderer
} from 'three';
import { initStats } from '../lib/stats';
import { GUI } from 'dat-gui';

const stats = initStats();

const scene = new Scene();

const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new WebGLRenderer();
renderer.setClearColor(0xEEEEEE);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// 坐标
const axes = new AxisHelper(20);
scene.add(axes);

// 平面
const planeGeometry = new PlaneGeometry(60, 20, 1, 1);
const planeMaterial = new MeshLambertMaterial({ color: 0xcccccc });
const plane = new Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane);

// 方块
const cubeGeometry = new CubeGeometry(4, 4, 4);
const cubeMaterial = new MeshLambertMaterial({ color: 0xff0000, wireframe: true });
const cube = new Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true;
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;
scene.add(cube);

// 方块
const sphereGeometry = new SphereGeometry(4, 20, 20);
const sphereMaterial = new MeshLambertMaterial({ color: 0x7777ff, wireframe: true });
const sphere = new Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;
sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = 2;

scene.add(sphere);

// 光源
const spotLight = new SpotLight(0xffffff);
spotLight.castShadow = true;
spotLight.position.set(-40, 60, -10);
scene.add(spotLight);

camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

document.body.appendChild(renderer.domElement);

const gui = new GUI();
const controls = {
    rotationSpeed: 0.02,
    bouncingSpeed: 0.03
};
gui.add(controls, 'rotationSpeed', 0, 0.5);
gui.add(controls, 'bouncingSpeed', 0, 0.5);

let step = 0;

(function renderScene() {

    stats.update();

    step += controls.bouncingSpeed;
    sphere.position.x = 20 + (10 * (Math.cos(step)));
    sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
})();
