"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { useBoolean, useEventListener, useOnClickOutside } from "usehooks-ts";
import useScroll from "@/hooks/useScroll";

type DropdownProps = {
    children: React.ReactNode;
    trigger: React.ReactNode;
};

export default function Dropdown({ children, trigger }: DropdownProps) {
    const { value: isOpen, setFalse, toggle } = useBoolean(false);

    useScroll(setFalse, 1000);
    const dropdown = useRef<HTMLDivElement>(null);
    const menu = useRef<HTMLElement>(null);

    useOnClickOutside(dropdown, setFalse);
    useEventListener("keyup", (e) => {
        if (isOpen && e.key === "Escape") setFalse();
    });

    useEffect(() => {
        if (!menu.current) return;

        const { x, width } = menu.current.getBoundingClientRect();

        if (x + width > window.innerWidth) {
            menu.current.style.left = `${window.innerWidth - (x + width) - 20}px`;
        }
    }, [isOpen]);

    return (
        <div className="dropdown" ref={dropdown}>
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
                    <MdClose className="icon" />
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
