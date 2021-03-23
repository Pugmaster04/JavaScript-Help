/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Office extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("SS", "./Office/costumes/SS.png", { x: 2, y: 2 }),
      new Costume("SP", "./Office/costumes/SP.png", { x: 480, y: 360 }),
      new Costume("powerout", "./Office/costumes/powerout.svg", {
        x: 400,
        y: 300
      }),
      new Costume("office", "./Office/costumes/office.svg", { x: 400, y: 300 }),
      new Costume("fan2", "./Office/costumes/fan2.png", { x: 129, y: 196 }),
      new Costume("fan1", "./Office/costumes/fan1.png", { x: 120, y: 198 }),
      new Costume("fan3", "./Office/costumes/fan3.png", { x: 122, y: 198 }),
      new Costume("camera", "./Office/costumes/camera.png", { x: 468, y: 348 }),
      new Costume("left1", "./Office/costumes/left1.png", { x: 480, y: 360 }),
      new Costume("left0", "./Office/costumes/left0.png", { x: 480, y: 360 }),
      new Costume("right0", "./Office/costumes/right0.png", { x: 54, y: 360 }),
      new Costume("right1", "./Office/costumes/right1.png", { x: 58, y: 360 }),
      new Costume("golden freddy", "./Office/costumes/golden freddy.svg", {
        x: 189,
        y: 158
      }),
      new Costume("creep5", "./Office/costumes/creep5.svg", { x: 240, y: 182 }),
      new Costume("creep4", "./Office/costumes/creep4.svg", { x: 240, y: 182 }),
      new Costume("creep3", "./Office/costumes/creep3.svg", { x: 240, y: 180 }),
      new Costume("creep2", "./Office/costumes/creep2.svg", { x: 240, y: 182 }),
      new Costume("creep1", "./Office/costumes/creep1.svg", { x: 240, y: 180 }),
      new Costume("creep6", "./Office/costumes/creep6.svg", { x: 240, y: 182 })
    ];

    this.sounds = [
      new Sound("office ambience", "./Office/sounds/office ambience.wav"),
      new Sound("creeps", "./Office/sounds/creeps.wav"),
      new Sound("hallu", "./Office/sounds/hallu.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3),
      new Trigger(Trigger.CLONE_START, this.startAsClone3),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked4),
      new Trigger(Trigger.CLONE_START, this.startAsClone4),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked)
    ];

    this.audioEffects.volume = 0;

    this.vars.cloneName = "hallucination";
  }

  *startAsClone() {
    if (this.vars.cloneName == "fan") {
      yield* this.wait(0);
      while (true) {
        while (!!(this.stage.vars.gameScene == "6am")) {
          yield;
        }
        yield* this.playSoundUntilDone("office ambience");
        yield;
      }
    }
  }

  *whenGreenFlagClicked() {
    this.audioEffects.volume = 0;
    yield* this.wait(0);
    while (true) {
      yield* this.playSoundUntilDone("creeps");
      yield;
    }
  }

  *startAsClone2() {
    if (this.vars.cloneName == "hallucination") {
      if (
        this.stage.vars.gameScene == "office" &&
        this.stage.vars.ees[9 - 1] == 1
      ) {
        while (
          !!(
            this.stage.vars.gameScene == "office" &&
            this.stage.vars.ees[9 - 1] == 1
          )
        ) {
          yield;
        }
        this.audioEffects.volume = 0;
        this.deleteThisClone();
      }
    }
  }

  *whenGreenFlagClicked2() {
    this.visible = false;
    this.vars.cloneName = "doors";
    this.createClone();
    this.moveBehind(1);
    this.vars.cloneName = "gf";
    this.createClone();
    this.moveBehind(1);
    this.vars.cloneName = "hallucination";
    yield* this.wait(0);
    while (true) {
      while (!(this.stage.vars.gameScene == "office")) {
        yield;
      }
      this.vars.cloneName = "fan";
      this.createClone();
      this.vars.cloneName = "hallucination";
      this.moveBehind(1);
      while (!!(this.stage.vars.gameScene == "office")) {
        yield;
      }
      yield;
    }
  }

  *whenGreenFlagClicked3() {
    this.rotationStyle = Sprite.RotationStyle.DONT_ROTATE;
    this.costume = "SS";
    this.size = 110;
    this.costume = "office00";
    this.goto(0, -113);
    this.visible = false;
    while (true) {
      while (!!(this.stage.vars.gameScene == "6am")) {
        yield;
      }
      this.direction = 0;
      this.goto(this.stage.vars.officeViewpoint * 1, -113);
      if (this.stage.vars.gameScene == "office") {
        this.visible = true;
        this.costume = "SS";
        this.effects.ghost = 0;
        this.size = 110;
        this.costume = "office";
      } else {
        if (this.stage.vars.gameScene == "camera") {
          this.visible = true;
          this.costume = "camera";
          this.size = 100;
          this.goto(0, 0);
          this.effects.ghost = 25;
        } else {
          if (this.stage.vars.gameScene == "powerout") {
            this.costume = "SS";
            this.size = 110;
            this.effects.ghost = 0;
            this.costume = "powerout";
            this.visible = true;
          } else {
            this.visible = false;
          }
        }
      }
      yield;
    }
  }

  *startAsClone3() {
    if (this.vars.cloneName == "fan") {
      this.moveAhead(2);
      this.costume = "fan2";
      this.size = 53;
      this.audioEffects.volume = 25;
      while (true) {
        while (!!(this.stage.vars.gameScene == "6am")) {
          yield;
        }
        this.goto(26 + this.sprites["Office"].x, -13);
        this.costume = "" + "fan" + (1 + (this.stage.vars.gameFrames % 3));
        if (this.stage.vars.gameScene == "office") {
          if (!(this.audioEffects.volume == 25)) {
            this.audioEffects.volume = 25;
          }
          this.visible = true;
        } else {
          this.audioEffects.volume = 0;
          this.visible = false;
          this.deleteThisClone();
        }
        yield;
      }
    }
  }

  *whenGreenFlagClicked4() {
    while (true) {
      if (
        (this.stage.vars.ees[9 - 1] == 1 &&
          this.stage.vars.gameScene == "office") ||
        (this.stage.vars.gameScene == "camera" &&
          ((this.stage.vars.cameraSelect == "2B" &&
            12 < this.stage.vars.difficulty[1 - 1] &&
            this.stage.vars.bonnie == "2B") ||
            (this.stage.vars.cameraSelect == "4B" &&
              12 < this.stage.vars.difficulty[2 - 1] &&
              this.stage.vars.chica == "4B")))
      ) {
        this.audioEffects.volume = 50;
      } else {
        this.audioEffects.volume = 0;
      }
      yield;
    }
  }

  *startAsClone4() {
    if (this.vars.cloneName == "doors") {
      this.costume = "SS";
      this.size = 110;
      while (true) {
        if (
          this.stage.vars.doorLights == 0 ||
          !(this.stage.vars.gameScene == "office")
        ) {
          this.visible = false;
        } else {
          if (0 < this.stage.vars.officeViewpoint) {
            this.goto(-163 + this.sprites["Office"].x, 6);
            if (this.stage.vars.bonnie == "left door") {
              this.costume = "left1";
            } else {
              this.costume = "left0";
            }
          } else {
            this.goto(163 + this.sprites["Office"].x, 6);
            if (this.stage.vars.chica == "right door") {
              this.costume = "right1";
            } else {
              this.costume = "right0";
            }
          }
          if (
            1 == Math.floor(0.1 * (7 + this.random(1, 10))) &&
            !(
              (String(this.stage.vars.doorLights)[1 - 1] == 0 &&
                0 < this.stage.vars.officeViewpoint) ||
              (String(this.stage.vars.doorLights)[2 - 1] == 0 &&
                this.stage.vars.officeViewpoint < 0) ||
                this.stage.vars.officeViewpoint == 0
            )
          ) {
            this.visible = true;
          } else {
            this.visible = false;
          }
        }
        yield;
      }
    }
    if (this.vars.cloneName == "gf") {
      this.costume = "SS";
      this.effects.ghost = 0;
      this.size = 110;
      this.costume = "golden freddy";
      this.vars.cloneName = 0;
      while (true) {
        while (!!(this.stage.vars.gameScene == "6am")) {
          yield;
        }
        this.goto(this.stage.vars.officeViewpoint * 1, -113);
        if (
          this.stage.vars.gameScene == "office" &&
          this.stage.vars.ees[9 - 1] == 1
        ) {
          if (this.vars.cloneName % 40 == 10) {
            this.sprites["Office"].createClone();
            this.vars.cloneName += 1;
          }
          this.vars.cloneName += 1;
          this.visible = true;
          if (150 < this.vars.cloneName) {
            this.broadcast("gf");
            while (
              !!(
                this.stage.vars.gameScene == "office" &&
                this.stage.vars.ees[9 - 1] == 1
              )
            ) {
              yield;
            }
          }
        } else {
          if (this.stage.vars.gameScene == "bonnie") {
            this.vars.cloneName += 1;
            this.goto(0, 0);
            if (this.vars.cloneName < 90) {
              this.costume = "creep4";
            } else {
              this.costume = "creep6";
              if (120 < this.vars.cloneName) {
                this.stage.vars.gameScene = "menu";
              }
            }
            this.visible = true;
          } else {
            this.vars.cloneName = 0;
            this.visible = false;
          }
        }
        yield;
      }
    }
    if (this.vars.cloneName == "hallucination") {
      this.effects.clear();
      this.costume = "creep1";
      this.size = 100;
      this.goto(0, 0);
      this.audioEffects.volume = 0;
      if (
        this.stage.vars.gameScene == "office" &&
        this.stage.vars.ees[9 - 1] == 1
      ) {
        this.effects.ghost = 50;
      } else {
        yield* this.startSound("hallu");
      }
      this.visible = false;
      yield* this.wait(this.random(0, 1));
      this.audioEffects.volume = 100;
      for (let i = 0; i < this.random(3, 4); i++) {
        yield* this.wait(0.05);
        this.visible = true;
        this.moveAhead();
        this.costume = "" + "creep" + this.random(1, 5);
        yield* this.wait(0.1);
        this.visible = false;
        yield* this.wait(0.05);
        this.visible = true;
        this.moveAhead();
        this.costume = "" + "creep" + this.random(1, 5);
        yield* this.wait(0.1);
        this.visible = false;
        yield;
      }
      this.audioEffects.volume = 0;
      this.deleteThisClone();
    }
  }

  *whenthisspriteclicked() {
    if (
      this.costumeNumber < 10 &&
      (this.stage.vars.gameScene == "office" ||
        this.stage.vars.gameScene == "powerout")
    ) {
      if (
        -70 < this.mouse.x - this.stage.vars.officeViewpoint &&
        this.mouse.x - this.stage.vars.officeViewpoint < -60
      ) {
        if (66 < this.mouse.y && this.mouse.y < 76) {
          this.broadcast("noose");
          yield* this.wait(0.1);
        }
      }
    }
  }
}
