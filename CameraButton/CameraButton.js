/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class CameraButton extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("load0", "./CameraButton/costumes/load0.svg", {
        x: 51,
        y: -121
      }),
      new Costume("load9", "./CameraButton/costumes/load9.svg", {
        x: 51,
        y: -121
      }),
      new Costume("load1", "./CameraButton/costumes/load1.svg", {
        x: 240,
        y: -118
      }),
      new Costume("load2", "./CameraButton/costumes/load2.svg", {
        x: 241,
        y: -31
      }),
      new Costume("load3", "./CameraButton/costumes/load3.svg", {
        x: 240,
        y: 23
      }),
      new Costume("load4", "./CameraButton/costumes/load4.svg", {
        x: 241,
        y: 73
      }),
      new Costume("load5", "./CameraButton/costumes/load5.svg", {
        x: 239,
        y: 111
      }),
      new Costume("load6", "./CameraButton/costumes/load6.svg", {
        x: 239,
        y: 151
      }),
      new Costume("load7", "./CameraButton/costumes/load7.svg", {
        x: 240,
        y: 180
      }),
      new Costume("load8", "./CameraButton/costumes/load8.png", {
        x: 480,
        y: 360
      })
    ];

    this.sounds = [
      new Sound("camera", "./CameraButton/sounds/camera.wav"),
      new Sound("camera startup", "./CameraButton/sounds/camera startup.wav"),
      new Sound("dark ambience1", "./CameraButton/sounds/dark ambience1.wav"),
      new Sound("dark ambience2", "./CameraButton/sounds/dark ambience2.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked4),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked5)
    ];

    this.audioEffects.volume = 0;

    this.vars.load = 0;
    this.vars.loadGo = 0;
    this.vars.allow = 1;
    this.vars.safeTime = 0;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    yield* this.wait(0);
    while (true) {
      if (
        this.stage.vars.gameScene == "office" ||
        this.stage.vars.gameScene == "camera" ||
          this.stage.vars.gameScene == "powerout" ||
            (0 < this.stage.vars.energy &&
              this.stage.vars.gameScene == "jumpscare")
      ) {
        if (
          (this.vars.load == 0 &&
            (this.stage.vars.gameScene == "powerout" ||
              (0 < this.stage.vars.energy &&
                this.stage.vars.gameScene == "jumpscare"))) ||
          this.stage.vars.gameScene == "powerout attack"
        ) {
          this.visible = false;
        } else {
          this.visible = true;
        }
      } else {
        this.visible = false;
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    yield* this.wait(0);
    while (true) {
      while (
        !!(
          this.stage.vars.gameScene == "office" ||
          this.stage.vars.gameScene == "camera"
        )
      ) {
        yield;
      }
      while (!(this.stage.vars.gameScene == "camera")) {
        yield;
      }
      this.sprites[undefined].createClone();
      yield* this.startSound("menu");
      yield* this.startSound("death or startup static");
      yield;
    }
  }

  *startAsClone() {
    this.audioEffects.volume = 100;
    this.visible = false;
    yield* this.startSound("camera startup");
    while (!!(this.stage.vars.gameScene == "camera")) {
      yield;
    }
    this.audioEffects.volume = 0;
    this.deleteThisClone();
  }

  *whenGreenFlagClicked3() {
    this.rotationStyle = Sprite.RotationStyle.DONT_ROTATE;
    this.costume = "load0";
    this.vars.load = 0;
    this.vars.loadGo = 0;
    this.vars.allow = 0;
    this.vars.safeTime = 0;
    this.goto(0, 0);
    while (true) {
      while (!!(this.stage.vars.gameScene == "6am")) {
        yield;
      }
      if (0 < this.vars.safeTime) {
        this.vars.safeTime += -1;
      }
      if (!(this.stage.vars.gameScene == "office")) {
        this.vars.safeTime = 0;
      }
      if (
        (this.vars.load == 0 || this.vars.load == 9) &&
        !(this.touching("mouse") || this.keyPressed("s"))
      ) {
        this.vars.allow = 1;
      }
      if (
        ((this.stage.vars.gameScene == "powerout" ||
          (0 < this.stage.vars.energy &&
            this.stage.vars.gameScene == "jumpscare")) &&
          (this.vars.load == 9 || this.vars.loadGo == 1)) ||
        ((this.touching("mouse") || this.keyPressed("s")) &&
          this.vars.allow == 1 &&
            (this.stage.vars.gameScene == "camera" ||
              this.stage.vars.gameScene == "office"))
      ) {
        if (
          this.vars.load == 0 &&
          !(
            this.stage.vars.gameScene == "powerout" ||
            (0 < this.stage.vars.energy &&
              this.stage.vars.gameScene == "jumpscare")
          )
        ) {
          this.vars.loadGo = 1;
          this.vars.allow = 0;
          yield* this.startSound("camera");
        } else {
          if (this.vars.load == 9) {
            this.vars.loadGo = -1;
            this.vars.allow = 0;
            if (
              this.stage.vars.gameScene == "camera" ||
              this.stage.vars.gameScene == "office" ||
                (0 < this.stage.vars.energy &&
                  this.stage.vars.gameScene == "jumpscare") ||
                  this.stage.vars.gameScene == "powerout"
            ) {
              yield* this.startSound("camera");
              if (
                !(
                  this.stage.vars.gameScene == "powerout" ||
                  (0 < this.stage.vars.energy &&
                    this.stage.vars.gameScene == "jumpscare")
                )
              ) {
                this.stage.vars.gameScene = "office";
                this.vars.safeTime = 60;
              }
              this.createClone();
            }
          }
        }
      }
      this.vars.load += this.vars.loadGo;
      if (!(this.vars.loadGo == 0)) {
        if (8 < this.vars.load) {
          this.vars.loadGo = 0;
          this.vars.load = 9;
          if (this.stage.vars.gameScene == "office") {
            this.stage.vars.ees.splice(9 - 1, 1, 0);
            this.stage.vars.gameScene = "camera";
            this.sprites[undefined].createClone();
            this.createClone();
          }
        }
        if (this.vars.load < 1) {
          this.vars.load = 0;
          this.vars.loadGo = 0;
        }
      }
      this.costume = "" + "load" + this.vars.load;
      if (this.vars.load == 0 || this.vars.load == 9) {
        if (
          this.stage.vars.gameScene == "powerout" ||
          (0 < this.stage.vars.energy &&
            this.stage.vars.gameScene == "jumpscare")
        ) {
          this.visible = false;
        }
        if (this.stage.vars.gameScene == "office") {
          this.effects.ghost = 70;
        }
        if (this.stage.vars.gameScene == "camera") {
          this.effects.ghost = 25;
        }
        this.effects.brightness = 100;
        this.goto(0, 0);
        this.size = 100;
      } else {
        this.effects.ghost = 0;
        this.effects.brightness = 0;
        this.goto(0, 0);
        this.size = 100;
      }
      if (this.vars.loadGo == 0) {
        if (this.vars.load == 9 && this.stage.vars.gameScene == "office") {
          this.vars.load = 0;
        } else {
          if (this.vars.load == 0 && this.stage.vars.gameScene == "camera") {
            this.vars.load = 9;
          }
        }
      }
      yield;
    }
  }

  *whenGreenFlagClicked4() {
    yield* this.wait(0);
    while (true) {
      while (!!(this.stage.vars.gameScene == "6am")) {
        yield;
      }
      if (1 < this.stage.vars.night) {
        yield* this.playSoundUntilDone(
          "" + "dark ambience" + this.random(1, 2)
        );
      } else {
        yield* this.playSoundUntilDone("" + "dark ambience" + 1);
      }
      yield;
    }
  }

  *whenGreenFlagClicked5() {
    this.visible = false;
    yield* this.wait(0);
    while (true) {
      if (
        this.stage.vars.gameScene == "office" ||
        this.stage.vars.gameScene == "camera" ||
          this.stage.vars.gameScene == "powerout" ||
            (0 < this.stage.vars.energy &&
              this.stage.vars.gameScene == "jumpscare")
      ) {
        this.audioEffects.volume = 50;
      } else {
        this.audioEffects.volume = 0;
      }
      yield;
    }
  }
}
