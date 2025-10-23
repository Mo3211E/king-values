import unitsData from "@/data/units.json";
import { notFound } from "next/navigation";

export default function UnitDetailPage({ params }) {
  const unit = units.find(
    (u) => u.Name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === params.id
  );

  if (!unit) return notFound();

  return (
    <main className="min-h-screen bg-gray-900 text-white p-10">
      {/* Unit Card */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-4xl font-bold mb-4">{unit.Name}</h1>
        <p className="text-xl text-gray-300 mb-2">{unit.Category}</p>
        {unit.Image && (
          <img
            src={unit.Image}
            alt={unit.Name}
            className="w-full max-w-md mx-auto mb-4 rounded"
          />
        )}
        <p>Value: {unit.Value}</p>
        <p>Demand: {unit.Demand}</p>
        <p>Stability: {unit.Stability}</p>
      </div>

      {/* Obtainment + Justification */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Obtainment</h2>
        <p>{unit.Obtainment || "N/A"}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Justification</h2>
        <p>{unit.Justification || "N/A"}</p>
      </section>
    </main>
  );
}
