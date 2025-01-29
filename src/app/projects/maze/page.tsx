"use client";

import { useEffect, useRef } from "react";

type RaycastingWasm = {
    resumeMainLoop: () => void;
    pauseMainLoop: () => void;
    _reset_frame_time: () => void;
};

export default function MazeTribute() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const wasmRef = useRef<RaycastingWasm | null>(null);
    const loadingRef = useRef(false);

    useEffect(() => {
        //if (loadingRef.current) return;
        //loadingRef.current = true;
        //import("../../../../public/raycasting.js")
        //    .then((module) => module.default({ canvas: canvasRef.current }))
        //    .then((wasm: RaycastingWasm) => {
        //        if (wasmRef.current) return;
        //        wasmRef.current = wasm;
        //    });
        //
        //document.addEventListener("visibilitychange", () => {
        //    document.visibilityState === "visible" ? play() : pause();
        //});
    }, []);

    function play() {
        wasmRef.current?.resumeMainLoop();
        wasmRef.current?._reset_frame_time();
    }
    function pause() {
        wasmRef.current?.pauseMainLoop();
    }

    return (
        <div className="layout-content">
            <header>
                <h1 className="post__title">Windows 95&apos; Screensaver</h1>
                <div id="preamble" className="post__content mb-2">
                    <p className="mb-2">
                        A tribute to the classic Windows 95&apos; maze walk
                        screensaver. It doesn&apos;t look all that impressive,
                        but I absolutely love it!
                    </p>
                    <p className="mb-2">
                        It implements the same raycasting algorithm used in
                        Wolfenstein 3D&apos;s back in the 90&apos;s. It&apos;s
                        written in the C programming language, and compiled for
                        the web using Web Assembly.
                    </p>
                </div>
            </header>
            <canvas ref={canvasRef} width="535" height="250" />
        </div>
    );
}
