import type { PageProps } from "$fresh/server.ts";
export default function App({ Component, state }: PageProps) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="ZHCET, Exam Scheme, ZHCET Exam Scheme" />
        <meta name="description" content="My ZHCET Exam Scheme" />

        <meta property="og:title" content="My ZHCET Exam Scheme" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://scheme.deno.dev/" />
        <meta property="og:description" content="My ZHCET Exam Scheme" />
        <meta property="og:image" content="https://scheme.deno.dev/og.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My ZHCET Exam Scheme" />
        <meta name="twitter:description" content="My ZHCET Exam Scheme" />
        <meta name="twitter:image" content="https://scheme.deno.dev/og.png" />

        <title>{state.title ?? "ZHCET Scheme Generator"}</title>
        <link rel="stylesheet" href="https://unpkg.com/@picocss/pico" />
      </head>
      <body>
        <main class="container">
          <Component />
        </main>
      </body>
    </html>
  );
}
