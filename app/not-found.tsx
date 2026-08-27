import Link from "next/link";
import SemanticIcon from "./components/SemanticIcon";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
      <SemanticIcon icon="🔍" label="Page not found" size="page" />

      <p className="mb-4 mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--kk-accent)]">
        404
      </p>

      <h1 className="text-4xl font-semibold tracking-tight text-black md:text-5xl">
        Page not found
      </h1>

      <p className="mt-5 max-w-xl text-base leading-7 text-black/65 md:text-lg">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Back to Home
      </Link>
    </section>
  );
}
