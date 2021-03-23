import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Office from "./Office/Office.js";
import CameraButton from "./CameraButton/CameraButton.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Office: new Office({
    x: 182,
    y: -113,
    direction: 0,
    costumeNumber: 4,
    size: 110.00000000000001,
    visible: true,
    layerOrder: 1
  }),
  CameraButton: new CameraButton({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 2
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
