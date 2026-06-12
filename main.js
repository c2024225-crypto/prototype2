// 基本セット
const { Engine, Render, Runner, Bodies, Composite, Events } = Matter;

const canvas = document.getElementById("world");
canvas.width = 400;
canvas.height = 600;

const engine = Engine.create();
const world = engine.world;

// 描画
const render = Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    width: 400,
    height: 600,
    wireframes: false,
    background: "#222"
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// 盤面の壁
const walls = [
  Bodies.rectangle(200, 0, 400, 20, { isStatic: true }),
  Bodies.rectangle(200, 600, 400, 20, { isStatic: true }),
  Bodies.rectangle(0, 300, 20, 600, { isStatic: true }),
  Bodies.rectangle(400, 300, 20, 600, { isStatic: true })
];
Composite.add(world, walls);

// 釘を配置
function addPin(x, y) {
  const pin = Bodies.circle(x, y, 5, {
    isStatic: true,
    render: { fillStyle: "#ccc" }
  });
  Composite.add(world, pin);
}

// 釘のグリッド
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 7; col++) {
    const offset = (row % 2) * 20;
    addPin(80 + col * 40 + offset, 100 + row * 40);
  }
}

// クリックで玉を落とす
canvas.addEventListener("click", () => {
  const ball = Bodies.circle(200, 50, 7, {
    restitution: 0.6,
    friction: 0.01,
    render: { fillStyle: "#ffcc00" }
  });
  Composite.add(world, ball);
});
