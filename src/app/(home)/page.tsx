import FBingo from "./_components/FBingo";
import TBingo from "./_components/TBingo";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <header className="w-full h-16 bg-red-300 flex items-center justify-between px-16">
        <h2 className="text-4xl font-bold">Bingo's</h2>
        <FBingo />
      </header>
      <TBingo />
    </div>
  );
}
