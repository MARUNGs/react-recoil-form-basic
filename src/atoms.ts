import { atom } from "recoil";

export const country = atom<string[]>({
  key: "country",
  default: [],
});

export const required = atom({
  key: "required",
  default: false,
});

export const wentCountry = atom<string[]>({
  key: "wentCountry",
  default: [],
});

export const favoriteCountries = atom<string[]>({
  key: "favoriteCountries",
  default: [],
});
