'use client'
import { useEffect, useRef } from "react";
import Image, { ImageProps } from "next/image";

export default function LazyImage(props: ImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // Stop observing once it's visible
          }
        });
      },
      { threshold: 0.3 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Image ref={imgRef} {...props} fill sizes="(max-width: 1900px) 100vw" className={`image ${props.className || ""}`} alt="" />
  );
}
