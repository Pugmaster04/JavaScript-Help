/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 240,
        y: 180
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.myVariable = 0;
    this.vars.gameScene = 0;
    this.vars.officeViewpoint = 0;
    this.vars.gameFrames = 0;
    this.vars.cameraSelect = 0;
    this.vars.bonnie = 0;
    this.vars.chica = 0;
    this.vars.doorLights = 0;
    this.vars.energy = 0;
    this.vars.night = 0;
    this.vars.ees = [];
    this.vars.difficulty = [];
  }
}
