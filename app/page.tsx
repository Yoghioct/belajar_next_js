import Header from "./components/HeaderGlobal";
import AyahTabs from "./components/Tab";

export default function HomePage() {
  // const { sura } = params;
  // const suraId = parseInt(sura, 10);

  return (
    <>
      <main className="flex flex-col items-center justify-center bg-gray-100 body">
        <div className="w-full max-w-lg bg-white min-h-screen shadow-lg">
          {/* {suraId} */}
          <Header />
          <div className="p-4">
            <AyahTabs />
          </div>
        </div>
      </main>
    </>
  );
}
