import { useState } from "react";

type Motif = "" | "Absence" | "Retard" | "Maladie";

interface DefineData {
  name: string;
  company: string;
  cin: string;
  motif: Motif;
}

interface Props {
  onStart: (data: DefineData) => void;
}

export default function Define({ onStart }: Props) {
  const [form, setForm] = useState<DefineData>({
    name: "",
    company: "",
    cin: "",
    motif: "",
  });

  const motifOptions: Motif[] = ["", "Absence", "Retard", "Maladie"];

  const update = (k: keyof DefineData, v: string) => {
    setForm((s) => ({ ...s, [k]: v }));
  };


  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">
        Start Quiz — Participant Info
      </h2>

      <label className="block mb-2">
        <div className="text-sm mb-1">nom & prenom</div>
        <input
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Full name"
        />
      </label>

      <label className="block mb-2">
        <div className="text-sm mb-1">societe</div>
        <input
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="societe"
        />
      </label>

      <label className="block mb-2">
        <div className="text-sm mb-1">CIN / matricule</div>
        <input
          value={form.cin}
          onChange={(e) => update("cin", e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="CIN / ID / matricule"
        />
      </label>

      <label className="block mb-4">
        <div className="text-sm mb-1">Motif</div>
        <select
          value={form.motif}
          onChange={(e) => update("motif", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          {motifOptions.map((m) => (
            <option key={m} value={m}>
              {m === "" ? "-- select motif --" : m}
            </option>
          ))}
        </select>
      </label>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => onStart(form)}
          className={`px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700`}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
