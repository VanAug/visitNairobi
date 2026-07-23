"use client";
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return <main className="error-page"><span>500</span><h1>Nairobi is still here. This page needs a moment.</h1><p>Please try again. If the problem continues, the support team can help.</p><button className="button dark" onClick={reset}>Try again</button><a href="/">Return home</a></main>;
}
