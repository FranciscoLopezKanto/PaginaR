export const metadata = {
  title: 'Elki Magic',
  description: 'Reservas Elki Magic',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
