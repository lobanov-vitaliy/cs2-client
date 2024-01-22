import { Container, Graphics, Sprite, TextStyle, Texture, Text } from "pixi.js";
import { getPosition } from "../utils";
import { ReplayObject } from "../types";

export type C4DataType = {
  planted?: {
    tick: number;
    steamid: number;
    x: number;
    y: number;
  };

  attempts_defusing: Array<{
    start_tick: number;
    end_tick: number;
    has_defuser: boolean;
    steamid: number;
  }>;

  defused?: {
    tick: number;
    steamid: number;
  };

  exploded?: {
    tick: number;
  };
};
const PROGRESS_BAR_WIDTH = 30;
const PROGRESS_BAR_HEIGHT = 3;

class C4 extends Container implements ReplayObject {
  data: C4DataType;

  constructor(data: C4DataType) {
    super();
    this.data = data;

    const sprite = Sprite.from(`/assets/weapons/c4.svg`);
    sprite.anchor.set(0.5);
    sprite.scale.set(0.5);
    sprite.name = "2DC4";

    const explode = Sprite.from(`exp_4/0.png`);
    explode.anchor.set(0.5);
    explode.scale.set(1.2);
    explode.visible = false;
    explode.name = "2DC4Explode";

    const progressContainer = new Container();

    const progressBar = new Graphics();
    progressBar.name = "2DC4PlantedProgressBar";

    const progressBarDefusing = new Graphics();
    progressBarDefusing.name = "2DC4PlantedProgressBarDefusing";

    const background = new Graphics();
    background.name = "2DC4ProgressBarBackground";

    const background2 = new Graphics();
    background2.lineStyle(0.5, 0x000000);
    background2.beginFill(0xff0000, 0.4);
    background2.drawRoundedRect(
      this.x - PROGRESS_BAR_WIDTH / 2,
      this.y + 7,
      PROGRESS_BAR_WIDTH,
      PROGRESS_BAR_HEIGHT,
      1.25
    );
    background2.endFill();

    progressContainer.addChild(
      background,
      background2,
      progressBar,
      progressBarDefusing
    );
    progressContainer.name = "2DC4ProgressContainer";

    this.addChild(progressContainer);
    this.addChild(explode);
    this.addChild(sprite);
    this.visible = false;
  }

  get c4() {
    return this.getChildByName("2DC4") as Sprite;
  }

  get explode() {
    return this.getChildByName("2DC4Explode") as Sprite;
  }

  get defusingProgressBar() {
    return this.progressBar.getChildByName(
      "2DC4PlantedProgressBarDefusing"
    ) as Graphics;
  }

  get progressBarBackground() {
    return this.progressBar.getChildByName(
      "2DC4ProgressBarBackground"
    ) as Graphics;
  }

  get plantedProgressBar() {
    return this.progressBar.getChildByName(
      "2DC4PlantedProgressBar"
    ) as Graphics;
  }

  get progressBar() {
    return this.getChildByName("2DC4ProgressContainer") as Container;
  }

  update(replayTick: number) {
    const { planted, defused, exploded, attempts_defusing } = this.data;

    const isDefused = defused && defused.tick < replayTick;
    const isPlanted = planted && replayTick >= planted.tick;
    const isExploded = exploded && replayTick >= exploded.tick;
    const defusing = attempts_defusing.find(
      (attempt) =>
        replayTick >= attempt.start_tick && replayTick <= attempt.end_tick
    );

    this.visible = false;
    this.c4.visible = false;
    this.explode.visible = false;
    this.progressBar.visible = false;
    this.defusingProgressBar.visible = false;
    const maxProgressBarWidth = PROGRESS_BAR_WIDTH - 0.5;

    if (defusing) {
      const width =
        PROGRESS_BAR_WIDTH *
        ((((replayTick - defusing.start_tick) /
          ((defusing.has_defuser ? 5 : 10) * 64)) *
          100) /
          100);

      this.defusingProgressBar.clear();
      this.defusingProgressBar.beginFill(0x00ff00);
      this.defusingProgressBar.drawRoundedRect(
        this.c4.x - maxProgressBarWidth / 2,
        this.c4.y + PROGRESS_BAR_HEIGHT + 8,
        Math.max(maxProgressBarWidth - width, 0),
        PROGRESS_BAR_HEIGHT - 0.5,
        1
      );
      this.defusingProgressBar.endFill();

      this.defusingProgressBar.visible = true;
    }

    if (isExploded) {
      this.visible = true;

      const end = exploded.tick + 67;
      if (replayTick <= end) {
        this.c4.visible = false;
        this.explode.visible = true;
        this.explode.texture = Texture.from(
          `exp_4/${replayTick - exploded.tick}.png`
        );
      }
    } else if (isPlanted) {
      const position = getPosition(planted);
      this.x = position.x;
      this.y = position.y;
      this.visible = true;
      this.c4.visible = true;

      const width =
        PROGRESS_BAR_WIDTH *
        ((((replayTick - planted.tick) / (40 * 64)) * 100) / 100);

      this.plantedProgressBar.clear();
      this.plantedProgressBar.beginFill(0xff0000);
      this.plantedProgressBar.drawRoundedRect(
        this.c4.x - maxProgressBarWidth / 2,
        this.c4.y + 7.25,
        Math.max(maxProgressBarWidth - width, 0),
        PROGRESS_BAR_HEIGHT - 0.5,
        1
      );
      this.plantedProgressBar.endFill();

      const backgroundWidth = PROGRESS_BAR_WIDTH + 3;
      const backgroundHeight = PROGRESS_BAR_HEIGHT + 3;
      this.progressBarBackground.clear();
      this.progressBarBackground.beginFill(0x252a31, 0.8);
      this.progressBarBackground.drawRoundedRect(
        this.c4.x - backgroundWidth / 2,
        this.c4.y + 5.5,
        backgroundWidth,
        backgroundHeight + (defusing ? backgroundHeight - 2.5 : 0),
        2
      );
      this.progressBarBackground.endFill();

      this.progressBar.visible = true;
      if (isDefused) {
        this.c4.tint = 0x00ff00;
        this.progressBar.visible = false;
      } else if (width >= PROGRESS_BAR_WIDTH || replayTick % 64 < 10) {
        this.c4.tint = 0xff0000;
      } else {
        this.c4.tint = 0xffffff;
      }
    }
  }
}

export default C4;
