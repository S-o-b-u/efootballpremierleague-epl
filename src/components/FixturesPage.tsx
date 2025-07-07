"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Magnet from "./Magnet";

interface Match {
  date: string;
  player1: string;
  player2: string;
  result: string;
}

interface FixtureData {
  [key: string]: Match[];
}

export function FixturesPage() {
  const [selectedGroup, setSelectedGroup] = useState<string>("A");
  const [fixtures, setFixtures] = useState<FixtureData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const SHEET_ID = "1xOeEka4udzAQQJYnzVtG1NQc37I35FChsJ_2ED2RHvA";
        const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;

        const groupRanges: { [key: string]: string } = {
          A: "B4:F26", // Group A
          B: "J4:N26", // Group B
          C: "B33:F55", // Group C
          D: "J33:N55", // Group D
        };

        const fetchedFixtures: FixtureData = {};

        for (const groupKey of Object.keys(groupRanges)) {
          const range = groupRanges[groupKey];
          const res = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Fixture!${range}?key=${API_KEY}`
          );

          if (!res.ok) {
            throw new Error(`Failed to fetch group ${groupKey}`);
          }

          const data = await res.json();
          const rows = data.values.slice(1); // Skip table header

          fetchedFixtures[groupKey] = rows.map((row: string[]) => ({
            date: row[0] || "", // Date is in column 0 (B)
            player1: row[1] || "", // Player 1 is in column 1 (C)
            player2: row[3] || "", // Player 2 is in column 3 (E)
            result: row[4] || "TBD", // Result is in column 4 (F)
          }));
        }

        setFixtures(fetchedFixtures);
        setLoading(false);
      } catch (err) {
        console.error("Error loading fixtures:", err);
        setLoading(false);
      }
    };

    fetchFixtures();
    const interval = setInterval(fetchFixtures, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const fixtureGroups = Object.keys(fixtures);
  const currentFixtures = fixtures[selectedGroup] || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-8 border-t-transparent border-gray-800 animate-[spin_1s_linear_infinite]"></div>
          <div className="absolute top-0 h-16 w-16 rounded-full border-8 border-t-transparent border-white animate-[spin_1.5s_linear_infinite]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-16 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Fixtures Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Magnet padding={500} disabled={false} magnetStrength={50}>
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
                Season Fixtures
              </h2>
            </Magnet>
            <p className="mt-4 text-xl text-gray-300">Group Stage Matches</p>
          </div>

          {/* Group Selection */}
          <div className="flex justify-center gap-2 md:gap-4 mb-8">
            {fixtureGroups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-3 md:px-6 py-1 md:py-2 text-sm md:text-base rounded-full transition-all duration-300 ${
                  selectedGroup === group
                    ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Group {group}
              </button>
            ))}
          </div>

          {/* Fixtures Table */}
          <div className="glassmorphism rounded-xl p-6 overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-4">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-left text-gray-300">Date</th>
                  <th className="py-3 px-4 text-left text-gray-300">Player 1</th>
                  <th className="py-3 px-4 text-center text-gray-300 w-20">VS</th>
                  <th className="py-3 px-4 text-right text-gray-300">Player 2</th>
                  <th className="py-3 px-4 text-center text-yellow-400">Result</th>
                </tr>
              </thead>
              <tbody>
                {currentFixtures.map((match, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="py-4 px-4 text-gray-400">{match.date}</td>
                    <td className="py-4 px-4 text-cyan-400">{match.player1}</td>
                    <td className="py-4 px-4 text-center text-gray-300 w-20">VS</td>
                    <td className="py-4 px-4 text-right text-pink-400">{match.player2}</td>
                    <td className="py-4 px-4 text-center text-yellow-400">{match.result}</td>
                  </motion.tr>
                ))}
                {currentFixtures.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400">
                      No fixtures available for this group
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}