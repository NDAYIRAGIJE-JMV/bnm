import Header from "@/app/ui/head/header-server";
import MiniNavbar from "@/app/ui/head/mini-navbar";
import SidebarSecret from "@/app/ui/secretaire/sidebar";

export default function SecretaireLayout({ children }) {
  return (
    <>
      <div className="w-full h-auto md:h-screen">
        <div className="w-[100%] h-full" style={{ display: "flex" }}>
          <SidebarSecret />
          <main
            className="w-[100%] h-full overflow-y-auto"
            style={{ display: "flex", padding: 10 }}
          >
            <div className="w-full h-full ">
              <MiniNavbar />
              <div className="w-[100%] h-auto">
                <div>
                  <Header />
                </div>
                <div className="w-[100%] h-full mt-4 rounded-md border border-blue-800">
                  {children}
                </div>
                <div className="h-[1rem]"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
