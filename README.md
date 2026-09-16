# Audio Analyzer

A TypeScript-based audio analysis tool that reads WAV files and provides comprehensive audio metrics, voice activity detection, and waveform visualization. Perfect for preparing audio files for Voice AI and Speech-to-Text (STT) applications.

## Features

- **Audio File Analysis**: Extract detailed information from WAV files including duration, sample rate, channels, and bit depth
- **RMS Calculation**: Compute Root Mean Square audio levels for volume analysis
- **Voice Activity Detection (VAD)**: Identify speech vs silence segments using energy-based thresholding
- **Waveform Visualization**: Generate interactive HTML waveform charts using Plotly
- **Voice AI Compatibility Check**: Verify if audio meets requirements for STT systems (PCM, Mono, 16kHz, 16-bit)
- **Beautiful Console Output**: Colorized terminal output with clear formatting

## Installation

```bash
npm install
```

## Usage

### Development Mode (with hot reload)

```bash
npm run dev -- --file path/to/your/audio.wav
```

### Build and Run

```bash
# Build the project
npm run build

# Run the compiled version
npm start -- --file path/to/your/audio.wav
```

### Default Behavior

If no file is specified, the tool analyzes the sample file:

```bash
npm run dev
```

This will analyze `sample/how_are_you_doing_today.wav` by default.

## Output

The tool generates two outputs:

1. **Console Report**: A detailed analysis printed to the terminal with:
   - File information (duration, sample rate, channels, bit depth)
   - Audio analysis (total samples, RMS level, frame counts)
   - Speech activity statistics with visual bar charts
   - Voice AI compatibility check

2. **Waveform Visualization**: An interactive HTML file (`waveform.html`) that displays the audio waveform using Plotly.js

## Example Output

```
🎵 Audio Analysis Report
────────────────────────────────

📁 File Information
────────────────────────────────
File: sample/how_are_you_doing_today.wav
Duration: 3.45 seconds
Sample Rate: 16000 Hz
Channels: Mono (1)
Bit Depth: 16 bits

📊 Audio Analysis
────────────────────────────────
Total Samples: 55,200
RMS Level: 0.1234
Total Frames: 173
Speech Frames: 120
Silence Frames: 53

🎤 Speech Activity
────────────────────────────────
Speech: 69.4% ████████████████
Silence: 30.6% ███████

🤖 VOICE AI COMPATIBILITY
────────────────────────────────
✓ PCM
✓ Mono
✓ 16 kHz
✓ 16-bit

  READY FOR STT

✨ Analysis Complete
```

## Technical Details

### Voice Activity Detection

The tool uses a simple energy-based VAD algorithm:
- Audio is framed into 20ms segments (320 samples at 16kHz)
- Each frame's RMS energy is calculated
- Frames with energy above the threshold (0.02) are classified as speech
- Speech percentage is calculated from the ratio of speech frames to total frames

### Voice AI Compatibility

For optimal compatibility with Speech-to-Text systems, audio should meet these requirements:
- **Format**: PCM (audio format = 1)
- **Channels**: Mono (single channel)
- **Sample Rate**: 16 kHz
- **Bit Depth**: 16-bit

## Project Structure

```
audio-analyzer/
├── src/
│   ├── index.ts           # Main entry point
│   └── utils/
│       ├── constants.ts   # Configuration constants
│       ├── lib.ts         # Utility functions (RMS, framing)
│       ├── vad.ts         # Voice activity detection
│       └── waveform.ts    # Waveform HTML generation
├── sample/                # Sample audio files
├── package.json
├── tsconfig.json
└── README.md
```

## Dependencies

- **wavefile**: WAV file parsing and manipulation
- **chalk**: Terminal string styling
- **tsx**: TypeScript execution engine

## Development

The project uses TypeScript with ES modules and targets Node.js.

### Build

```bash
npm run build
```

This compiles TypeScript files to the `dist/` directory.

### Scripts

- `npm run dev`: Run in development mode with hot reload
- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Run the compiled JavaScript version

## License

ISC
