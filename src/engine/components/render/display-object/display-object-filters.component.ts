import { FiltersEnum } from "libs/enums";

export type DisplayObjectFiltersComponent = {
  filters: (OldFilmFilterType | RGBSplitFilterType)[];
};

export type OldFilmFilterType = {
  type: FiltersEnum.OLD_FILM;

  sepia?: number;
  noise?: number;
  noiseSize?: number;
  scratch?: number;
  scratchDensity?: number;
  scratchWidth?: number;
  vignetting?: number;
  vignettingAlpha?: number;
  vignettingBlur?: number;

  seed?: number;
};

export type RGBSplitFilterType = {
  type: FiltersEnum.RGB_SPLIT;

  r: [number, number];
  g: [number, number];
  b: [number, number];
};
