type Mount = {
  canvas: HTMLCanvasElement;
  track: HTMLElement;
  caption: HTMLElement;
};

const wallets = [
  { id: "a", x: 0.16, y: 0.3, name: "A" },
  { id: "b", x: 0.38, y: 0.2, name: "B" },
  { id: "c", x: 0.7, y: 0.26, name: "C" },
  { id: "d", x: 0.24, y: 0.68, name: "D" },
  { id: "e", x: 0.52, y: 0.74, name: "E" },
  { id: "f", x: 0.82, y: 0.62, name: "F" },
];

const links: [string, string][] = [
  ["a", "b"],
  ["b", "c"],
  ["a", "d"],
  ["d", "e"],
  ["e", "c"],
  ["c", "f"],
  ["b", "e"],
  ["d", "f"],
];

export function mountNetwork({ canvas, track, caption }: Mount) {
  const context = canvas.getContext("2d");
  if (!context) return () => {};

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let alive = true;
  let frame = 0;
  let width = 1;
  let height = 1;
  let dpr = 1;

  const point = (id: string) => wallets.find((wallet) => wallet.id === id)!;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
  };

  const render = () => {
    const scrollable = Math.max(1, track.offsetHeight - window.innerHeight);
    const progress = reduced ? 1 : clamp(-track.getBoundingClientRect().top / scrollable);
    const conceal = smooth(progress);

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#102236";
    context.fillRect(0, 0, width, height);

    const pool = { x: width * 0.5, y: height * 0.48 };
    if (conceal > 0.02) {
      context.globalAlpha = conceal;
      context.strokeStyle = "#AFCBE2";
      context.lineWidth = 1;
      context.strokeRect(pool.x - 92, pool.y - 54, 184, 108);
      context.fillStyle = "#91A8BA";
      context.font = "12px Outfit, system-ui, sans-serif";
      context.textAlign = "center";
      context.fillText("Shielded pool", pool.x, pool.y + 4);
      context.globalAlpha = 1;
    }

    context.lineWidth = 1;
    for (const [from, to] of links) {
      const start = point(from);
      const end = point(to);
      context.globalAlpha = 0.8 * (1 - conceal);
      context.strokeStyle = "#AFCBE2";
      context.beginPath();
      context.moveTo(start.x * width, start.y * height);
      context.lineTo(end.x * width, end.y * height);
      context.stroke();
    }

    const boundary: [typeof wallets[number], { x: number; y: number }][] = [
      [point("a"), { x: pool.x - 92, y: pool.y }],
      [{ ...point("f") }, { x: pool.x + 92, y: pool.y }],
    ];
    context.globalAlpha = conceal;
    context.setLineDash([4, 4]);
    for (const [wallet, edge] of boundary) {
      context.beginPath();
      context.moveTo(wallet.x * width, wallet.y * height);
      context.lineTo(edge.x, edge.y);
      context.stroke();
    }
    context.setLineDash([]);
    context.globalAlpha = 1;

    for (const wallet of wallets) {
      const x = wallet.x * width;
      const y = wallet.y * height;
      context.fillStyle = "#081522";
      context.strokeStyle = "#AFCBE2";
      context.lineWidth = 1;
      context.beginPath();
      context.arc(x, y, 14, 0, Math.PI * 2);
      context.fill();
      context.stroke();
      context.fillStyle = "#F3F7FA";
      context.font = "12px Outfit, system-ui, sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(wallet.name, x, y + 0.5);
    }

    caption.textContent =
      conceal < 0.45
        ? "A public transfer draws a line anyone can follow."
        : "Inside the pool, that line is not published. Deposit and withdrawal still are. This is a concept.";
  };

  const loop = () => {
    if (!alive) return;
    render();
    if (!reduced) frame = requestAnimationFrame(loop);
  };

  resize();
  const observer = new ResizeObserver(() => {
    resize();
    render();
  });
  observer.observe(canvas);
  loop();

  return () => {
    alive = false;
    cancelAnimationFrame(frame);
    observer.disconnect();
  };
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smooth(value: number) {
  const shifted = clamp((value - 0.08) / 0.75);
  return shifted * shifted * (3 - 2 * shifted);
}
