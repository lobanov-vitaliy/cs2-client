const pistols = [
  "c75za",
  "deagle",
  "elite",
  "fiveseven",
  "glock",
  "hkp2000",
  "tec9",
  "usp_silencer",
  "p250",
  "revolver",
];

const utilities = [
  "flashbang",
  "hegrenade",
  "smokegrenade",
  "molotov",
  "incgrenade",
  "taser",
];

export const isC4 = (name: string) => name === "c4";
export const isKit = (name: string) => name === "kit";
export const isKnife = (name: string) => name.includes("knife");
export const isSecondary = (name: string) => pistols.includes(name);
export const isUtility = (name: string) => utilities.includes(name);
export const isPrimary = (name: string) =>
  !isSecondary(name) &&
  !isUtility(name) &&
  !isKnife(name) &&
  !isC4(name) &&
  !isKit(name);
