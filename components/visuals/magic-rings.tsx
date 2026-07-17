"use client";

import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef, type CSSProperties } from "react";

const VERT = `#version 300 es
in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAttenuation;
uniform float uLineThickness;
uniform float uBaseRadius;
uniform float uRadiusStep;
uniform float uScaleRate;
uniform float uOpacity;
uniform float uNoiseAmount;
uniform float uRotation;
uniform float uRingGap;
uniform float uFadeIn;
uniform float uFadeOut;
uniform float uMouseInfluence;
uniform float uHoverAmount;
uniform float uHoverScale;
uniform float uParallax;
uniform float uBurst;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec3 uColor;
uniform vec3 uColorTwo;
uniform int uRingCount;

out vec4 fragColor;

const float HP = 1.5707963;
const float CYCLE = 3.45;

float fade(float t) {
  return t < uFadeIn ? smoothstep(0.0, uFadeIn, t) : 1.0 - smoothstep(uFadeOut, CYCLE - 0.2, t);
}

float ring(vec2 p, float ri, float cut, float t0, float px) {
  float t = mod(uTime + t0, CYCLE);
  float r = ri + t / CYCLE * uScaleRate;
  float d = abs(length(p) - r);
  float a = atan(abs(p.y), abs(p.x)) / HP;
  float th = max(1.0 - a, 0.5) * px * uLineThickness;
  float h = (1.0 - smoothstep(th, th * 1.5, d)) + 1.0;
  d += pow(cut * a, 3.0) * r;
  return h * exp(-uAttenuation * d) * fade(t);
}

void main() {
  float px = 1.0 / min(uResolution.x, uResolution.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) * px;
  float cr = cos(uRotation);
  float sr = sin(uRotation);
  p = mat2(cr, -sr, sr, cr) * p;
  p -= uMouse * uMouseInfluence;

  float sc = mix(1.0, uHoverScale, uHoverAmount) + uBurst * 0.3;
  p /= sc;

  vec3 c = vec3(0.0);
  float rcf = max(float(uRingCount) - 1.0, 1.0);

  for (int i = 0; i < 10; i++) {
    if (i >= uRingCount) break;
    float fi = float(i);
    vec2 pr = p - fi * uParallax * uMouse;
    vec3 rc = mix(uColor, uColorTwo, fi / rcf);
    float delay = i == 0 ? 0.0 : 2.95 * fi;
    c = mix(c, rc, vec3(ring(pr, uBaseRadius + fi * uRadiusStep, pow(uRingGap, fi), delay, px)));
  }

  c *= 1.0 + uBurst * 2.0;
  float n = fract(sin(dot(gl_FragCoord.xy + uTime * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  c += (n - 0.5) * uNoiseAmount;

  float alpha = max(c.r, max(c.g, c.b)) * uOpacity;
  fragColor = vec4(c * uOpacity, alpha);
}
`;

export type MagicRingsProps = {
  color?: string;
  colorTwo?: string;
  speed?: number;
  ringCount?: number;
  attenuation?: number;
  lineThickness?: number;
  baseRadius?: number;
  radiusStep?: number;
  scaleRate?: number;
  opacity?: number;
  blur?: number;
  noiseAmount?: number;
  rotation?: number;
  ringGap?: number;
  fadeIn?: number;
  fadeOut?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  hoverScale?: number;
  parallax?: number;
  clickBurst?: boolean;
  className?: string;
  style?: CSSProperties;
};

type RuntimeProps = Required<Omit<MagicRingsProps, "className" | "style">>;

const colorToRgb = (hex: string) => {
  const color = new Color(hex);
  return [color.r, color.g, color.b];
};

function browserSupportsWebGl2() {
  if (typeof window === "undefined" || typeof document === "undefined" || !("WebGL2RenderingContext" in window)) {
    return false;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl2", {
    alpha: true,
    antialias: true,
    premultipliedAlpha: true,
  });

  context?.getExtension("WEBGL_lose_context")?.loseContext();
  return Boolean(context);
}

export default function MagicRings({
  color = "#0EA5B7",
  colorTwo = "#D5A645",
  speed = 0.6,
  ringCount = 5,
  attenuation = 12,
  lineThickness = 1.6,
  baseRadius = 0.24,
  radiusStep = 0.075,
  scaleRate = 0.14,
  opacity = 0.42,
  blur = 0,
  noiseAmount = 0.015,
  rotation = -8,
  ringGap = 1.45,
  fadeIn = 0.72,
  fadeOut = 0.5,
  followMouse = false,
  mouseInfluence = 0.16,
  hoverScale = 1.08,
  parallax = 0.035,
  clickBurst = false,
  className = "",
  style,
}: MagicRingsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef([0, 0]);
  const smoothMouseRef = useRef([0, 0]);
  const hoverAmountRef = useRef(0);
  const isHoveredRef = useRef(false);
  const burstRef = useRef(0);
  const propsRef = useRef<RuntimeProps>({
    color,
    colorTwo,
    speed,
    ringCount,
    attenuation,
    lineThickness,
    baseRadius,
    radiusStep,
    scaleRate,
    opacity,
    blur,
    noiseAmount,
    rotation,
    ringGap,
    fadeIn,
    fadeOut,
    followMouse,
    mouseInfluence,
    hoverScale,
    parallax,
    clickBurst,
  });

  useEffect(() => {
    propsRef.current = {
      color,
      colorTwo,
      speed,
      ringCount,
      attenuation,
      lineThickness,
      baseRadius,
      radiusStep,
      scaleRate,
      opacity,
      blur,
      noiseAmount,
      rotation,
      ringGap,
      fadeIn,
      fadeOut,
      followMouse,
      mouseInfluence,
      hoverScale,
      parallax,
      clickBurst,
    };
  }, [
    attenuation,
    baseRadius,
    blur,
    clickBurst,
    color,
    colorTwo,
    fadeIn,
    fadeOut,
    followMouse,
    hoverScale,
    lineThickness,
    mouseInfluence,
    noiseAmount,
    opacity,
    parallax,
    radiusStep,
    ringCount,
    ringGap,
    rotation,
    scaleRate,
    speed,
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!browserSupportsWebGl2()) {
      container.dataset.webgl = "unavailable";
      return;
    }

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: true,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      });
    } catch {
      container.dataset.webgl = "unavailable";
      return;
    }

    const { gl } = renderer;
    container.dataset.webgl = "ok";
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = "transparent";
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const createResolution = () => [Math.max(container.offsetWidth, 1), Math.max(container.offsetHeight, 1)];
    const [initialWidth, initialHeight] = createResolution();
    const current = propsRef.current;

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAttenuation: { value: current.attenuation },
        uResolution: { value: [initialWidth, initialHeight] },
        uColor: { value: colorToRgb(current.color) },
        uColorTwo: { value: colorToRgb(current.colorTwo) },
        uLineThickness: { value: current.lineThickness },
        uBaseRadius: { value: current.baseRadius },
        uRadiusStep: { value: current.radiusStep },
        uScaleRate: { value: current.scaleRate },
        uRingCount: { value: current.ringCount },
        uOpacity: { value: current.opacity },
        uNoiseAmount: { value: current.noiseAmount },
        uRotation: { value: (current.rotation * Math.PI) / 180 },
        uRingGap: { value: current.ringGap },
        uFadeIn: { value: current.fadeIn },
        uFadeOut: { value: current.fadeOut },
        uMouse: { value: [0, 0] },
        uMouseInfluence: { value: 0 },
        uHoverAmount: { value: 0 },
        uHoverScale: { value: current.hoverScale },
        uParallax: { value: current.parallax },
        uBurst: { value: 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const renderFrame = (time = 0) => {
      const next = propsRef.current;
      smoothMouseRef.current[0] += (mouseRef.current[0] - smoothMouseRef.current[0]) * 0.08;
      smoothMouseRef.current[1] += (mouseRef.current[1] - smoothMouseRef.current[1]) * 0.08;
      hoverAmountRef.current += ((isHoveredRef.current ? 1 : 0) - hoverAmountRef.current) * 0.08;
      burstRef.current *= 0.95;
      if (burstRef.current < 0.001) burstRef.current = 0;

      program.uniforms.uTime.value = time * 0.001 * next.speed;
      program.uniforms.uAttenuation.value = next.attenuation;
      program.uniforms.uColor.value = colorToRgb(next.color);
      program.uniforms.uColorTwo.value = colorToRgb(next.colorTwo);
      program.uniforms.uLineThickness.value = next.lineThickness;
      program.uniforms.uBaseRadius.value = next.baseRadius;
      program.uniforms.uRadiusStep.value = next.radiusStep;
      program.uniforms.uScaleRate.value = next.scaleRate;
      program.uniforms.uRingCount.value = Math.min(Math.max(Math.round(next.ringCount), 1), 10);
      program.uniforms.uOpacity.value = next.opacity;
      program.uniforms.uNoiseAmount.value = next.noiseAmount;
      program.uniforms.uRotation.value = (next.rotation * Math.PI) / 180;
      program.uniforms.uRingGap.value = next.ringGap;
      program.uniforms.uFadeIn.value = next.fadeIn;
      program.uniforms.uFadeOut.value = next.fadeOut;
      program.uniforms.uMouse.value = [smoothMouseRef.current[0], smoothMouseRef.current[1]];
      program.uniforms.uMouseInfluence.value = next.followMouse ? next.mouseInfluence : 0;
      program.uniforms.uHoverAmount.value = hoverAmountRef.current;
      program.uniforms.uHoverScale.value = next.hoverScale;
      program.uniforms.uParallax.value = next.parallax;
      program.uniforms.uBurst.value = next.clickBurst ? burstRef.current : 0;

      renderer.render({ scene: mesh });
    };

    const resize = () => {
      const [width, height] = createResolution();
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
      renderFrame();
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current[0] = (event.clientX - rect.left) / rect.width - 0.5;
      mouseRef.current[1] = -((event.clientY - rect.top) / rect.height - 0.5);
    };

    const onMouseEnter = () => {
      isHoveredRef.current = true;
    };

    const onMouseLeave = () => {
      isHoveredRef.current = false;
      mouseRef.current = [0, 0];
    };

    const onClick = () => {
      burstRef.current = 1;
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = true;
    let animationId = 0;
    const update = (time: number) => {
      renderFrame(time);
      animationId = window.requestAnimationFrame(update);
    };

    const start = () => {
      window.cancelAnimationFrame(animationId);
      if (reducedMotion.matches || !isVisible || document.hidden) {
        renderFrame();
        return;
      }
      animationId = window.requestAnimationFrame(update);
    };

    const visibilityObserver =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              isVisible = entry.isIntersecting;
              start();
            },
            { rootMargin: "160px" },
          )
        : null;

    const handleDocumentVisibility = () => start();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    visibilityObserver?.observe(container);
    window.addEventListener("resize", resize);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("click", onClick);
    reducedMotion.addEventListener("change", start);
    document.addEventListener("visibilitychange", handleDocumentVisibility);

    resize();
    start();

    return () => {
      window.cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      visibilityObserver?.disconnect();
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("click", onClick);
      reducedMotion.removeEventListener("change", start);
      document.removeEventListener("visibilitychange", handleDocumentVisibility);
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      delete container.dataset.webgl;
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`magic-rings-container ${className}`.trim()}
      style={blur > 0 ? { ...style, filter: `blur(${blur}px)` } : style}
    >
      <div className="magic-rings-fallback" aria-hidden="true" />
    </div>
  );
}
