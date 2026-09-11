(() => {
  const host = document.querySelector('[data-constellation]');
  const canvas = host?.querySelector('.constellation-canvas');
  if (!host || !canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarsePointer = window.matchMedia('(pointer: coarse)');
  const mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000, vx: 0, vy: 0, radius: 220 };
  const spacing = 62;
  let width = 0;
  let height = 0;
  let dpr = 1;
  let nodes = [];
  let frame = 0;
  let lastTime = performance.now();

  const initNodes = () => {
    nodes = [];
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;
    for (let column = 0; column < cols; column += 1) {
      for (let row = 0; row < rows; row += 1) {
        const x = column * spacing;
        const y = row * spacing;
        nodes.push({
          x, y, vx: 0, vy: 0, baseX: x, baseY: y,
          radius: Math.random() * 1.1 + 1.1,
          label: `${(column * 7).toString(16).toUpperCase()}:${(row * 11).toString(16).toUpperCase()}`,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }
  };

  const resize = () => {
    const rect = host.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initNodes();
    draw(performance.now(), true);
    schedule();
  };

  const draw = (now, staticFrame = false) => {
    const dt = staticFrame ? 0 : Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    mouse.vx = (mouse.x - mouse.prevX) / ((dt * 1000) || 1);
    mouse.vy = (mouse.y - mouse.prevY) / ((dt * 1000) || 1);
    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;
    const speed = Math.hypot(mouse.vx, mouse.vy);
    ctx.clearRect(0, 0, width, height);

    for (const node of nodes) {
      node.pulse += dt * 3;
      const dx = mouse.x - node.x;
      const dy = mouse.y - node.y;
      const distance = Math.hypot(dx, dy);
      if (distance < mouse.radius && distance > 0 && !staticFrame) {
        const force = (1 - distance / mouse.radius) * (1100 + speed * 110);
        const angle = Math.atan2(dy, dx);
        node.vx -= Math.cos(angle) * force * dt;
        node.vy -= Math.sin(angle) * force * dt;
      }
      if (!staticFrame) {
        node.vx += (node.baseX - node.x) * 18 * dt;
        node.vy += (node.baseY - node.y) * 18 * dt;
        node.vx *= 0.82;
        node.vy *= 0.82;
        node.x += node.vx * dt * 60;
        node.y += node.vy * dt * 60;
      }
    }

    const maxConnection = 82;
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      for (let j = i + 1; j < nodes.length; j += 1) {
        const other = nodes[j];
        const distance = Math.hypot(node.x - other.x, node.y - other.y);
        if (distance >= maxConnection) continue;
        ctx.strokeStyle = `rgba(229, 9, 20, ${(1 - distance / maxConnection) * 0.16})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }

    for (const node of nodes) {
      const distance = Math.hypot(mouse.x - node.x, mouse.y - node.y);
      const active = distance < mouse.radius;
      const alpha = active ? 0.95 : 0.27 + Math.sin(node.pulse) * 0.08;
      const radius = active ? node.radius * 2 : node.radius + Math.sin(node.pulse) * 0.25;
      ctx.fillStyle = `rgba(${active ? '255, 61, 71' : '229, 9, 20'}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, Math.max(0.5, radius), 0, Math.PI * 2);
      ctx.fill();
      if (distance < 86 && !staticFrame) {
        const ring = ((node.pulse * 16) % 28) + 4;
        ctx.strokeStyle = `rgba(255, 121, 128, ${(1 - ring / 34) * 0.34})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, ring, 0, Math.PI * 2);
        ctx.stroke();
        ctx.font = '8px ui-monospace, SFMono-Regular, Consolas, monospace';
        ctx.fillStyle = 'rgba(255, 135, 141, .8)';
        ctx.fillText(node.label, node.x + 10, node.y - 10);
      }
    }

    if (!reducedMotion.matches && !staticFrame) frame = requestAnimationFrame(draw);
  };

  const pointerMove = (event) => {
    if (coarsePointer.matches) return;
    const rect = host.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
    mouse.x = isInside ? x : -1000;
    mouse.y = isInside ? y : -1000;
  };
  const pointerLeave = () => { mouse.x = -1000; mouse.y = -1000; };
  const schedule = () => {
    cancelAnimationFrame(frame);
    if (reducedMotion.matches) return;
    lastTime = performance.now();
    frame = requestAnimationFrame(draw);
  };
  const restart = () => {
    draw(performance.now(), true);
    schedule();
  };

  resize();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pointermove', pointerMove, { passive: true });
  window.addEventListener('blur', pointerLeave, { passive: true });
  reducedMotion.addEventListener?.('change', restart);
})();
