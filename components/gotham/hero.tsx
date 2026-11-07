"use client";

import { useEffect, useRef } from "react";

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finish = () => {
      try {
        sessionStorage.setItem("gotham-open", "1");
      } catch {
        /* private mode */
      }
      document.documentElement.dataset.open = "skip";
    };

    if (document.documentElement.dataset.open !== "play") return;
    const timer = window.setTimeout(finish, 2600);
    const stage = stageRef.current;
    stage?.querySelector(".open-skip")?.addEventListener("click", finish);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section id="surface" className="hero-track section-anchor" aria-labelledby="hero-title">
      <div ref={stageRef} className="hero-stage">
        <div className="hero-plate">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/gotham/city-wide.jpg"
            alt="A dark city of stone colonnades and towers, with blue light in the streets."
            width={1280}
            height={720}
            fetchPriority="high"
          />
          <div className="hero-glow" aria-hidden="true" />
        </div>
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-frame">
          <div className="hero-copy">
            <p className="hero-status">Protocol in development</p>
            <p className="motto">Privacy is power.</p>
            <h1 id="hero-title" className="hero-title">
              Your finances are your business.
            </h1>
            <p className="hero-line">
              Financial privacy for Elysium. Gotham is building a way to shield assets and transfer value with greater
              confidentiality.
            </p>
            <div className="hero-actions">
              <a className="btn btn-solid" href="#experience">
                Explore Gotham
              </a>
              <a className="btn btn-line" href="#ecosystem">
                View the Protocol
              </a>
            </div>
          </div>
        </div>
        <button type="button" className="open-skip">
          Skip
        </button>
      </div>
    </section>
  );
}
