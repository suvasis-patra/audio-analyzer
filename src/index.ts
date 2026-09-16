import wavefile from "wavefile";
import fs from "node:fs";
import { parseArgs } from "node:util";
import { calculateRMS, frameAudio } from "./utils/lib.ts";
import { frameSize, thresHold } from "./utils/constants.ts";
import { isSpeech } from "./utils/vad.ts";
import { generateWaveform } from "./utils/waveform.ts";
import chalk from "chalk";

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    file: { type: "string", default: "sample/how_are_you_doing_today.wav" },
  },
});

const buffer = fs.readFileSync(values.file);

const wav = new wavefile.WaveFile(buffer);
const samples = wav.getSamples();
const sampleRate = (wav.fmt as any).sampleRate;
const duration = samples.length / sampleRate;
const channelCount = (wav.fmt as any).numChannels;
const channel =
  channelCount === 1 ? "Mono" : channelCount === 2 ? "Stereo" : "Unknown";
const bitDepth = (wav.fmt as any).bitsPerSample;
const audioFormat = (wav.fmt as any).audioFormat || 1;
const rms = calculateRMS(samples);
const frames = frameAudio(samples, frameSize);
const speechFrames = frames.filter((f) => isSpeech(f, thresHold));
const speechParcentage = (speechFrames.length / frames.length) * 100;
const silenceParcentage = 100 - speechParcentage;

const time = Array.from({ length: samples.length }, (_, i) => i / sampleRate);
generateWaveform(time, samples);

// Beautiful output
console.log("\n" + chalk.bold.cyan("🎵 Audio Analysis Report"));
console.log(chalk.gray("─".repeat(40)));

console.log("\n" + chalk.bold.yellow("📁 File Information"));
console.log(chalk.gray("─".repeat(40)));
console.log(`${chalk.green("File:")} ${values.file}`);
console.log(`${chalk.green("Duration:")} ${duration.toFixed(2)} seconds`);
console.log(`${chalk.green("Sample Rate:")} ${sampleRate} Hz`);
console.log(`${chalk.green("Channels:")} ${channel} (${channelCount})`);
console.log(`${chalk.green("Bit Depth:")} ${bitDepth} bits`);

console.log("\n" + chalk.bold.yellow("📊 Audio Analysis"));
console.log(chalk.gray("─".repeat(40)));
console.log(`${chalk.green("Total Samples:")} ${samples.length.toLocaleString()}`);
console.log(`${chalk.green("RMS Level:")} ${rms.toFixed(4)}`);
console.log(`${chalk.green("Total Frames:")} ${frames.length}`);
console.log(`${chalk.green("Speech Frames:")} ${speechFrames.length}`);
console.log(`${chalk.green("Silence Frames:")} ${frames.length - speechFrames.length}`);

console.log("\n" + chalk.bold.yellow("🎤 Speech Activity"));
console.log(chalk.gray("─".repeat(40)));
const speechBar = "█".repeat(Math.round(speechParcentage / 5));
const silenceBar = "█".repeat(Math.round(silenceParcentage / 5));
console.log(`${chalk.green("Speech:")} ${speechParcentage.toFixed(1)}% ${chalk.cyan(speechBar)}`);
console.log(`${chalk.green("Silence:")} ${silenceParcentage.toFixed(1)}% ${chalk.gray(silenceBar)}`);

// Voice AI Compatibility Check
const isPCM = audioFormat === 1;
const isMono = channelCount === 1;
const is16kHz = sampleRate === 16000;
const is16bit = bitDepth === 16;
const isCompatible = isPCM && isMono && is16kHz && is16bit;

console.log("\n" + chalk.bold.magenta("🤖 VOICE AI COMPATIBILITY"));
console.log(chalk.gray("─".repeat(40)));
console.log(`${isPCM ? chalk.green("✓") : chalk.red("✗")} PCM`);
console.log(`${isMono ? chalk.green("✓") : chalk.red("✗")} Mono`);
console.log(`${is16kHz ? chalk.green("✓") : chalk.red("✗")} 16 kHz`);
console.log(`${is16bit ? chalk.green("✓") : chalk.red("✗")} 16-bit`);

if (isCompatible) {
  console.log("\n" + chalk.bold.green("  READY FOR STT"));
} else {
  console.log("\n" + chalk.bold.red("  NOT READY FOR STT"));
}

console.log("\n" + chalk.bold.cyan("✨ Analysis Complete") + "\n");
