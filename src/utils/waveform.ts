import fs from "node:fs";
export function generateWaveform(
  time: number[],
  samples: Float64Array<ArrayBufferLike>,
) {
  const html = `
<!DOCTYPE html>

<html>
<head>
  <meta charset="UTF-8">

  <script src="https://cdn.plot.ly/plotly-2.35.2.min.js"></script>

  <title>Waveform</title>
</head>

<body>

  <h1>Audio Waveform</h1>

  <div id="waveform"></div>

  <script>

    const time = ${JSON.stringify(time)};
    const samples = ${JSON.stringify(samples)};

    Plotly.newPlot(
      "waveform",
      [{
        x: time,
        y: samples,
        type: "scatter",
        mode: "lines"
      }],
      {
        xaxis: {
          title: "Time (seconds)"
        },
        yaxis: {
          title: "Amplitude"
        }
      }
    );

  </script>

</body>
</html>
`;
  fs.writeFileSync("waveform.html", html);
}
