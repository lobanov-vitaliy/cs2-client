import { Container, Graphics, LINE_CAP, Sprite, Texture } from "pixi.js";
import { GrenadeTickData, ReplayObject } from "../types";
import { getPosition, lerp } from "../utils";

function calculateAngle(
  vector1: { x: number; y: number },
  vector2: { x: number; y: number }
) {
  const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
  const magnitude1 = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y);
  const magnitude2 = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);

  const cosTheta = dotProduct / (magnitude1 * magnitude2);
  return Math.acos(cosTheta);
}

class Grenade extends Container implements ReplayObject {
  data: GrenadeTickData;
  smokeParticles: Sprite[] = [];
  trajectoryChangeIndices: number[] = [];
  trajectoryTexture: Texture;

  constructor(data: GrenadeTickData) {
    super();
    this.data = data;

    const sprite = Sprite.from(`/assets/weapons/${data.type}.svg`);
    sprite.anchor.set(0.5);
    sprite.scale.set(0.5);
    sprite.name = "2DGrenade";

    const quality = 256;
    const canvas = document.createElement("canvas");
    canvas.width = quality;
    canvas.height = 1;
    const ctx = canvas.getContext("2d")!;
    const grd = ctx.createLinearGradient(0, 0, quality, 0);

    grd.addColorStop(0, "rgba(255, 255, 255, 0.0)");
    grd.addColorStop(1, "green");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, quality, 1);

    this.trajectoryTexture = Texture.from(canvas);

    const trajectory = new Graphics();
    trajectory.name = "2DGrenadeTrajectory";

    for (let i = 1; i < this.data.x.length - 1; i++) {
      const { x, y } = this.data;
      const vector1 = {
        x: x[i - 1] - x[i - 2],
        y: y[i - 1] - y[i - 2],
      };
      const vector2 = {
        x: x[i] - x[i - 1],
        y: y[i] - y[i - 1],
      };

      if (calculateAngle(vector1, vector2) > 0.17) {
        this.trajectoryChangeIndices.push(i - 1);
      }
    }

    this.visible = false;
    this.addChild(trajectory);
    this.addChild(sprite);
  }

  get id() {
    return this.data.id;
  }

  get grenade() {
    return this.getChildByName("2DGrenade") as Sprite;
  }

  get trajectory() {
    return this.getChildByName("2DGrenadeTrajectory") as Graphics;
  }

  update(replayTick: number) {
    const { start_tick, end_tick, detonate_tick, x, y } = this.data;
    const currentTick = replayTick - start_tick;

    this.trajectory.clear();
    if (replayTick >= start_tick && replayTick <= end_tick) {
      let positionPointX = x[currentTick];
      let positionPointY = y[currentTick];

      if (positionPointX && positionPointY) {
        const startPosition = getPosition({
          x: x[0],
          y: y[0],
        });

        if (replayTick < detonate_tick) {
          this.trajectory.lineStyle({
            width: 2,
            color: this.data.team_number === 3 ? 0x8aacdf : 0xebd995,
            alpha: 0.5,
          });
          this.trajectory.moveTo(startPosition.x, startPosition.y);

          const trajectoryChangeIndices = [
            ...this.trajectoryChangeIndices.filter((i) => i < currentTick),
            currentTick,
          ];

          for (let i = 0; i < trajectoryChangeIndices.length; i++) {
            const linePosition = getPosition({
              x: x[trajectoryChangeIndices[i]],
              y: y[trajectoryChangeIndices[i]],
            });
            this.trajectory.lineTo(linePosition.x, linePosition.y);
          }
        }

        const position = getPosition({
          x: positionPointX,
          y: positionPointY,
        });
        this.grenade.x =
          currentTick > 0 ? lerp(this.x, position.x) : position.x;
        this.grenade.y =
          currentTick > 0 ? lerp(this.y, position.y) : position.y;
      }

      this.visible = true;
    } else {
      this.visible = false;
    }
  }
}

export default Grenade;
