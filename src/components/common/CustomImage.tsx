"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface CustomImageProps extends Omit<ImageProps, "onLoad"> {
  fallbackSrc?: string;
  containerClassName?: string;
}

export function CustomImage({
  src,
  alt,
  className,
  containerClassName,
  fallbackSrc = "/assets/images/placeholder.webp",
  priority = false,
  ...props
}: CustomImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative overflow-hidden bg-neutral-900", containerClassName)}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-neutral-800" />
      )}
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        priority={priority}
        className={cn(
          "transition-opacity duration-300 ease-in-out object-cover",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgSrc(fallbackSrc);
          setIsLoading(false);
        }}
      />
    </div>
  );
}
