import { BLEND_MODES, Container, Graphics, Sprite, Texture } from "pixi.js";
import { GrenadeTickData } from "../types";
import Grenade from "./Grenade";

class GrenadeSmoke extends Grenade {
  smokeParticles: Sprite[] = [];

  constructor(data: GrenadeTickData) {
    super(data);

    const smokeImage =
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png";

    const smokes = new Container();
    smokes.name = "2DGrenadeSmoke";
    smokes.visible = false;
    const smokeTexture = Texture.from(smokeImage);

    for (let p = 0; p < 10; p++) {
      const particle = new Sprite(smokeTexture);
      particle.scale.set(0.3);
      particle.position.set(
        this.grenade.x - (Math.random() * 20 - 10),
        this.grenade.y - (Math.random() * 20 - 10)
      );
      particle.anchor.set(0.5);
      particle.rotation = Math.random() * 360;
      particle.alpha = 0.7;
      particle.blendMode = BLEND_MODES.SCREEN;
      particle.tint = 0xffffff;
      smokes.addChild(particle);
      this.smokeParticles.push(particle);
    }

    const progress = new Graphics();
    progress.name = "2DGrenadeSmokeProgress";
    this.addChild(progress);
    this.addChild(smokes);
  }

  get progress() {
    return this.getChildByName("2DGrenadeSmokeProgress") as Graphics;
  }

  get smokes() {
    return this.getChildByName("2DGrenadeSmoke") as Graphics;
  }

  update(replayTick: number) {
    super.update(replayTick);

    const { detonate_tick, end_tick } = this.data;
    this.progress.visible = false;
    this.smokes.visible = false;

    this.smokes.scale.set(0);

    if (replayTick > detonate_tick) {
      const tick = replayTick - detonate_tick;
      let sp = this.smokeParticles.length;
      const progress =
        ((end_tick - replayTick) / (end_tick - detonate_tick)) * 100;

      while (sp--) {
        this.smokeParticles[sp].rotation += Math.random() / 300;
      }

      this.progress.clear();
      this.progress.lineStyle(3, 0xffffff);
      this.progress.arc(
        0,
        0,
        25,
        -Math.PI / 2 + ((100 - progress) / 100) * (Math.PI * 2),
        -Math.PI / 2
      );

      this.progress.x = this.smokes.x = this.grenade.x;
      this.progress.y = this.smokes.y = this.grenade.y;

      this.smokes.scale.set(Math.min(1, tick / 15));
      this.grenade.visible = false;
      this.progress.visible = true;
      this.smokes.visible = true;
    } else {
      this.grenade.visible = true;
    }
  }
}

export default GrenadeSmoke;
