'use client';

import React, { useEffect, useRef, useState } from 'react';

interface GridNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  radius: number;
  label: string;
  pulse: number;
}

const supportWords = ['seguridad', 'contabilidad', 'eficiencia', 'escalabilidad'];

export default function ConstellationGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [typedWord, setTypedWord] = useState('');

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
      setTypedWord(supportWords[0]);
      return undefined;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const word = supportWords[wordIndex];
      if (!deleting) {
        charIndex = Math.min(charIndex + 1, word.length);
        setTypedWord(word.slice(0, charIndex));
        if (charIndex === word.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1500);
          return;
        }
        timer = window.setTimeout(tick, 92);
        return;
      }

      charIndex = Math.max(charIndex - 1, 0);
      setTypedWord(word.slice(0, charIndex));
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % supportWords.length;
        timer = window.setTimeout(tick, 360);
        return;
      }
      timer = window.setTimeout(tick, 52);
    };

    timer = window.setTimeout(tick, 280);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000, vx: 0, vy: 0, radius: 220 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = performance.now();
    let nodes: GridNode[] = [];

    const initNodes = () => {
      nodes = [];
      const spacing = 62;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      for (let column = 0; column < cols; column += 1) {
        for (let row = 0; row < rows; row += 1) {
          const x = column * spacing;
          const y = row * spacing;
          nodes.push({ x, y, vx: 0, vy: 0, baseX: x, baseY: y, radius: Math.random() * 1.1 + 1.1, label: `${(column * 7).toString(16).toUpperCase()}:${(row * 11).toString(16).toUpperCase()}`, pulse: Math.random() * Math.PI * 2 });
        }
      }
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes();
    };

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const speed = Math.hypot(mouse.vx, mouse.vy);
      mouse.vx = (mouse.x - mouse.prevX) / ((dt * 1000) || 1);
      mouse.vy = (mouse.y - mouse.prevY) / ((dt * 1000) || 1);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      context.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.pulse += dt * 3;
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distance = Math.hypot(dx, dy);
        if (!reducedMotion.matches && distance < mouse.radius && distance > 0) {
          const force = (1 - distance / mouse.radius) * (1100 + speed * 110);
          const angle = Math.atan2(dy, dx);
          node.vx -= Math.cos(angle) * force * dt;
          node.vy -= Math.sin(angle) * force * dt;
        }
        if (!reducedMotion.matches) {
          node.vx += (node.baseX - node.x) * 18 * dt;
          node.vy += (node.baseY - node.y) * 18 * dt;
          node.vx *= 0.82;
          node.vy *= 0.82;
          node.x += node.vx * dt * 60;
          node.y += node.vy * dt * 60;
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const distance = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (distance >= 82) continue;
          context.strokeStyle = `rgba(229, 9, 20, ${(1 - distance / 82) * 0.16})`;
          context.lineWidth = 0.7;
          context.beginPath();
          context.moveTo(nodes[i].x, nodes[i].y);
          context.lineTo(nodes[j].x, nodes[j].y);
          context.stroke();
        }
      }

      for (const node of nodes) {
        const distance = Math.hypot(mouse.x - node.x, mouse.y - node.y);
        const active = distance < mouse.radius;
        const alpha = active ? 0.95 : 0.27 + Math.sin(node.pulse) * 0.08;
        context.fillStyle = `rgba(${active ? '255, 61, 71' : '229, 9, 20'}, ${alpha})`;
        context.beginPath();
        context.arc(node.x, node.y, Math.max(0.5, active ? node.radius * 2 : node.radius), 0, Math.PI * 2);
        context.fill();
      }

      if (!reducedMotion.matches) frame = requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const bounds = canvas.getBoundingClientRect();
      mouse.x = event.clientX - bounds.left;
      mouse.y = event.clientY - bounds.top;
    };
    const resetPointer = () => { mouse.x = -1000; mouse.y = -1000; };

    resize();
    render(performance.now());
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('blur', resetPointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', resetPointer);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#090909] text-white">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="relative z-10 px-4 text-center">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-white/65">Presentamos RTcash</p>
        <h1 className="font-mono text-7xl font-black uppercase leading-none tracking-[-0.09em] text-[#e50914] md:text-9xl">RTcash</h1>
        <p className="mt-5 font-sans text-lg text-white/80">Te ayudamos en:</p>
        <p className="mt-1 min-h-[1.2em] font-sans text-4xl font-semibold tracking-tight text-[#f5a1a5] md:text-6xl" aria-live="polite">{typedWord}</p>
      </div>
    </section>
  );
}
