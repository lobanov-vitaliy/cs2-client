import {
  Container,
  DEG_TO_RAD,
  Graphics,
  Sprite,
  Text,
  TextStyle,
  Texture,
} from "pixi.js";
import { PlayerTickData } from "../types";
import { getPosition, lerp } from "../utils";
import { isC4 } from "@/app/utils/weapon";

const radius = 25;

class Player extends Container {
  team: number;
  steamid: string;
  ticks: PlayerTickData;
  money = 0;
  kills = 0;
  deaths = 0;
  assists = 0;
  balance = 0;
  blindEffect = {
    duration: 0,
    current: 0,
  };
  hp = 100;
  inventory: string[] = [];

  constructor(data: {
    team_num: number;
    steamid: string;
    name: string;
    ticks: PlayerTickData;
    kills: number;
    deaths: number;
    assists: number;
    balance: number;
    weapon: string;
    hp?: number;
    inventory: string[];
  }) {
    super();
    this.team = data.team_num;
    this.name = data.name;
    this.steamid = data.steamid;
    this.ticks = data.ticks;
    this.kills = data.kills;
    this.deaths = data.deaths;
    this.assists = data.assists;
    this.balance = data.balance;
    this.hp = data.hp || 100;
    this.inventory = data.inventory;

    this.visible = false;

    const sprite = Sprite.from("/assets/images/2DPlayer.png");
    sprite.anchor.set(0.5);
    sprite.width = 37;
    sprite.height = 37;
    sprite.tint = this.color;
    sprite.name = "2DPlayer";
    this.addChild(sprite);

    const dead = Sprite.from("/assets/images/dead.png");
    dead.anchor.set(0.5);
    dead.scale.set(0.65);
    dead.tint = this.color;
    dead.name = "2DPlayerDead";
    this.addChild(dead);

    const weapon = Sprite.from(`/assets/weapons/${data.weapon}.svg`);
    weapon.anchor.y = 0.5;
    weapon.scale.set(0.35);
    weapon.tint = this.color;
    weapon.name = "2DPlayerWeapon";
    weapon.position.set(14, 0);
    this.addChild(weapon);

    const util = new Sprite();
    util.anchor.set(0.5);

    util.name = "2DPlayerUtil";
    util.position.set(0, 0);
    this.addChild(util);

    const blind = new Graphics();
    blind.name = "2DPlayerBlind";
    this.addChild(blind);

    const blindIcon = Sprite.from("/assets/images/2d/shooter_blind.png");
    blindIcon.anchor.set(0.5);
    blindIcon.scale.set(0.35);
    blindIcon.name = "2DPlayerBlindIcon";

    this.addChild(blindIcon);

    const playerNicknameContainer = new Container();
    const playerNickname = new Text(
      this.name,
      new TextStyle({
        fill: this.color,
        fontSize: 14,
        align: "center",
      })
    );
    playerNickname.anchor.set(0.5);
    playerNickname.position.set(0, -30);

    const playerNicknameBackground = new Graphics();
    const backgroundWidth = playerNickname.width + 16;
    const backgroundHeight = playerNickname.height + 4;
    playerNicknameBackground.lineStyle(0);
    playerNicknameBackground.beginFill(0x252a31, 0.7);
    playerNicknameBackground.drawRoundedRect(
      playerNickname.x - backgroundWidth / 2,
      playerNickname.y - backgroundHeight / 2,
      backgroundWidth,
      backgroundHeight,
      4
    );
    playerNicknameBackground.endFill();
    playerNicknameBackground.alpha = 1;
    playerNicknameContainer.addChild(playerNicknameBackground, playerNickname);

    this.addChild(playerNicknameContainer);
  }

  get blindIcon() {
    return this.getChildByName("2DPlayerBlindIcon") as Sprite;
  }

  get blind() {
    return this.getChildByName("2DPlayerBlind") as Graphics;
  }

  get player() {
    return this.getChildByName("2DPlayer") as Sprite;
  }

  get weapon() {
    return this.getChildByName("2DPlayerWeapon") as Sprite;
  }

  get util() {
    return this.getChildByName("2DPlayerUtil") as Sprite;
  }

  get color() {
    return this.team === 3 ? 0x8aacdf : 0xebd995;
  }

  get json() {
    return {
      name: this.name,
      team: this.team,
      steamid: this.steamid,
    };
  }

  update(replayTick: number) {
    const { start_tick, x, y, view, dead } = this.ticks;
    const currentTick = replayTick - start_tick;

    if (start_tick > replayTick) {
      this.player.visible = false;
      return;
    }

    this.visible = true;
    this.player.visible = true;
    this.player.tint = this.color;
    this.weapon.visible = true;
    this.util.visible = false;
    this.blind.visible = false;
    this.blindIcon.visible = false;
    this.alpha = 1;

    if (this.blindEffect.current > 0 && this.hp > 0) {
      const startAngle = -Math.PI / 2;
      const progress = Math.min(
        (this.blindEffect.current / this.blindEffect.duration) * 100,
        100
      );

      const endAngle = startAngle + (progress / 100) * (Math.PI * 2);
      this.blind.clear();
      this.blind.beginFill(0xffffff, 0.4);
      this.blind.moveTo(0, 0);
      this.blind.arc(0, 0, radius, startAngle, endAngle);
      this.blind.lineTo(0, 0);
      this.blind.endFill();
      this.blind.visible = true;

      if (
        (this.blindEffect.duration > 5 &&
          this.blindEffect.current + 2 - this.blindEffect.duration > 0) ||
        (this.blindEffect.duration > 3.5 &&
          this.blindEffect.current + 0.5 - this.blindEffect.duration > 0)
      ) {
        this.blindIcon.visible = true;
      }
    }

    this.getChildByName("2DPlayerDead").visible = false;

    let positionPointX = x[currentTick];
    let positionPointY = y[currentTick];
    let viewPointX = view[currentTick];

    const isHasC4 = this.inventory.find(isC4);
    const isDead = dead && dead.tick < replayTick;

    if (isHasC4) {
      this.util.texture = Texture.from("/assets/weapons/c4.svg");
      this.util.tint = 0xff0000;
      this.util.scale.set(0.4);
      this.util.visible = true;
    }

    if (isDead) {
      positionPointX = dead.x;
      positionPointY = dead.y;

      this.alpha = 0.2;
      this.player.visible = false;
      this.weapon.visible = false;
      this.getChildByName("2DPlayerDead").visible = true;
    }

    const position = getPosition({
      x: positionPointX,
      y: positionPointY,
    });

    this.x = lerp(this.x, position.x);
    this.y = lerp(this.y, position.y);

    this.player.rotation = -viewPointX * DEG_TO_RAD + Math.PI / 2;
  }

  fire = () => {
    const length = 2000;
    let bullet = new Graphics();

    const rotation = this.player.rotation;
    bullet.lineStyle(2, this.team === 3 ? 0x8aacdf : 0xebd995);
    bullet.moveTo(this.x, this.y);

    bullet.lineTo(
      this.x + length * Math.cos(rotation + (3 * Math.PI) / 2),
      this.y + length * Math.sin(rotation + (3 * Math.PI) / 2)
    );

    return bullet;
  };

  hurt = () => {
    this.player.tint = 0xff0000;
  };

  changeWeapon = (weapon?: string) => {
    if (weapon) {
      this.weapon.texture = Texture.from(`/assets/weapons/${weapon}.svg`);
    }
  };
}

export default Player;
