"use client";

import { CalendarDays, Menu, Moon, Phone, Sun, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { PracticeProfile } from "@vadentalcare/shared";

type HeaderProps = {
  practice: PracticeProfile;
};

type Theme = "light" | "dark";

export function Header({ practice }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const activeTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(activeTheme);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("vdc-theme", nextTheme);
    setTheme(nextTheme);
  }

  return (
    <header className={`site-header ${open ? "is-open" : ""}`}>
      <a className="brand" href="#top" aria-label={`${practice.name} home`}>
        <span className="brand-logo" aria-hidden="true">
          <Image
            src="https://vadentalcare.com/wp-content/uploads/2025/01/Virginia-Dental-Care.png"
            alt=""
            width={58}
            height={58}
            priority
          />
        </span>
        <span>
          <strong>{practice.name}</strong>
          <small>
            {practice.city}, {practice.state}
          </small>
        </span>
      </a>

      <nav id="mobile-menu" className="site-nav" aria-label="Primary navigation">
        <a href="#services" onClick={() => setOpen(false)}>
          Find Care
        </a>
        <a href="#doctors" onClick={() => setOpen(false)}>
          Doctors
        </a>
        <a href="#about" onClick={() => setOpen(false)}>
          About
        </a>
        <a href="#first-visit" onClick={() => setOpen(false)}>
          First Visit
        </a>
        <a href="#testimonials" onClick={() => setOpen(false)}>
          Reviews
        </a>
        <a href="#location" onClick={() => setOpen(false)}>
          Location
        </a>
      </nav>

      <div className="header-actions">
        <a className="phone-link" href={`tel:${practice.phoneE164}`}>
          <Phone size={17} />
          {practice.phoneDisplay}
        </a>
        <button
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <a className="btn btn-primary" href="#booking">
          <CalendarDays size={17} />
          Request Appointment
        </a>
      </div>

      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}
