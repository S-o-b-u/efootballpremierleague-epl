import React from "react";
import { Trophy, Calendar, Users2, Clock } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

const Tournaments = () => {
  const tournaments = [
    {
      id: 1,
      name: "Season 2 Premier League",
      status: "Not Started Yet",
      startDate: "2025-02-06",
      endDate: "Not Mentioned",
      participants: "20+",
      matches: "120+",
      completed: "None",
    },
    {
      id: 2,
      name: "EPL SEASON 3 | 2025",
      status: "upcoming",
      startDate: "2025-07-01",
      endDate: "Not Mentioned",
      participants: "20+",
      format: "League Format",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-5 mt-20 mb-5 md:gap-5 md:p-4  w-[90%] md:w-[60%] mx-auto relative p-4 justify-start items-center text-white min-h-screen">
        {/* Header */}
        <h1 className="text-3xl font-bold flex items-center gap-2 justify-center mb-8">
          <Trophy className="h-8 w-8 text-cyan-400" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#56c5bc] via-[#14B8A6] to-[#0EA5E9] drop-shadow-[0_0_10px_rgba(14,181,233,0.7)] ">
            Tournaments
          </span>
        </h1>

        {/* Wrapper for stretching on larger screens */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-10 w-full max-w-screen-lg">
          {/* Active Tournament */}
          <div className="glassmorphism rounded-lg p-6 w-full md:w-1/2">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-emerald-400 text-black text-wrap text-center text-xs font-semibold rounded-full">
                  Live
                </span>
                <h2 className="text-xl font-bold gradient-text">
                  Efootball Fuckers Cup | Season 1
                </h2>
              </div>
              <div className="flex items-center gap-4 text-cyan-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Jun 1- Jun 15</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users2 className="h-4 w-4" />
                  <span className="text-sm">6 Players</span>
                </div>
              </div>
              <div className="glassmorphism flex flex-col gap-2 px-4 py-4 rounded-lg">
                <div className="text-sm text-cyan-400">Progress</div>
                <div className="text-2xl font-bold gradient-text">
                  15/30 Matches
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Tournaments */}
          <div className="glassmorphism rounded-lg p-6 w-full md:w-1/2">
            <h2 className="text-xl font-bold mb-4 gradient-text">
              Upcoming Tournaments
            </h2>
            {tournaments
              .filter((t) => t.status === "upcoming")
              .map((tournament) => (
                <div
                  key={tournament.id}
                  className="glassmorphism rounded-lg p-4 mb-4"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold gradient-text">
                      {tournament.name}
                    </h3>
                    <div className="flex items-center gap-4 text-cyan-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{tournament.startDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users2 className="h-4 w-4" />
                        <span className="text-sm">
                          {tournament.participants} Players
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-400 text-black text-xs font-semibold rounded-full">
                      {tournament.format}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Tournament History */}
        <div className="mt-8 w-full max-w-screen-lg">
          <h2 className="text-xl font-bold mb-4 gradient-text">
            Previous Tournaments
          </h2>
          <div className="flex flex-col gap-5">
            <div className="glassmorphism rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="flex flex-col gap-5">
                  <h3 className="text-lg font-semibold gradient-text">
                    Season 1 | Efootball Derby Cup
                  </h3>
                  <div className="flex items-center gap-4 text-cyan-400">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Completed May 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm">Winner: Trishan & Soummyadip</span>
                    </div>
                  </div>
                </div>
                <Link href={"/instagram"}>
                  <button className="text-cyan-400 hover:text-emerald-400 text-sm transition-colors duration-150">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
            <div className="glassmorphism rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="flex flex-col gap-5">
                  <h3 className="text-lg font-semibold gradient-text">
                    Season 2 | Efootball Premier League
                  </h3>
                  <div className="flex items-center gap-4 text-cyan-400">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Completed Feb 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm">Winner: Abir Dutta</span>
                    </div>
                  </div>
                </div>
                <Link href={"/instagram"}>
                  <button className="text-cyan-400 hover:text-emerald-400 text-sm transition-colors duration-150">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
            <div className="glassmorphism rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="flex flex-col gap-5">
                  <h3 className="text-lg font-semibold gradient-text">
                    Season 1 | Efootball Premier League
                  </h3>
                  <div className="flex items-center gap-4 text-cyan-400">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Completed Dec 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm">Winner: Sarnadip Das</span>
                    </div>
                  </div>
                </div>
                <Link href={"/instagram"}>
                  <button className="text-cyan-400 hover:text-emerald-400 text-sm transition-colors duration-150">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tournaments;
