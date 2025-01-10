'use client'
import React, { useState } from 'react';
const SideContext = React.createContext();

function SideProvider(props) {
    const [isOpen, setOpen] = useState(false)
    const [noticationOpened, setNoticationOpened] = useState(false)
    return (
        <SideContext.Provider
            value={{ 
                isOpen, setOpen,
                noticationOpened, setNoticationOpened
             }}>
            {props.children}
        </SideContext.Provider>
    );
}

export { SideProvider, SideContext };