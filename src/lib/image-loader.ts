export function imageLoader({ src }: { src: string }) {
  // Encode URL to handle spaces and special characters
  return encodeURI(src)
}
