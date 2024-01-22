import { GrenadeTickData } from "../types";
import Grenade from "./Grenade";
import GrenadeFlash from "./GrenadeFlash";
import GrenadeHE from "./GrenadeHE";
import GrenadeSmoke from "./GrenadeSmoke";

class GrenadeFactory {
  static create(data: GrenadeTickData) {
    switch (data.type) {
      case "smokegrenade":
        return new GrenadeSmoke(data);
      case "hegrenade":
        return new GrenadeHE(data);
      case "flashbang":
        return new GrenadeFlash(data);
      default:
        return new Grenade(data);
    }
  }
}

export default GrenadeFactory;
