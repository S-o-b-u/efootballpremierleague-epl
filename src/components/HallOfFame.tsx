"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, ReactNode } from "react";
import {
  Trophy,
  Star,
  Medal,
  Crown,
  Target,
  Zap,
  ShieldCheck,
  Clock,
  Compass,
} from "lucide-react";
import Footer from "./Footer";

interface Achievement {
  id: number;
  title: string;
  player: string;
  value: string;
  icon: ReactNode;
  description: string;
}

interface MatchData {
  date: string;
  group: string;
  player: string;
}

interface KnockoutData {
  date: string;
  stage: string;
  player: string;
}

export function HallOfFame() {
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(
    null
  );
  const [activeSection, setActiveSection] = useState<
    "hallOfFame" | "manOfMatch"
  >("hallOfFame");
  const [groupStageData, setGroupStageData] = useState<MatchData[]>([]);
  const [knockoutData, setKnockoutData] = useState<KnockoutData[]>([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Most Goals in a Season",
      player: "Sarnadip Das",
      value: "32 Goals",
      icon: <Trophy className="h-8 w-8 text-yellow-400" />,
      description: "Set a league record with unmatched scoring brilliance.",
    },
    {
      id: 2,
      title: "Longest Win Streak",
      player: "Abir Dutta",
      value: "8 Matches",
      icon: <Zap className="h-8 w-8 text-blue-400" />,
      description: "Maintained an unbeaten streak with dominant performances.",
    },
    {
      id: 3,
      title: "Clean Sheet King",
      player: "Trishan Roy",
      value: "12 Clean Sheets",
      icon: <Crown className="h-8 w-8 text-purple-400" />,
      description: "A rock-solid wall between the posts all season.",
    },
    {
      id: 4,
      title: "Most Assists",
      player: "Soummyadip Saha",
      value: "28 Assists",
      icon: <Star className="h-8 w-8 text-emerald-400" />,
      description: "Master of vision and passing — a true team player.",
    },
    {
      id: 5,
      title: "Perfect Season",
      player: "Snehasish Saha",
      value: "0 Losses",
      icon: <Medal className="h-8 w-8 text-rose-400" />,
      description: "Achieved the impossible — a season with no losses.",
    },
    {
      id: 6,
      title: "Goal of the Season",
      player: "Abir Dutta",
      value: "40-yard Screamer",
      icon: <Target className="h-8 w-8 text-cyan-400" />,
      description: "Unforgettable long-range rocket into the top corner.",
    },
    {
      id: 7,
      title: "Best Goalkeeper Saves",
      player: "Rahul Sharma",
      value: "51 Saves",
      icon: <ShieldCheck className="h-8 w-8 text-orange-400" />,
      description: "Flying saves and last-minute heroics kept hope alive.",
    },
    {
      id: 8,
      title: "Most Accurate Passer",
      player: "Rishav Paul",
      value: "92% Accuracy",
      icon: <Compass className="h-8 w-8 text-green-500" />,
      description: "A midfield maestro with razor-sharp passing precision.",
    },
    {
      id: 9,
      title: "Fastest Goal",
      player: "Souvik Roy",
      value: "13 Seconds",
      icon: <Clock className="h-8 w-8 text-red-400" />,
      description: "Took control from kickoff and stunned the crowd.",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const spreadsheetId = "1xOeEka4udzAQQJYnzVtG1NQc37I35FChsJ_2ED2RHvA";
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;

      try {
        const groupResponse = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/ManOfMatch!A2:C113?key=${apiKey}`
        );
        const knockoutResponse = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/ManOfMatch!F4:H7?key=${apiKey}`
        );

        const groupJson = await groupResponse.json();
        const knockoutJson = await knockoutResponse.json();

        if (groupJson.values) {
          const formattedGroup: MatchData[] = groupJson.values.map(
            (row: string[]) => ({
              date: row[0]?.trim() || "TBD",
              group: row[1]?.trim() || "TBD",
              player: row[2]?.trim() || "TBD",
            })
          );
          setGroupStageData(formattedGroup);
        }

        if (knockoutJson.values) {
          const formattedKnockout: KnockoutData[] = knockoutJson.values
            .slice(1)
            .map((row: string[]) => ({
              date: row[0]?.trim() || "TBD",
              stage: row[1]?.trim() || "TBD",
              player: row[2]?.trim() || "TBD",
            }));
          setKnockoutData(formattedKnockout);
        }
      } catch (error) {
        console.error("Fetch Error", error);
      }
    };

    fetchData();
  }, []);

  const calculateBestPlayer = () => {
    const all = [...groupStageData, ...knockoutData];
    const tally = all.reduce((acc: Record<string, number>, item) => {
      acc[item.player] = (acc[item.player] || 0) + 1;
      return acc;
    }, {});
    const best = Object.keys(tally).reduce(
      (a, b) => (tally[a] > tally[b] ? a : b),
      ""
    );
    return { player: best, count: tally[best] };
  };

  const groupedByDate = groupStageData.reduce(
    (acc: Record<string, MatchData[]>, item) => {
      if (!acc[item.date]) acc[item.date] = [];
      acc[item.date].push(item);
      return acc;
    },
    {}
  );

  const uniqueDates = Object.keys(groupedByDate).filter(
    (date) => date !== "TBD"
  );
  const next7Dates = uniqueDates.slice(0, 7);
  const selectedDate = next7Dates[selectedDayIndex] || "TBD";
  const todayPlayers = groupedByDate[selectedDate] || [];

  const groups: Record<string, string> = {
    A: "TBD",
    B: "TBD",
    C: "TBD",
    D: "TBD",
  };
  todayPlayers.forEach((p) => (groups[p.group] = p.player));

  const bestPlayer = calculateBestPlayer();

  return (
    <>
      <div className="min-h-screen px-4 text-white">
        <div className="text-center flex flex-col items-center mb-8 gap-10">
          <motion.h1
            className="text-5xl font-bold text-white mb-4 font-efootball-stencil"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            Season Highlights
          </motion.h1>
          <div className="space-x-4 flex">
            {[
              { key: "hallOfFame", label: "Hall of Fame" },
              { key: "manOfMatch", label: "Man of the Match" },
            ].map(({ key, label }) => (
              <motion.button
                key={key}
                onClick={() =>
                  setActiveSection(key as "hallOfFame" | "manOfMatch")
                }
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeSection === key
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeSection === "hallOfFame" && (
            <motion.div
              key="hall"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-semibold text-center mb-8">
                Hall of Fame
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    className={`glassmorphism rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                      selectedAchievement === achievement.id
                        ? "scale-105 ring-2 ring-cyan-400"
                        : "hover:scale-105"
                    }`}
                    onClick={() =>
                      setSelectedAchievement(
                        selectedAchievement === achievement.id
                          ? null
                          : achievement.id
                      )
                    }
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {achievement.icon}
                        <h3 className="text-xl font-semibold text-white">
                          {achievement.title}
                        </h3>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Player</span>
                        <span className="text-emerald-400 font-semibold">
                          {achievement.player}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Stat</span>
                        <span className="text-cyan-400 font-semibold">
                          {achievement.value}
                        </span>
                      </div>
                      {selectedAchievement === achievement.id && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 text-gray-400 text-sm"
                        >
                          {achievement.description}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "manOfMatch" && (
            <motion.div
              key="man"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-semibold text-center mb-8 bg-white text-transparent bg-clip-text">
                Man of the Matches
                <br />
                <span className="text-2xl font-semibold bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 text-transparent bg-clip-text">
                  Group Stage
                </span>
              </h2>
              <div className="flex justify-center mb-6 space-x-2 overflow-x-auto pb-2">
                {Array.from({ length: 7 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDayIndex(i)}
                    className={`px-4 py-2 rounded-full ${
                      selectedDayIndex === i
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-grey-900 text-gray-300"
                    } hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300`}
                    disabled={i >= next7Dates.length}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <div className="max-w-3xl mx-auto bg-black bg-opacity-10 backdrop-blur-md rounded-xl p-6 text-center shadow-lg border border-white/10">
                <h3 className="text-xl font-bold mb-4 flex justify-between bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                  <span>Match Day {selectedDayIndex + 1}</span>
                  <span>{selectedDate}</span>
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
                  <div>
                    <p className="text-purple-400 font-semibold">
                      Group A: <span className="text-white">{groups.A}</span>
                    </p>
                    <p className="text-purple-400 font-semibold">
                      Group B: <span className="text-white">{groups.B}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-purple-400 font-semibold">
                      Group C: <span className="text-white">{groups.C}</span>
                    </p>
                    <p className="text-purple-400 font-semibold">
                      Group D: <span className="text-white">{groups.D}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 text-transparent bg-clip-text">
                  Knockout Stages
                </h2>
                {knockoutData.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-black bg-opacity-10 backdrop-blur-md rounded-xl p-4 mb-4 shadow-md border border-white/10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <p className="text-purple-400 font-semibold">
                      {item.stage}
                    </p>
                    <p className="text-pink-400">{item.player}</p>
                    <p className="text-fuchsia-400">{item.date}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 mb-10 text-center">
                <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-transparent bg-clip-text">
                  Best Player of the Tournament
                </h2>
                <div className="bg-black bg-opacity-10 backdrop-blur-md inline-block px-6 py-4 rounded-xl shadow-lg border border-white/10">
                  <p className="text-purple-400 font-semibold">
                    Player: {bestPlayer.player}
                  </p>
                  <p className="text-pink-400">Awards: {bestPlayer.count}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
}
