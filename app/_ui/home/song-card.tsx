import Image from "next/image";

export function SongCard({ title, artist }: { title: string; artist: string }) {
  return (
    <div>
      <Image
        src="https://i.scdn.co/image/ab67616d00001e020999f662c859a5cae3a3f18a"
        width={100}
        height={100}
        alt="<Title> - <Artist> cover"
      />
      <div>
        <h2>{title}</h2>
        <h3>{artist}</h3>
      </div>
    </div>
  );
}
