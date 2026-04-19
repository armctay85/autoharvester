import CarDetailClient from "./CarDetailClient";

// Note: render this dynamically. The legacy `generateStaticParams`-based
// prerender choked on the React 19 + Next 16 SSR pipeline because the
// GamificationProvider tree in the root layout uses `useReducer` and was
// being evaluated against a null React snapshot during static export.
// Switching to dynamic rendering (the v2 strategy is server-rendered anyway)
// avoids that path entirely. Replace with `generateStaticParams` again once
// real listings come from the backend and we explicitly want SSG.
export const dynamic = "force-dynamic";

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CarDetailClient id={id} />;
}
