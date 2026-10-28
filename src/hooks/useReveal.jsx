import {useEffect, useRef, useState} from "react";

/* Returns [ref, visible]. `visible` turns true once the element scrolls
   into view, and stays true. Content shows immediately when
   IntersectionObserver is unavailable. */
export function useReveal(options = {threshold: 0.15}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, visible];
}

/* Wrapper that fades its children up when they scroll into view. */
export function Reveal({as: Tag = "div", className = "", delay = 0, children, ...props}) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={delay ? {transitionDelay: `${delay}ms`} : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}
