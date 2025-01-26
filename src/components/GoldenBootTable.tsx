"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import axios from "axios";
import { AxiosResponse } from "axios";

type GoldenBootPlayer = {
  player: string;
  goals: number;
  matches: number;
};

export function GoldenBoot() {
  const [players, setPlayers] = useState<GoldenBootPlayer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGoldenBootData = async () => {
      try {
        const sheetId = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY;
        const range = "M4:O23"; 

        const response: AxiosResponse = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
        );

        const rows = response.data.values;
        const parsedPlayers: GoldenBootPlayer[] = rows
          .map((row: string[]) => ({
            player: row[0],
            goals: Number(row[1]),
            matches: Number(row[2]),
          }));

        setPlayers(parsedPlayers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Golden Boot data:", error);
        setLoading(false);
      }
    };

    fetchGoldenBootData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Golden Boot Standings</h2>
      <Table>
        <TableCaption>Golden Boot Rankings</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white font-semibold">Rank</TableHead>
            <TableHead className="text-white font-semibold">Player</TableHead>
            <TableHead className="text-white font-semibold">Goals</TableHead>
            <TableHead className="text-white font-semibold">Matches</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player, index) => (
            <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell className="font-medium">{player.player}</TableCell>
              <TableCell>{player.goals}</TableCell>
              <TableCell>{player.matches}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
