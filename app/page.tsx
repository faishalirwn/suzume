import Image from "next/image";
import { SongCard } from "@/app/_ui/home/song-card";

export default function Home() {
  return (
    <div>
      <div>
        <h1>Trending</h1>
        <div>
          <SongCard title="asd" artist="asd" />
        </div>
      </div>
    </div>
  );
}
