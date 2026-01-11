// Root layout - redirects are handled by middleware
// Locale-specific layout is in app/[locale]/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
