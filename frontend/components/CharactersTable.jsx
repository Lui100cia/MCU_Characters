import React, { useState } from "react";

export default function CharactersTable({ characters, onChange, api }) {
  const [newChar, setNewChar] = useState({
    name: "",
    realName: "",
    universe: "",
  });

  const handleDelete = async (id) => {
    await fetch(`${api}/characters/${id}`, { method: "DELETE" });
    onChange(characters.filter((c) => c.id !== id));
  };

  const handleUpdate = async (char) => {
    const name = window.prompt("Character Name:", char.name) ?? char.name;
    const realName =
      window.prompt("Real Name:", char.realName) ?? char.realName;
    const universe = window.prompt("Universe:", char.universe) ?? char.universe;

    const updated = { id: char.id, name, realName, universe };
    await fetch(`${api}/characters/${char.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    onChange(characters.map((c) => (c.id === char.id ? updated : c)));
  };

  const handleAdd = async () => {
    if (!newChar.name || !newChar.realName || !newChar.universe) return;
    const res = await fetch(`${api}/characters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newChar),
    });
    const created = await res.json();
    onChange([...characters, created]);
    setNewChar({ name: "", realName: "", universe: "" });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="table-head rounded-lg">
          <tr>
            <th className="px-4 py-3 text-left rounded-l-md">#</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Real Name</th>
            <th className="px-4 py-3 text-left">Universe</th>
            <th className="px-4 py-3 text-left rounded-r-md">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {characters.map((c, i) => (
            <tr key={c.id} className="border-b last:border-0">
              <td className="px-4 py-3 text-gray-600">{i + 1}</td>
              <td className="px-4 py-3">{c.name}</td>
              <td className="px-4 py-3">{c.realName}</td>
              <td className="px-4 py-3">{c.universe}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(c)}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          <tr className="bg-gray-50">
            <td className="px-4 py-3 text-gray-500">#</td>
            <td className="px-4 py-3">
              <input
                className="input"
                placeholder="Name"
                value={newChar.name}
                onChange={(e) =>
                  setNewChar({ ...newChar, name: e.target.value })
                }
              />
            </td>
            <td className="px-4 py-3">
              <input
                className="input"
                placeholder="Real Name"
                value={newChar.realName}
                onChange={(e) =>
                  setNewChar({ ...newChar, realName: e.target.value })
                }
              />
            </td>
            <td className="px-4 py-3">
              <input
                className="input"
                placeholder="Universe"
                value={newChar.universe}
                onChange={(e) =>
                  setNewChar({ ...newChar, universe: e.target.value })
                }
              />
            </td>
            <td className="px-4 py-3">
              <button onClick={handleAdd} className="btn btn-ghost">
                Submit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
