export function calculateRMS(samples: Float64Array): number {
  let sum = 0;
  for (const sample of samples) {
    sum += sample * sample;
  }
  return Math.sqrt(sum / samples.length);
}

export function frameAudio(
  samples: Float64Array,
  frameSize: number,
): Float64Array[] {
  const frames: Float64Array[] = [];

  for (let i = 0; i < samples.length; i += frameSize) {
    const frame = samples.slice(i, i + frameSize);

    // Ignore incomplete final frame
    if (frame.length === frameSize) {
      frames.push(frame);
    }
  }

  return frames;
}
