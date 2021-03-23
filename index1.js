import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import TittleBackground from "./TittleBackground/TittleBackground.js";
import StaticEffect from "./StaticEffect/StaticEffect.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  TittleBackground: new TittleBackground({
    x: 20,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 1
  }),
  StaticEffect: new StaticEffect({
    x: 69,
    y: 3,
    direction: 90,
    costumeNumber: 7,
    size: 135,
    visible: false,
    layerOrder: 2
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
