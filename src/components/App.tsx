import CharacterAttributes from "./CharacterAttributes";
import CharacterEquipment from "./CharacterEquipment";
import CharacterStats from "./CharacterStats";

function App() {
  return (
    <>
      <header className="w-screen">
        <h1 className="text-center text-4xl text-amber-500/75 p-2 font-Teco font-extrabold">
          Throne and Liberty Calculator
        </h1>
      </header>
      <main className="grid sm:grid-cols-[64px,_1fr] lg:grid-cols-[410px_1fr] max-w-[1920px] m-auto p-2 sm:p-5 gap-6 items-start">
        <CharacterEquipment className="" />
        <div className="flex bg-neutral5 rounded-xl p-2 gap-2 flex-wrap 3xl:flex-nowrap">
          <CharacterStats className="grow" />
          <CharacterAttributes />
        </div>
      </main>
    </>
  );
}

export default App;
