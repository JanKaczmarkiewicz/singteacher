import { useEffect, useState } from "react";
import { Command } from "@tauri-apps/api/shell";
import { readDir, BaseDirectory } from "@tauri-apps/api/fs"
import "./App.css";
import { Link } from "react-router-dom";

const fetchListOfSongs = async () => readDir("", { dir: BaseDirectory.AppLocalData }).then((files) =>
  files.map((file) => file.name!)
)

function App() {

  async function createSong() {
    const command = new Command('down_on_spot', [song]);
    command.on('close', data => {
      console.log(`command finished with code ${data.code} and signal ${data.signal}`)
    });
    command.on('error', error => console.error(`command error: "${error}"`));
    command.stdout.on('data', line => console.log(`command stdout: "${line}"`));
    command.stderr.on('data', line => console.log(`command stderr: "${line}"`));
    const child = await command.spawn();
    await child.write('\n');

    command.once("close", () => fetchListOfSongs().then(setListOfSongs))
  }

  const [song, setSong] = useState("");
  const [listOfSongs, setListOfSongs] = useState<string[]>([]);

  useEffect(() => {
    fetchListOfSongs().then(setListOfSongs)
  }, [])


  return (
    <div className="container">

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          createSong();
        }}
      >
        <input
          value={song}
          onChange={(n) => setSong(n.target.value)}
          placeholder="Enter a name of song..."
        />
        <button type="submit">Prepare</button>
      </form>

      {listOfSongs.map((songName) =>
        <div key={songName}>
          {songName}
          <Link to={`/singing/${songName}`}>Sing</Link>
        </div>
      )}
    </div>
  );
}

export default App;
