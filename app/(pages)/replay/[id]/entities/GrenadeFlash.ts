import {
  BLEND_MODES,
  Container,
  Loader,
  Sprite,
  Spritesheet,
  Texture,
} from "pixi.js";
import { GrenadeTickData } from "../types";
import Grenade from "./Grenade";

const duration = 10;

class GrenadeFlash extends Grenade {
  smokeParticles: Sprite[] = [];

  constructor(data: GrenadeTickData) {
    super({
      ...data,
      end_tick: data.end_tick + duration,
    });

    const sprite = Sprite.from("/assets/images/2d/blind.png");
    sprite.name = "explode";
    sprite.anchor.set(0.5);

    sprite.visible = false;
    this.addChild(sprite);
  }

  update(replayTick: number) {
    const { start_tick, end_tick, detonate_tick } = this.data;

    if (replayTick >= start_tick && replayTick <= end_tick) {
      const sprite = this.getChildByName("explode") as Sprite;
      if (replayTick >= detonate_tick) {
        const tick = replayTick - detonate_tick;
        sprite.x = this.grenade.x;
        sprite.y = this.grenade.y;
        sprite.visible = true;
        sprite.alpha =
          (tick < duration / 2 ? tick : duration - tick) / 10 + 0.1;
        sprite.scale.set((tick < duration / 2 ? tick : duration - tick) + 1);
        this.grenade.visible = false;
      } else {
        this.grenade.visible = true;
        sprite.visible = false;
      }
    }

    super.update(replayTick);
  }
}

export default GrenadeFlash;
