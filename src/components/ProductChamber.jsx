"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* =========================================================================
   1) PRODUCT CONFIG - LOCAL IMAGES USE KARO
   ========================================================================= */

const PRODUCTS = [
  {
    id: "aeon-01",
    name: "AEON — NO. 01",
    tagline: "Eau de parfum, 50ml",
    accent: "#5ee7ff",
    bgFrom: "#0d1b22",
    bgTo: "#07080b",
    imageURL: "/images/product/perfume.png", // ← YEH FILE HONI CHAHIYE
  },
  {
    id: "strata-runner",
    name: "STRATA RUNNER",
    tagline: "Knit upper, foam sole",
    accent: "#ff8a5b",
    bgFrom: "#241408",
    bgTo: "#07080b",
    imageURL: "/images/product/shoe.png",
  },
  {
    id: "meridian-9",
    name: "MERIDIAN IX",
    tagline: "Automatic, 40mm case",
    accent: "#9b7bff",
    bgFrom: "#170f26",
    bgTo: "#07080b",
    imageURL: "/images/product/watch.png",
  },
  {
    id: "drift-pods",
    name: "DRIFT PODS",
    tagline: "Over-ear, wireless",
    accent: "#5ee7ff",
    bgFrom: "#0a2018",
    bgTo: "#07080b",
    imageURL: "/images/product/headphones.png",
  },
  {
    id: "halo-frame",
    name: "HALO FRAME",
    tagline: "Polarized, titanium",
    accent: "#ff8a5b",
    bgFrom: "#22130f",
    bgTo: "#07080b",
    imageURL: "/images/product/sunglasses.png",
  },
];

/* =========================================================================
   2) PARTICLE SAMPLING 
   ========================================================================= */

const CANVAS_SIZE = 220;
const ALPHA_THRESHOLD = 10;

function buildFromImageData(imgData, size, n) {
  const data = imgData.data;
  const validIdx = [];

  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const i = (py * size + px) * 4;
      if (data[i + 3] > ALPHA_THRESHOLD) validIdx.push(px, py);
    }
  }

  const positions = new Float32Array(n * 3);
  const colors = new Float32Array(n * 3);

  if (validIdx.length === 0) {
    // Agar image transparent hai to random particles
    for (let i = 0; i < n; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1.6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      colors[i * 3] = 0.8;
      colors[i * 3 + 1] = 0.8;
      colors[i * 3 + 2] = 1;
    }
    return { positions, colors };
  }

  const pairCount = validIdx.length / 2;
  const cell = 1 / size;

  for (let i = 0; i < n; i++) {
    const pick = Math.floor(Math.random() * pairCount) * 2;
    const px = validIdx[pick];
    const py = validIdx[pick + 1];

    const jx = (Math.random() - 0.5) * cell;
    const jy = (Math.random() - 0.5) * cell;

    const nx = px / size + jx - 0.5;
    const ny = py / size + jy - 0.5;

    const di = (py * size + px) * 4;
    const r = data[di] / 255;
    const g = data[di + 1] / 255;
    const b = data[di + 2] / 255;
    const brightness = (r + g + b) / 3;

    positions[i * 3] = nx * 2;
    positions[i * 3 + 1] = -ny * 2;
    positions[i * 3 + 2] = (brightness - 0.5) * 0.35 + (Math.random() - 0.5) * 0.04;

    colors[i * 3] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;
  }

  return { positions, colors };
}

function sampleFromImageURL(url, n) {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = CANVAS_SIZE;
        canvas.height = CANVAS_SIZE;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        const scale = Math.max(CANVAS_SIZE / img.width, CANVAS_SIZE / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.drawImage(img, (CANVAS_SIZE - w) / 2, (CANVAS_SIZE - h) / 2, w, h);

        const imgData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        const result = buildFromImageData(imgData, CANVAS_SIZE, n);
        resolve(result);
      } catch (error) {
        console.warn("Canvas error, using fallback:", error);
        resolve(fallbackParticles(n));
      }
    };

    img.onerror = () => {
      console.warn(`Failed to load: ${url}, using fallback`);
      resolve(fallbackParticles(n));
    };

    img.src = url;
  });
}

function fallbackParticles(n) {
  const positions = new Float32Array(n * 3);
  const colors = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.random() * 0.9;
    positions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
    positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
    positions[i * 3 + 2] = Math.cos(phi) * r * 0.4;

    colors[i * 3] = 0.3 + Math.random() * 0.7;
    colors[i * 3 + 1] = 0.3 + Math.random() * 0.7;
    colors[i * 3 + 2] = 0.3 + Math.random() * 0.7;
  }
  return { positions, colors };
}

/* =========================================================================
   3) THE COMPONENT
   ========================================================================= */

const PARTICLE_COUNT = 7000;
const VAPORIZE_DUR = 0.85;
const DRIFT_DUR = 0.45;
const REFORM_DUR = 1.05;

function easeInCubic(t) { return t * t * t; }
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function makeBackdropTexture(from, to) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(128, 150, 10, 128, 150, 190);
  g.addColorStop(0, from);
  g.addColorStop(1, to);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

export default function ProductChamber() {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState("STABLE");
  const [productName, setProductName] = useState(PRODUCTS[0].name);
  const [tagline, setTagline] = useState(PRODUCTS[0].tagline);
  const [accent, setAccent] = useState(PRODUCTS[0].accent);
  const [specVisible, setSpecVisible] = useState(true);

  const triggerRef = useRef(() => { });

  useEffect(() => {
    let cancelled = false;
    const mount = mountRef.current;

    (async () => {
      const cache = new Map();

      for (let i = 0; i < PRODUCTS.length; i++) {
        if (cancelled) return;
        const data = await sampleFromImageURL(PRODUCTS[i].imageURL, PARTICLE_COUNT);
        cache.set(i, data);
        console.log(`Loaded ${PRODUCTS[i].name}`);
      }

      if (cancelled) return;
      setLoading(false);

      const width = mount.clientWidth;
      const height = mount.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.set(0, 1.1, 6.4);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x07080b, 1);
      mount.appendChild(renderer.domElement);

      // ---- Lights ----
      scene.add(new THREE.AmbientLight(0x22262f, 1.2));
      const key = new THREE.PointLight(0x5ee7ff, 2.2, 12);
      key.position.set(2.5, 3, 3);
      scene.add(key);
      const rim = new THREE.PointLight(0x9b7bff, 1.6, 12);
      rim.position.set(-3, -2, -2);
      scene.add(rim);

      // ---- Box ----
      const boxGeo = new THREE.BoxGeometry(3, 3, 3);
      const edges = new THREE.EdgesGeometry(boxGeo);
      const boxLines = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0x2c3444, transparent: true, opacity: 0.9 })
      );
      scene.add(boxLines);
      const glass = new THREE.Mesh(
        boxGeo,
        new THREE.MeshBasicMaterial({ color: 0x5ee7ff, transparent: true, opacity: 0.03, side: THREE.DoubleSide })
      );
      scene.add(glass);

      // ---- Disk & Ring ----
      const disk = new THREE.Mesh(
        new THREE.CircleGeometry(1.3, 48),
        new THREE.MeshBasicMaterial({ color: 0x5ee7ff, transparent: true, opacity: 0.06 })
      );
      disk.rotation.x = -Math.PI / 2;
      disk.position.y = -1.48;
      scene.add(disk);
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(1.28, 1.33, 64),
        new THREE.MeshBasicMaterial({ color: 0x5ee7ff, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = -1.48;
      scene.add(ring);

      // ---- Backdrop ----
      const backdrop = new THREE.Mesh(
        new THREE.PlaneGeometry(2.8, 2.8),
        new THREE.MeshBasicMaterial({
          map: makeBackdropTexture(PRODUCTS[0].bgFrom, PRODUCTS[0].bgTo),
          transparent: true,
          opacity: 0.9,
        })
      );
      backdrop.position.z = -1.3;
      scene.add(backdrop);

      // ---- REAL IMAGE ----
      let realImageMesh = null;
      const textureLoader = new THREE.TextureLoader();

      function loadRealImage(url) {
        textureLoader.load(
          url,
          (texture) => {
            if (realImageMesh) {
              scene.remove(realImageMesh);
              realImageMesh.geometry.dispose();
              realImageMesh.material.dispose();
            }

            const aspect = texture.image.width / texture.image.height;
            const geometry = new THREE.PlaneGeometry(1.8 * aspect, 1.8);
            const material = new THREE.MeshBasicMaterial({
              map: texture,
              transparent: true,
              opacity: 1,
              depthWrite: false,
              side: THREE.DoubleSide,
            });

            realImageMesh = new THREE.Mesh(geometry, material);
            realImageMesh.position.z = 0.01;
            scene.add(realImageMesh);
          },
          undefined,
          (error) => {
            console.error("Texture load error:", error);
          }
        );
      }

      loadRealImage(PRODUCTS[0].imageURL);

      // ---- PARTICLES ----
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const colors = new Float32Array(PARTICLE_COUNT * 3);
      const scatterDir = new Float32Array(PARTICLE_COUNT * 3);
      const seed = new Float32Array(PARTICLE_COUNT);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const v = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
        scatterDir[i * 3] = v.x;
        scatterDir[i * 3 + 1] = v.y;
        scatterDir[i * 3 + 2] = v.z;
        seed[i] = Math.random();
      }

      const first = cache.get(0);
      positions.set(first.positions);
      colors.set(first.colors);

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.026,
        vertexColors: true,
        transparent: true,
        opacity: 0.5, // Particles half transparent so image visible
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geo, mat);
      points.scale.set(1.15, 1.15, 1.15);
      scene.add(points);

      let fromPositions = new Float32Array(first.positions);
      let toPositions = new Float32Array(first.positions);
      let toColors = new Float32Array(first.colors);
      const scatterPos = new Float32Array(PARTICLE_COUNT * 3);

      let phase = "idle";
      let phaseTime = 0;
      let curIndex = 0;
      let pendingIndex = 0;

      function getSample(i) { return cache.get(i); }

      function startTransition(dir) {
        if (phase !== "idle") return;
        pendingIndex = (curIndex + dir + PRODUCTS.length) % PRODUCTS.length;
        phase = "vaporize";
        phaseTime = 0;
        setStatus("DECOHERING");
        setSpecVisible(false);

        if (realImageMesh) {
          realImageMesh.material.opacity = 0;
        }
      }
      triggerRef.current = startTransition;

      const clock = new THREE.Clock();

      function updateParticles(dt) {
        const posAttr = geo.attributes.position;
        const colAttr = geo.attributes.color;
        const arr = posAttr.array;

        if (phase === "idle") {
          const t = clock.elapsedTime;
          for (let i = 0; i < PARTICLE_COUNT; i++) {
            const bx = fromPositions[i * 3], by = fromPositions[i * 3 + 1], bz = fromPositions[i * 3 + 2];
            const wob = 0.005;
            arr[i * 3] = bx + Math.sin(t * 1.3 + seed[i] * 10) * wob;
            arr[i * 3 + 1] = by + Math.cos(t * 1.1 + seed[i] * 10) * wob;
            arr[i * 3 + 2] = bz + Math.sin(t * 0.9 + seed[i] * 7) * wob;
          }
          posAttr.needsUpdate = true;

          if (realImageMesh && realImageMesh.material.opacity < 1) {
            realImageMesh.material.opacity = Math.min(1, realImageMesh.material.opacity + 0.03);
          }
          return;
        }

        phaseTime += dt;

        if (phase === "vaporize") {
          const t = Math.min(phaseTime / VAPORIZE_DUR, 1);
          const e = easeInCubic(t);
          for (let i = 0; i < PARTICLE_COUNT; i++) {
            const bx = fromPositions[i * 3], by = fromPositions[i * 3 + 1], bz = fromPositions[i * 3 + 2];
            const dx = scatterDir[i * 3], dy = scatterDir[i * 3 + 1], dz = scatterDir[i * 3 + 2];
            const dist = (2 + seed[i] * 3.2) * e;
            const jitter = Math.sin(phaseTime * 20 + seed[i] * 40) * 0.02 * e;
            arr[i * 3] = bx + dx * dist + jitter;
            arr[i * 3 + 1] = by + dy * dist + (seed[i] - 0.5) * 0.4 * e;
            arr[i * 3 + 2] = bz + dz * dist + jitter;
          }
          mat.opacity = 0.5 * (1 - 0.8 * e);
          mat.size = 0.026 * (1 - 0.4 * e) + 0.01 * e;
          posAttr.needsUpdate = true;

          if (t >= 1) {
            scatterPos.set(arr);
            curIndex = pendingIndex;
            const next = getSample(curIndex);
            toPositions = next.positions;
            toColors = next.colors;

            const p = PRODUCTS[curIndex];
            setIndex(curIndex);
            setProductName(p.name);
            setTagline(p.tagline);
            setAccent(p.accent);

            backdrop.material.map = makeBackdropTexture(p.bgFrom, p.bgTo);
            backdrop.material.needsUpdate = true;

            loadRealImage(p.imageURL);

            phase = "drift";
            phaseTime = 0;
            setStatus("RECONFIGURING");
          }
          return;
        }

        if (phase === "drift") {
          const t = Math.min(phaseTime / DRIFT_DUR, 1);
          for (let i = 0; i < PARTICLE_COUNT; i++) {
            const sx = scatterPos[i * 3], sy = scatterPos[i * 3 + 1], sz = scatterPos[i * 3 + 2];
            const swirl = phaseTime * 2.2 + seed[i] * 6.28;
            arr[i * 3] = sx + Math.sin(swirl) * 0.05;
            arr[i * 3 + 1] = sy + Math.cos(swirl * 1.3) * 0.05;
            arr[i * 3 + 2] = sz + Math.sin(swirl * 0.7) * 0.05;
          }
          posAttr.needsUpdate = true;
          if (t >= 1) {
            scatterPos.set(arr);
            phase = "reform";
            phaseTime = 0;
            setStatus("STABILIZING");
            setSpecVisible(true);
          }
          return;
        }

        if (phase === "reform") {
          const t = Math.min(phaseTime / REFORM_DUR, 1);
          const e = easeOutCubic(t);
          const carr = colAttr.array;
          for (let i = 0; i < PARTICLE_COUNT; i++) {
            const sx = scatterPos[i * 3], sy = scatterPos[i * 3 + 1], sz = scatterPos[i * 3 + 2];
            const tx = toPositions[i * 3], ty = toPositions[i * 3 + 1], tz = toPositions[i * 3 + 2];
            arr[i * 3] = sx + (tx - sx) * e;
            arr[i * 3 + 1] = sy + (ty - sy) * e;
            arr[i * 3 + 2] = sz + (tz - sz) * e;

            carr[i * 3] += (toColors[i * 3] - carr[i * 3]) * e * 0.3;
            carr[i * 3 + 1] += (toColors[i * 3 + 1] - carr[i * 3 + 1]) * e * 0.3;
            carr[i * 3 + 2] += (toColors[i * 3 + 2] - carr[i * 3 + 2]) * e * 0.3;
          }
          mat.opacity = 0.3 + 0.7 * e;
          mat.size = 0.016 + 0.012 * e;
          posAttr.needsUpdate = true;
          colAttr.needsUpdate = true;

          if (t >= 1) {
            fromPositions = new Float32Array(toPositions);
            colAttr.array.set(toColors);
            colAttr.needsUpdate = true;
            phase = "idle";
            phaseTime = 0;
            setStatus("STABLE");

            if (realImageMesh) {
              realImageMesh.material.opacity = 1;
            }
          }
          return;
        }
      }

      let raf = 0;
      function animate() {
        raf = requestAnimationFrame(animate);
        const dt = Math.min(clock.getDelta(), 0.05);
        updateParticles(dt);
        const t = clock.elapsedTime;
        points.rotation.y = t * 0.12;
        boxLines.rotation.y = t * 0.03;
        glass.rotation.y = t * 0.03;
        ring.rotation.z = t * 0.05;
        key.position.x = Math.sin(t * 0.4) * 3;
        key.position.z = Math.cos(t * 0.4) * 3;

        if (realImageMesh) {
          realImageMesh.rotation.y = t * 0.03;
        }

        renderer.render(scene, camera);
      }
      animate();

      function onResize() {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
      window.addEventListener("resize", onResize);

      function onKeydown(e) {
        if (e.code === "Space" || e.code === "ArrowRight") {
          e.preventDefault();
          triggerRef.current(1);
        } else if (e.code === "ArrowLeft") {
          e.preventDefault();
          triggerRef.current(-1);
        }
      }
      window.addEventListener("keydown", onKeydown);

      function onClick() {
        triggerRef.current(1);
      }
      renderer.domElement.style.cursor = "pointer";
      renderer.domElement.addEventListener("click", onClick);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("keydown", onKeydown);
        renderer.domElement.removeEventListener("click", onClick);
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
        geo.dispose();
        mat.dispose();
        renderer.dispose();
        if (realImageMesh) {
          scene.remove(realImageMesh);
          realImageMesh.geometry.dispose();
          realImageMesh.material.dispose();
        }
      };
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="stage" ref={mountRef}>
      {loading && (
        <div className="loading">
          <div className="loading-label">CALIBRATING SPECIMENS…</div>
        </div>
      )}

      {!loading && (
        <>
          <div className="vignette" />
          <div className="scanline" />
          <div className="bracket tl" style={{ borderColor: accent }} />
          <div className="bracket tr" style={{ borderColor: accent }} />
          <div className="bracket bl" style={{ borderColor: accent }} />
          <div className="bracket br" style={{ borderColor: accent }} />

          <div className="hud">
            <div className="row">
              <div className="corner">
                SPECIMEN CHAMBER
                <br />
                <b style={{ color: accent }}>ONLINE</b>
              </div>
              <div className="title">
                PROD<span style={{ color: accent }}>·</span>UCT
              </div>
              <div className="corner">
                ITEM 0{index + 1} / 0{PRODUCTS.length}
              </div>
            </div>
          </div>

          <div className="status">
            <div className="label" style={{ color: status === "STABLE" ? accent : "#ff8a5b" }}>
              {status}
            </div>
            <div className="spec" style={{ opacity: specVisible ? 1 : 0.15 }}>
              {productName}
            </div>
            <div className="tagline" style={{ opacity: specVisible ? 1 : 0 }}>
              {tagline}
            </div>
            <div className="hint">SPACE / → NEXT · ← PREV · CLICK TO ADVANCE</div>
          </div>
        </>
      )}

      <style jsx>{`
        .stage { position: relative; width: 100%; height: 100vh; background: #07080b; overflow: hidden; }
        .loading { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
        .loading-label { font-family: "Courier New", ui-monospace, monospace; font-size: 12px; letter-spacing: 0.3em; color: #6b7280; text-transform: uppercase; }
        .vignette { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%); z-index: 1; }
        .scanline { position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(to bottom, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 3px); mix-blend-mode: overlay; z-index: 1; }
        .bracket { position: absolute; width: 26px; height: 26px; pointer-events: none; transition: border-color 0.4s ease; z-index: 2; }
        .bracket.tl { top: 20px; left: 20px; border-top: 1px solid; border-left: 1px solid; }
        .bracket.tr { top: 20px; right: 20px; border-top: 1px solid; border-right: 1px solid; }
        .bracket.bl { bottom: 20px; left: 20px; border-bottom: 1px solid; border-left: 1px solid; }
        .bracket.br { bottom: 20px; right: 20px; border-bottom: 1px solid; border-right: 1px solid; }
        .hud { position: absolute; inset: 0; pointer-events: none; display: flex; flex-direction: column; justify-content: space-between; font-family: "Courier New", ui-monospace, monospace; z-index: 3; }
        .row { display: flex; justify-content: space-between; align-items: flex-start; padding: 28px 34px; }
        .corner { font-size: 11px; letter-spacing: 0.18em; color: #6b7280; text-transform: uppercase; }
        .title { font-size: 13px; letter-spacing: 0.3em; color: #e7e9ee; text-transform: uppercase; }
        .status { position: absolute; left: 50%; bottom: 46px; transform: translateX(-50%); text-align: center; pointer-events: none; font-family: "Courier New", ui-monospace, monospace; z-index: 3; }
        .label { font-size: 11px; letter-spacing: 0.35em; text-transform: uppercase; transition: color 0.4s ease; }
        .spec { margin-top: 6px; font-size: 20px; letter-spacing: 0.08em; color: #e7e9ee; font-weight: 600; transition: opacity 0.3s ease; }
        .tagline { margin-top: 4px; font-size: 12px; letter-spacing: 0.1em; color: #9aa0ac; transition: opacity 0.3s ease; }
        .hint { margin-top: 12px; font-size: 10px; letter-spacing: 0.2em; color: #6b7280; opacity: 0.8; }
      `}</style>
    </div>
  );
}