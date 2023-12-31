"use client";
import { Oleo_Script } from "next/font/google";
import { BINGO } from "@/utils/bingo";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const oswald = Oleo_Script({
  weight: "700",
  subsets: ["latin"],
});

export default function Home() {
  const [bingo, setBingo] = useState(BINGO);
  const [numberActualy, setnumberActualy] = useState("00");

  async function sortBingo() {
    const notChosen = bingo.filter((n) => !n.status);
    if (notChosen.length === 0) {
      alert("Todos os números já foram escolhidos!");
      return;
    }
    const i = Math.floor(Math.random() * notChosen.length);
    const numberChonsen = notChosen[i];
    const newB = bingo.map((n) =>
      n.id === numberChonsen.id ? { ...n, status: true } : n
    );
    setBingo(newB);
  }

  function resetBingo() {
    const newB = bingo.map((n) => ({ ...n, status: false }));
    setBingo(newB);
  }

  return (
    <div className="min-h-screen w-full flex justify-center flex-col pb-10 mx-auto px-4 2xl:px-16 space-y-4 bg-neutral-100 select-none">
      <div className="flex items-center justify-around pt-4 gap-8">
        <div className="flex flex-col gap-4">
          <Button
            onClick={sortBingo}
            variant={"outline"}
            className={cn(
              "hover:bg-[#B68133] border-[#B68133] hover:text-white font-semibold text-[#b68133]"
            )}
          >
            Girar o BINGO!!
          </Button>

          <Button
            onClick={resetBingo}
            variant={"outline"}
            className={cn(
              "hover:bg-[#B68133] border-[#B68133] hover:text-white font-semibold text-[#b68133]"
            )}
          >
            Nova rodada!!
          </Button>
        </div>

        <div className="flex items-center justify-center gap-8">
          <div
            className={`${oswald.className} text-7xl font-semibold text-[#B68132]`}
          >
            Bingo Família Coco
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className={`${oswald.className} text-4xl text-[#934C14]`}>
              Feliz
            </div>
            <div
              className={`${oswald.className} text-[#B68132] text-8xl font-black text pt-2`}
            >
              2024
            </div>
          </div>
        </div>

        <Card
          className={cn(
            "bg-[#B68133] shadow-[0_20px_50px_rgba(145,_145,_145,_0.7)] w-52 h-52 rounded-full flex items-center justify-center"
          )}
        >
          <h2 className="text-8xl font-bold text-white">{numberActualy}</h2>
        </Card>
      </div>
      <div className="grid grid-cols-16 gap-4 p-4 bg-white shadow-[0_20px_50px_rgba(182,_129,_50,_0.7)] rounded-md">
        <div className="col-span-1 space-y-4">
          <div
            className={`${oswald.className} bg-[#B68132] shadow-lg w-full text-neutral-100 text-7xl px-3 2xl:py-2 font-bold rounded-md flex items-center justify-center`}
          >
            <h2>B</h2>
          </div>
          <div
            className={`${oswald.className} bg-[#B68132] shadow-lg w-full text-neutral-100 text-7xl px-3 2xl:py-2 font-bold rounded-md flex items-center justify-center`}
          >
            <h2>I</h2>
          </div>
          <div
            className={`${oswald.className} bg-[#B68132] shadow-lg w-full text-neutral-100 text-7xl px-3 2xl:py-2 font-bold rounded-md flex items-center justify-center`}
          >
            <h2>N</h2>
          </div>
          <div
            className={`${oswald.className} bg-[#B68132] shadow-lg w-full text-neutral-100 text-7xl px-3 2xl:py-2 font-bold rounded-md flex items-center justify-center`}
          >
            <h2>G</h2>
          </div>
          <div
            className={`${oswald.className} bg-[#B68132] shadow-lg w-full text-neutral-100 text-7xl px-3 2xl:py-2 font-bold rounded-md flex items-center justify-center`}
          >
            <h2>O</h2>
          </div>
        </div>
        <div className="col-span-15 grid grid-cols-15 gap-4">
          {bingo.map((B, index) => (
            <div
              key={index}
              className={cn(
                "shadow-2xl shadow-neutral-400 w-full text-6xl max-2xl:text-5xl px-3 py-2 font-bold rounded-md flex items-center justify-center",
                B.status
                  ? "bg-[#B68132] text-neutral-100 animate-f0restt"
                  : "bg-neutral-100 text-[#B68132]"
              )}
            >
              <h2>{B.id}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
