import { Geometry, Line, LineBasicMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(new Vector3(0, 0, 0));

const scene = new Scene();

const material = new LineBasicMaterial({ color: 0x0000ff });

const geometry = new Geometry();
geometry.vertices.push(new Vector3(-10, 0, 0));
geometry.vertices.push(new Vector3(0, 10, 0));
geometry.vertices.push(new Vector3(10, 0, 0));

const line = new Line(geometry, material);

scene.add(line);
renderer.render(scene, camera);
