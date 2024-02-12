import { useState } from "react";
import { Command } from "@tauri-apps/api/shell";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {

    // const command = new Command('/Users/raf/projects/DownOnSpot/target/release/down_on_spot');
    // command.on('close', data => {
    //   console.log(`command finished with code ${data.code} and signal ${data.signal}`)
    // });
    // command.on('error', error => console.error(`command error: "${error}"`));
    // command.stdout.on('data', line => console.log(`command stdout: "${line}"`));
    // command.stderr.on('data', line => console.log(`command stderr: "${line}"`));

    const command = new Command('down_on_spot', ["The Doors - The End"]);

    command.on('close', data => {
      console.log(`command finished with code ${data.code} and signal ${data.signal}`)
    });
    command.on('error', error => console.error(`command error: "${error}"`));
    command.stdout.on('data', line => console.log(`command stdout: "${line}"`));
    command.stderr.on('data', line => console.log(`command stderr: "${line}"`));

    const child = await command.spawn();
    await child.write('1\n');


  }

  return (
    <div className="container">

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
