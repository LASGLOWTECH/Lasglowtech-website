import React, { createContext, useContext, useLayoutEffect, useState } from "react";

const THEME_KEY = "lasglowtech-theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) return "dark";
  return "dark";
};

export function applyThemeToDom(nextTheme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", nextTheme);
  if (nextTheme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  try {
    localStorage.setItem(THEME_KEY, nextTheme);
  } catch (_) {}
}

const ThemeContext = createContext({ theme: "dark", setTheme: () => {}, toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const initial = getInitialTheme();
    if (typeof document !== "undefined") applyThemeToDom(initial);
    return initial;
  });

  useLayoutEffect(() => {
    applyThemeToDom(theme);
  }, [theme]);

  const setTheme = (value) => {
    if (value === "light" || value === "dark") {
      setThemeState(value);
      applyThemeToDom(value);
    }
  };

  const toggleTheme = () => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyThemeToDom(next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
