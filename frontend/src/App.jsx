import React, { useEffect, useState } from "react";
import CharactersTable from "./components/CharactersTable";

const API = "http://localhost:5000";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch(`${API}/characters`);
    const data = await res.json();
    setCharacters(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="h-10 w-full bg-mcuPurple rounded-t-2xl mb-4 shadow"></div>
      <div className="card">
        <h1 className="text-5xl font-extrabold text-center text-mcuPurple mb-8">
          MCU Characters
        </h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading…</p>
        ) : (
          <CharactersTable
            characters={characters}
            onChange={setCharacters}
            api={API}
          />
        )}
      </div>
    </div>
  );
}
