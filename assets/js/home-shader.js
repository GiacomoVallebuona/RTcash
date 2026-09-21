(() => {
  const canvas = document.querySelector('[data-home-shader]');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const gl = canvas.getContext('webgl', { alpha: true, antialias: false });
  if (!gl) return;

  const vertex = 'attribute vec2 p; void main(){gl_Position=vec4(p,0.,1.);}';
  const fragment = `precision mediump float;
    uniform vec2 r; uniform float t;
    float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}
    float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
    float fbm(vec2 p){float v=0.,a=.52;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.03+vec2(9.2,4.7);a*=.5;}return v;}
    void main(){vec2 uv=gl_FragCoord.xy/r;vec2 p=(uv-.5)*vec2(r.x/r.y,1.);float smoke=fbm(p*2.15+vec2(t*.035,-t*.022));float cloud=smoothstep(.34,.87,smoke)*smoothstep(1.06,.08,length(p-vec2(.32,-.08)));vec3 red=vec3(.92,.025,.045)*cloud;gl_FragColor=vec4(red,cloud*.72);}`;
  const compile = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  };
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'p');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const resolution = gl.getUniformLocation(program, 'r');
  const time = gl.getUniformLocation(program, 't');
  const started = performance.now();
  let animationFrame = 0;

  const draw = (now) => {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = Math.round(canvas.clientWidth * ratio);
    const height = Math.round(canvas.clientHeight * ratio);
    if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; gl.viewport(0, 0, width, height); }
    gl.uniform2f(resolution, width, height);
    gl.uniform1f(time, (now - started) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    animationFrame = requestAnimationFrame(draw);
  };
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !animationFrame) animationFrame = requestAnimationFrame(draw);
    if (!entry.isIntersecting && animationFrame) { cancelAnimationFrame(animationFrame); animationFrame = 0; }
  });
  observer.observe(canvas);
})();
