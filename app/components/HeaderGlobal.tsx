import Image from "next/image";
import NavigationBack from "./NavigationBack";

export default function HeaderGlobal() {
  return (
    <>
      <div>
        {/* button back */}
        <NavigationBack />
        <div className="bg-teal-50 rounded-b-3xl mb-2 p-6">
          <Image
            src={"/ngaji barengan.png"}
            alt="Header"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }} // optional
          />

          <div className="py-4">
            {/* <p className="text-center text-sm px-2">
              Ngaji bareng biar ke surga bareng
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}
