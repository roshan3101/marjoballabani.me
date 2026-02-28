import type { Metadata } from 'next'
import { Caveat, Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-space-mono' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' })

export const metadata: Metadata = {
  title: 'Marjo Ballabani | Senior Software Engineer | Full-Stack & Cloud Expert',
  description: 'Senior Software Engineer with 11+ years of experience in distributed systems, microservices, and cloud technologies. Expert in Node.js, React, Python, Google Cloud. Based in Munich, Germany.',
  keywords: 'Marjo Ballabani, Software Engineer, Full-Stack Developer, Cloud Engineer, Microservices, Node.js, React, Python, Google Cloud, AWS, Distributed Systems, Munich, Germany, Senior Developer, DevOps, Kubernetes, Docker',
  authors: [{ name: 'Marjo Ballabani' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://marjoballabani.me',
    title: 'Marjo Ballabani | Senior Software Engineer',
    description: 'Senior Software Engineer with 11+ years of experience in distributed systems, cloud technologies, and full-stack development.',
    images: [
      {
        url: 'https://marjoballabani.me/image/social-cover.png',
        width: 1200,
        height: 630,
        alt: 'Marjo Ballabani - Senior Software Engineer',
      },
    ],
    siteName: 'Marjo Ballabani',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marjo Ballabani | Senior Software Engineer',
    description: 'Senior Software Engineer with 11+ years of experience in distributed systems, cloud technologies, and full-stack development.',
    images: ['https://marjoballabani.me/image/social-cover.png'],
  },
  verification: {
    google: 'google-verification-code',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" as="style" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" media="print" onLoad="this.media='all'" />
        <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" /></noscript>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Marjo Ballabani",
            "url": "https://marjoballabani.me",
            "jobTitle": "Senior Software Engineer",
            "worksFor": {
              "@type": "Organization",
              "name": "Unicepta"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Munich",
              "addressRegion": "Bavaria",
              "addressCountry": "Germany"
            },
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "University of Tirana"
            },
            "knowsAbout": ["Software Engineering", "Full-Stack Development", "Cloud Computing", "Distributed Systems", "Microservices", "Node.js", "React", "Python", "Google Cloud", "AWS", "Docker", "Kubernetes"],
            "sameAs": [
              "https://github.com/marjoballabani",
              "https://linkedin.com/in/marjoballabani",
              "https://stackoverflow.com/users/7563517/marjo-ballabani"
            ]
          }`}
        </script>
      </head>
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} ${caveat.variable}`}>
        {children}
      </body>
    </html>
  )
}
