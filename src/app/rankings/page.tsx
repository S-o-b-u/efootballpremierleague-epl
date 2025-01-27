"use client";
import React from "react";
import { Trophy, TrendingUp, Users2 } from "lucide-react";
import Magnet from "@/components/Magnet";
import Footer from "@/components/Footer";

const Rankings = () => {
  const players = [
    { rank: 1, name: "Sarnadeep Das", points: 18, wins: 6, losses: 1 },
    { rank: 2, name: "Abir Dutta", points: 16, wins: 5, losses: 1 },
    { rank: 3, name: "Snehasish Saha", points: 15, wins: 5, losses: 1 },
  ];

  return (
    <>
      <div className="flex relative p-2 justify-center overflow-y-auto scrollbar-hide overflow-x-hidden text-white  items-center min-h-screen">
        <div className="flex flex-col gap-5 mt-20 mb-5 md:gap-5 md:p-4  w-[90%] md:w-[60%] mx-auto">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Trophy className="h-8 w-8 text-cyan-400 float-effect" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#56c5bc] via-[#14B8A6] to-[#0EA5E9] drop-shadow-[0_0_10px_rgba(14,181,233,0.7)] ">
                Season 1 Rankings
              </span>
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 glassmorphism px-4 py-2 rounded-full">
            <Users2 className="h-5 w-5 text-emerald-400" />
            <span className="text-cyan-400">20 Players</span>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Total Matches", value: "40", icon: <TrendingUp /> },
              { title: "Goals Scored", value: "231", icon: <Trophy /> },
              { title: "Avg Goals", value: "5.78", icon: <Trophy /> },
            ].map((stat, index) => (
              <div
                key={index}
                className="glassmorphism p-4 rounded-lg hover-scale glow-effect"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-cyan-400">{stat.title}</h3>
                  <div className="text-emerald-400">{stat.icon}</div>
                </div>
                <p className="text-2xl font-bold mt-2 gradient-text">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Rankings Table */}
          <div className="glassmorphism rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-cyan-400/20">
              <thead className="bg-cyan-400/10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider">
                    Player
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider">
                    W/L
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-400/20">
                {players.map((player) => (
                  <tr
                    key={player.rank}
                    className="hover:bg-cyan-400/5 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {player.rank <= 3 && (
                          <Trophy
                            className={`h-5 w-5 mr-2 float-effect ${
                              player.rank === 1
                                ? "text-emerald-400"
                                : player.rank === 2
                                ? "text-cyan-400"
                                : "text-cyan-600"
                            }`}
                          />
                        )}
                        <span className="text-sm">{player.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {player.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm gradient-text font-semibold">
                      {player.points}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="text-emerald-400">{player.wins}</span>-
                      <span className="text-cyan-400">{player.losses}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Rankings;
