"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TfiClose } from "react-icons/tfi";

type DropdownProps = {
    children: React.ReactNode;
    trigger: React.ReactNode;
};

export default function Dropdown({ children, trigger }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen((previous) => !previous);

    const menu = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!menu.current) return;

        const { x, width } = menu.current.getBoundingClientRect();

        if (x + width > window.innerWidth) {
            menu.current.style.left = `${window.innerWidth - (x + width) - 20}px`;
        }
    }, [isOpen]);

    return (
        <div className="dropdown">
            <button
                onClick={toggle}
                className={
                    isOpen
                        ? "dropdown__trigger dropdown__trigger--active"
                        : "dropdown__trigger"
                }
            >
                <span>
                    {trigger}
                    <TfiClose className="icon" />
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        ref={menu}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                    >
                        {children}
                    </motion.aside>
                )}
            </AnimatePresence>
        </div>
    );
}
