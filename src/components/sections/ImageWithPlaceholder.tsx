import React, { useEffect, useState } from "react";

interface ImageWithPlaceholderProps {
  src: string | null;
  alt: string;
  className?: string;
  placeholder?: string;
  localStorageKey?: string; // 👈 key to store/retrieve image
}

const ImageWithPlaceholder: React.FC<ImageWithPlaceholderProps> = ({
  src,
  alt,
  className = "",
  placeholder = "/images/w3.png",
  localStorageKey,
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [localImage, setLocalImage] = useState<string | null>(null);

  // ✅ Load image from localStorage if available
  useEffect(() => {
    if (localStorageKey) {
      const stored = localStorage.getItem(localStorageKey);
      if (stored) setLocalImage(stored);
    }
  }, [localStorageKey]);

  const displaySrc = !error && src
    ? src
    : localImage
      ? localImage
      : placeholder;

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
          <img src={placeholder} alt="placeholder" className="w-8 h-8 opacity-60" />
        </div>
      )}
      <img
        src={displaySrc}
        alt={alt}
        onLoad={() => {
          setLoaded(true);
          // ✅ Save to localStorage if key + src exists
          if (localStorageKey && src) {
            localStorage.setItem(localStorageKey, src);
          }
        }}
        onError={() => setError(true)}
        className={`object-contain w-full h-full transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default ImageWithPlaceholder;
