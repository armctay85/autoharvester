import demoData from "@/data/demo-listings.json";
import CarDetailClient from "./CarDetailClient";

const { listings } = demoData;

export function generateStaticParams() {
  return listings.map((car) => ({
    id: car.id,
  }));
}

export default function CarDetailPage({ params }: { params: { id: string } }) {
  return <CarDetailClient id={params.id} />;
}
