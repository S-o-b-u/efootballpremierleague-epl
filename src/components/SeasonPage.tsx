"use client";

import { motion } from "framer-motion";
import { useState } from "react";
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
import Magnet from "./Magnet";

export function SeasonPage() {
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null);

  const achievements = [
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
      icon: <Compass className="h-8 w-8 text-green-400" />,
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

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <Magnet padding={500} disabled={false} magnetStrength={50}>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
              Hall of Fame
            </h1>
          </Magnet>
          <p className="mt-4 text-xl text-gray-300">
            Celebrating the legendary moments and heroic performances
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  selectedAchievement === achievement.id ? null : achievement.id
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

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-lg">
            Dream of making it to the Hall of Fame?
          </p>
          <Magnet padding={500} disabled={false} magnetStrength={50}>
            <a
              href="https://www.instagram.com/efootballpremierleague/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-8 py-3 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold rounded-full hover:opacity-90 transition-opacity"
            >
              Join the Next Season
            </a>
          </Magnet>
        </div>
      </div>
    </div>
  );
}
