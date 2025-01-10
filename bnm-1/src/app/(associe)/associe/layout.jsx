import Header from "@/app/ui/head/header-server";
import MiniNavbar from "@/app/ui/head/mini-navbar";
import SidebarAssocie from "@/app/ui/associe/sidebar";
import Notification from "@/app/ui/head/notification";
import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SecretaireLayout({ children }) {
  const session = await auth();
  if (session?.user?.role !== 3) {
    redirect('/auth/login');
  }
  return (
    <>
      <div className="w-full h-auto md:h-screen">
        <div className="w-[100%] h-full" style={{ display: "flex" }}>
          <SidebarAssocie />
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
                  <Suspense>
                    <Notification />
                  </Suspense>
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
