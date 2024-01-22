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

class GrenadeHE extends Grenade {
  smokeParticles: Sprite[] = [];

  constructor(data: GrenadeTickData) {
    super({
      ...data,
      end_tick: data.end_tick + 17,
    });

    const sprite = Sprite.from(`he-0`);
    sprite.name = "explode";
    sprite.anchor.set(0.5);
    sprite.scale.set(1.1);
    sprite.visible = false;
    this.addChild(sprite);
  }

  update(replayTick: number) {
    const { start_tick, end_tick, detonate_tick } = this.data;

    if (replayTick >= start_tick && replayTick <= end_tick) {
      const sprite = this.getChildByName("explode") as Sprite;
      if (replayTick >= detonate_tick) {
        sprite.visible = true;
        sprite.x = this.grenade.x;
        sprite.y = this.grenade.y;
        this.grenade.visible = false;

        sprite.texture = Texture.from(`he-${replayTick - detonate_tick}`);
      } else {
        this.grenade.visible = true;
        sprite.visible = false;
      }
    }

    super.update(replayTick);
  }
}

export default GrenadeHE;
