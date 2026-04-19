import Link from "next/link";

// Static 404 page so Next doesn't fall through to its default _not-found
// prerender, which currently fails against the client provider tree.
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-sm uppercase tracking-[0.2em] text-[#b8956e] mb-3">404</p>
        <h1 className="text-3xl font-semibold text-[#f5f5f0] mb-3">Page not found</h1>
        <p className="text-[#a0a0a0] mb-6">
          We can&apos;t find what you were looking for. It may have moved or never existed.
        </p>
        <Link
          href="/"
          className="inline-block px-5 py-3 rounded-xl bg-[#b8956e] text-[#0a0a0a] font-semibold hover:bg-[#c9a67f] transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
