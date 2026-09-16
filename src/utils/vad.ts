import { calculateRMS } from "./lib.ts";

export function isSpeech(frame: Float64Array, threshold: number): boolean {
  return calculateRMS(frame) > threshold;
}
