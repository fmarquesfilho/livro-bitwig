// Demonstrações interativas com a Web Audio API.
// Uso no Markdown: <div class="synth-demo" data-demo="oscillator"></div>

(function () {
  "use strict";

  let audioCtx = null;
  function getContext() {
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    Object.assign(node, attrs || {});
    (children || []).forEach((c) => node.append(c));
    return node;
  }

  function slider(label, { min, max, step, value, format }) {
    const input = el("input", { type: "range", min, max, step, value });
    const out = el("output", { textContent: format(value) });
    input.addEventListener("input", () => (out.textContent = format(input.value)));
    return { input, node: el("label", {}, [label, input, out]) };
  }

  function drawScope(canvas, analyser) {
    const ctx2d = canvas.getContext("2d");
    const data = new Float32Array(analyser.fftSize);
    const color = getComputedStyle(document.body).getPropertyValue("--links") || "#4183c4";
    function frame() {
      if (!canvas.isConnected) return;
      canvas.width = canvas.clientWidth * devicePixelRatio;
      canvas.height = canvas.clientHeight * devicePixelRatio;
      analyser.getFloatTimeDomainData(data);
      // Alinha o início no cruzamento por zero para estabilizar a imagem
      let start = 0;
      for (let i = 1; i < data.length / 2; i++) {
        if (data[i - 1] < 0 && data[i] >= 0) { start = i; break; }
      }
      const n = data.length / 2;
      const { width, height } = canvas;
      ctx2d.clearRect(0, 0, width, height);
      ctx2d.strokeStyle = color.trim();
      ctx2d.lineWidth = 2 * devicePixelRatio;
      ctx2d.beginPath();
      for (let i = 0; i < n; i++) {
        const x = (i / n) * width;
        const y = height / 2 - data[start + i] * height * 0.4;
        i === 0 ? ctx2d.moveTo(x, y) : ctx2d.lineTo(x, y);
      }
      ctx2d.stroke();
      requestAnimationFrame(frame);
    }
    frame();
  }

  const demos = {
    oscillator(root) {
      const canvas = el("canvas");
      const wave = el("select", {}, ["sine", "triangle", "square", "sawtooth"].map((w, i) =>
        el("option", { value: w, textContent: ["Senoide", "Triangular", "Quadrada", "Dente de serra"][i] })));
      const freq = slider("Frequência", { min: 55, max: 880, step: 1, value: 220, format: (v) => v + " Hz" });
      const gain = slider("Volume", { min: 0, max: 0.5, step: 0.01, value: 0.15, format: (v) => Math.round(v * 200) + "%" });
      const play = el("button", { type: "button", textContent: "▶ Tocar" });

      let osc = null, amp = null, analyser = null;

      function start() {
        const ac = getContext();
        osc = new OscillatorNode(ac, { type: wave.value, frequency: +freq.input.value });
        amp = new GainNode(ac, { gain: 0 });
        analyser = new AnalyserNode(ac, { fftSize: 2048 });
        osc.connect(amp).connect(analyser).connect(ac.destination);
        amp.gain.setTargetAtTime(+gain.input.value, ac.currentTime, 0.02);
        osc.start();
        drawScope(canvas, analyser);
        play.textContent = "■ Parar";
      }

      function stop() {
        const ac = getContext();
        amp.gain.setTargetAtTime(0, ac.currentTime, 0.02);
        osc.stop(ac.currentTime + 0.2);
        osc = null;
        play.textContent = "▶ Tocar";
      }

      play.addEventListener("click", () => (osc ? stop() : start()));
      wave.addEventListener("change", () => osc && (osc.type = wave.value));
      freq.input.addEventListener("input", () =>
        osc && osc.frequency.setTargetAtTime(+freq.input.value, getContext().currentTime, 0.01));
      gain.input.addEventListener("input", () =>
        amp && amp.gain.setTargetAtTime(+gain.input.value, getContext().currentTime, 0.01));

      root.append(canvas, el("div", { className: "controls" }, [
        play, el("label", {}, ["Forma de onda", wave]), freq.node, gain.node,
      ]));
    },
  };

  document.querySelectorAll(".synth-demo").forEach((root) => {
    const demo = demos[root.dataset.demo];
    if (demo) demo(root);
    else root.textContent = "Demonstração desconhecida: " + root.dataset.demo;
  });
})();
