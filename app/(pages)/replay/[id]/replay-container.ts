type MapType = { name: string; x: number; y: number; scale: number };

class ReplayContainer {
  _map: MapType | null = null;

  set map(map: MapType) {
    this._map = map;
  }

  get map() {
    return this._map!;
  }
}

export default new ReplayContainer();
