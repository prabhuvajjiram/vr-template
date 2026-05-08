"use client";

import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { DentalService } from "@vadentalcare/shared";

type ServicesExplorerProps = {
  services: DentalService[];
};

export function ServicesExplorer({ services }: ServicesExplorerProps) {
  const [activeId, setActiveId] = useState(services[0]?.id);
  const [selectedTopic, setSelectedTopic] = useState(services[0]?.topics[0] ?? "");
  const active = services.find((service) => service.id === activeId) ?? services[0];

  useEffect(() => {
    setSelectedTopic(active.topics[0] ?? "");
  }, [active]);

  return (
    <section className="section services" id="services">
      <div className="section-heading">
        <h2>Find the care you need.</h2>
        <p>
          Browse the main care areas, then choose the specific topic that matches your question or
          care goal.
        </p>
      </div>

      <div className="services-shell">
        <div className="service-tabs" role="tablist" aria-label="Dental service categories">
          {services.map((service) => (
            <button
              key={service.id}
              className={service.id === active.id ? "active" : ""}
              type="button"
              role="tab"
              aria-selected={service.id === active.id}
              onClick={() => setActiveId(service.id)}
            >
              <span>{service.shortName}</span>
              <small>{service.topics.length} topics</small>
            </button>
          ))}
        </div>

        <div className="care-library">
          <article className="service-card">
            <div className="service-media">
              <Image src={active.imageUrl} alt="" fill sizes="(max-width: 900px) 100vw, 34vw" priority={false} />
            </div>
            <div className="service-content">
              <span className={`urgency urgency-${active.urgency}`}>
                {active.urgency === "urgent" ? "urgent care" : "care category"}
              </span>
              <h3>{active.name}</h3>
              <p>{active.summary}</p>
              <ul>
                {active.treatments.map((treatment) => (
                  <li key={treatment}>{treatment}</li>
                ))}
              </ul>
              <a href="#booking" className="text-link">
                Request this care <ArrowRight size={17} />
              </a>
            </div>
          </article>

          <div className="topic-panel">
            <div className="topic-heading">
              <div>
                <Search size={20} />
                <h4>{active.name} topics</h4>
              </div>
              <span>{active.topics.length} topics</span>
            </div>
            <div className="topic-grid">
              {active.topics.map((topic) => (
                <button
                  type="button"
                  key={topic}
                  className={`topic-card ${topic === selectedTopic ? "selected" : ""}`}
                  onClick={() => setSelectedTopic(topic)}
                >
                  <span>{topic}</span>
                  <ArrowRight size={16} />
                </button>
              ))}
            </div>
            {selectedTopic && (
              <div className="topic-focus">
                <strong>{selectedTopic}</strong>
                <p>
                  Share what you are experiencing in the appointment request. The office can route it
                  to the right care path before confirming a time.
                </p>
                <a href="#booking" className="text-link">
                  Request help with this topic <ArrowRight size={17} />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
