/* ── GENERATE CODE STREAM ── */
const codeSnippets = [
  'const world = new System({secure: true});',
  'world.initializeCoreProtocol();',
  'if (user.isAuthorized()) { access = "granted"; }',
  'import { NeuralLink } from "@cyber/core";',
  'packet.encrypt(AES_256_GCM);',
  'socket.emit("identity_verified", {node: "ALPHA-001"});',
  '// Bypassing firewall sub-layers...',
  'console.log("System override successful.");',
  'await node.sync(global_lattice);',
  'return Buffer.from(identity).toString("hex");',
  '<html><head><title>HACKER_SPACE</title></head>',
  'body { font-family: monospace; color: #00ff00; }',
  'while(alive) { code(); eat(); sleep(); }'
];

function buildCodePanel() {
  const inner = document.getElementById('codeInner');
  const doubled = [...codeSnippets, ...codeSnippets, ...codeSnippets];
  doubled.forEach(line => {
      const div = document.createElement('div');
      div.className = 'code-line';
      div.textContent = `> ${line}`;
      inner.appendChild(div);
  });
}
buildCodePanel();

/* ── BACKGROUND PARTICLES ── */
const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = bgCanvas.width = window.innerWidth;
  H = bgCanvas.height = window.innerHeight;
  
  // Update Earth size on resize
  const size = Math.min(W, H) * 0.9;
  earthCanvas.width = earthCanvas.height = size;
}

window.onresize = resize;

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    bgCtx.fillStyle = 'rgba(0, 229, 255, 0.3)';
    bgCtx.beginPath();
    bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    bgCtx.fill();
  }
}

for(let i=0; i<80; i++) particles.push(new Particle());

/* ── EARTH CANVAS ── */
const earthCanvas = document.getElementById('earthCanvas');
const ec = earthCanvas.getContext('2d');
let earthAngle = 0;

const continents = [
  [[35,-5],[37,10],[30,25],[15,37],[10,42],[0,42],[-5,38],[-10,32],[-20,28],[-28,17],[-35,18],[-32,28],[-25,32],[-10,34],[-5,36],[5,38],[15,43],[20,37],[27,34],[35,25],[37,15],[37,5],[35,-5]],
  [[36,28],[40,28],[45,30],[48,33],[50,30],[52,14],[54,9],[57,8],[61,5],[63,14],[65,25],[68,28],[66,33],[60,29],[57,24],[56,28],[52,22],[48,17],[43,16],[38,15],[36,28]],
  [[10,100],[15,108],[20,110],[30,121],[35,119],[38,121],[40,128],[45,135],[50,140],[55,135],[60,140],[65,130],[70,100],[72,80],[68,55],[60,50],[55,38],[45,38],[40,45],[35,55],[30,60],[25,55],[18,55],[10,75],[10,100]],
  [[70,-68],[65,-83],[60,-95],[55,-95],[48,-88],[45,-83],[42,-70],[40,-74],[35,-76],[30,-81],[25,-80],[25,-90],[30,-97],[32,-117],[38,-122],[45,-124],[50,-127],[55,-130],[60,-140],[65,-168],[70,-155],[72,-140],[70,-100],[70,-68]],
  [[10,-75],[5,-78],[0,-80],[-5,-81],[-10,-76],[-18,-70],[-22,-65],[-30,-65],[-35,-65],[-40,-62],[-45,-65],[-50,-70],[-55,-66],[-52,-58],[-45,-52],[-38,-57],[-32,-50],[-22,-42],[-15,-39],[-5,-35],[5,-52],[10,-60],[10,-75]],
  [[-15,130],[-12,135],[-14,142],[-18,146],[-22,150],[-28,153],[-35,150],[-38,145],[-36,137],[-34,116],[-22,114],[-18,122],[-14,126],[-15,130]],
];

function latLngToXY(lat, lng, angle, R) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lng + angle) * Math.PI / 180;
  return {
    x: R * Math.sin(phi) * Math.cos(theta),
    y: R * Math.cos(phi),
    z: R * Math.sin(phi) * Math.sin(theta)
  };
}

function drawEarth() {
  const R = earthCanvas.width / 2;
  const cx = R, cy = R;
  ec.clearRect(0, 0, earthCanvas.width, earthCanvas.height);

  // Ocean & Sphere Base
  ec.beginPath();
  ec.arc(cx, cy, R, 0, Math.PI * 2);
  const ocean = ec.createRadialGradient(cx-R*0.2, cy-R*0.2, R*0.1, cx, cy, R);
  ocean.addColorStop(0, '#001a2d');
  ocean.addColorStop(1, '#000810');
  ec.fillStyle = ocean;
  ec.fill();
  ec.strokeStyle = 'rgba(0, 229, 255, 0.3)';
  ec.stroke();

  // Continents
  const deg = earthAngle;
  continents.forEach(continent => {
    ec.beginPath();
    let first = true;
    let visibleCount = 0;
    
    const pts = continent.map(([lat, lng]) => {
      const p = latLngToXY(lat, lng, deg, R);
      if (p.z > 0) visibleCount++;
      return p;
    });

    if (visibleCount < pts.length * 0.2) return;

    pts.forEach(p => {
      const sx = cx + p.x;
      const sy = cy - p.y;
      if (first) { ec.moveTo(sx, sy); first = false; }
      else ec.lineTo(sx, sy);
    });
    ec.closePath();
    ec.fillStyle = 'rgba(0, 229, 255, 0.15)';
    ec.fill();
    ec.strokeStyle = 'rgba(0, 229, 255, 0.4)';
    ec.lineWidth = 0.5;
    ec.stroke();
  });

  // Grid lines for high-tech feel
  ec.strokeStyle = 'rgba(0, 229, 255, 0.05)';
  for(let i=0; i<360; i+=30) {
    ec.beginPath();
    let first = true;
    for(let lat=-90; lat<=90; lat+=10) {
      const p = latLngToXY(lat, i, deg, R);
      if(p.z < 0) { first = true; continue; }
      if(first) { ec.moveTo(cx+p.x, cy-p.y); first = false; }
      else ec.lineTo(cx+p.x, cy-p.y);
    }
    ec.stroke();
  }

  earthAngle += 0.4; // Rotation speed
}

function loop() {
  bgCtx.fillStyle = '#000810';
  bgCtx.fillRect(0, 0, W, H);
  
  particles.forEach(p => { p.update(); p.draw(); });
  
  // Connections
  bgCtx.strokeStyle = 'rgba(0, 229, 255, 0.05)';
  for(let i=0; i<particles.length; i++) {
      for(let j=i+1; j<particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          if(Math.sqrt(dx*dx + dy*dy) < 100) {
              bgCtx.beginPath();
              bgCtx.moveTo(particles[i].x, particles[i].y);
              bgCtx.lineTo(particles[j].x, particles[j].y);
              bgCtx.stroke();
          }
      }
  }

  drawEarth();
  requestAnimationFrame(loop);
}

// Initial call
resize();
loop();