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
          <aside className="hero-flow" aria-label="Proposed Gotham flow">
            <p className="hero-flow-label">How a payment would move</p>
            <ol>
              <li>
                <strong>Public wallet</strong>
                <span>Value starts on an Elysium address.</span>
              </li>
              <li>
                <strong>Shield</strong>
                <span>A deposit enters the pool. That deposit stays public.</span>
              </li>
              <li>
                <strong>Private transfer</strong>
                <span>The link inside the pool is not published.</span>
              </li>
              <li>
                <strong>Unshield</strong>
                <span>A withdrawal returns value to the ledger.</span>
              </li>
              <li>
                <strong>Destination wallet</strong>
                <span>The receiving address is visible again.</span>
              </li>
            </ol>
            <p className="hero-flow-note">Concept. The pool is not deployed, and this does not move funds.</p>
          </aside>
        </div>
        <button type="button" className="open-skip">
          Skip
        </button>
      </div>
    </section>
  );
}
