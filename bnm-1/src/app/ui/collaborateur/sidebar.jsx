'use client'
import Image from "next/image";
import Link from "next/link";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { React, useEffect, useState, useContext } from "react";
import { FaFile } from 'react-icons/fa';
import { FaCodeBranch } from 'react-icons/fa';
import { FaStopwatch } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { IoSettingsSharp } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiLogoutCircleLine } from "react-icons/ri";
import { SessionContext } from "../context/auth";
import { useRouter } from "next/navigation";
import { apiLinks, routeLinks } from "@/app/_libs/links";
import { SideContext } from "../context/sidebar";


export default function SidebarCollaborateur() {
  const users = useContext(SessionContext);
  const { isOpen, setOpen} = useContext(SideContext);
  const [toggled, setToggled] = useState(false);
  const router = useRouter()

  const handleLogout = async () => {
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({})
    };
    const response = await fetch(apiLinks.logout, data)
    if (response) {
      const data = await response.json();
      if (data.message === "Success") {
        // Supprimer le token du localStorage
        localStorage.removeItem('token');
        router.push(routeLinks.login);
      }
    }
    else {
      console.log('Error')
      setError('Erreur de se déconnecter')
    }
  };
  useEffect(() => {
    const storedToggled = localStorage.getItem('sidebarToggled');
    setToggled(storedToggled === 'true');
  }, []);
  useEffect(() => {
    localStorage.setItem('sidebarToggled', toggled.toString());
  }, [toggled]);
  return (
    <Sidebar
      onBackdropClick={() => setOpen(!isOpen)}
      toggled={isOpen}
      breakPoint="lg"
      className={`bg-white z-100 ${isOpen ? "block" : "hidden lg:block"
        }`}
    >
      <Menu>
        <div className="w-[65%] h-[50%] mx-auto">
          <Image
            src="/Logo/Logo.png"
            width={500}
            height={500}
            alt="notre signe"
          />
        </div>
        <div className="border rounded-md">
          <MenuItem
            icon={<FaHome />}
            component={<Link href={routeLinks.collaborateur} />}
            className="text-slate-700 text-md font-bold"
          >
            {" "}
            Home{" "}
          </MenuItem>
        </div>
       
        <div className="border rounded-md">
          <MenuItem
            icon={<FaFile />}
            component={<Link href={routeLinks.collaborateurRapport} />}
            className="text-slate-700 text-md font-bold"
          >
            {" "}
            Rapport{" "}
          </MenuItem>
        </div>
        <div className="border rounded-md">
          <MenuItem
            icon={<FaCodeBranch />}
            component={<Link href={routeLinks.collaborateurCondense} />}
            className="text-slate-700 text-md font-bold"
          >

            {" "}
            Condensé{" "}
          </MenuItem>
        </div>
        <div className="border rounded-md">
          <MenuItem
            icon={<FaStopwatch />}
            component={<Link href={routeLinks.collaborateurDemandeConge} />}
            className="text-slate-700 text-md font-bold"
          >
            {" "}
            Demande De Congé{" "}
          </MenuItem>
        </div>
        <div className="border rounded-md">
          <SubMenu
            icon={<IoSettingsSharp />}
            label="Paramètre"
            className="text-slate-700 text-md font-bold"
          >
            <MenuItem
              icon={<RiLockPasswordFill />}
              component={
                <Link href={routeLinks.forgotPassword} />
              }
            >
              {" "}
              Changer le mot de passe{" "}
            </MenuItem>
            <MenuItem
              icon={<RiLogoutCircleLine />}
              onClick={() => handleLogout()}
            >
              {" "}
              Déconnecter{" "}
            </MenuItem>
          </SubMenu>
        </div>
      </Menu>
    </Sidebar>
  )
}