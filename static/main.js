import { loadGLTF } from "./libs/loader.js";
import { mockWithVideo } from './libs/camera-mock.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    //mockWithVideo('../../assets/mock-videos/musicband1.mp4');

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '/static/assets/targets/targets_navidad.mind',
    });
    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    // Crear un material de textura a partir de la imagen JPG
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/static/assets/models/musicband-raccoon/4710010.jpg');

    // Crear una geometría de plano para aplicar la textura
    const geometry = new THREE.PlaneGeometry(1, 1);  // Un plano de tamaño 1x1
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);

    plane.position.set(0, -0.4, 0);
    scene.add(plane);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
