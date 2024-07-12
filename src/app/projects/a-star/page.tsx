"use client";

import { useEffect } from "react";

export default function AStarVisualizationProject() {
    useEffect(() => {
        import("@d10f/a-star-viz");
    }, []);

    return (
        <main className="layout-content">
            <header>
                <h1 className="post__title">A* Pathfinding Visualization</h1>
                <div id="preamble" className="post__content">
                    <p>
                        An interactive visualization of the A* pathfinding
                        algorithm. Play around with the tile map to create your
                        own setup and put the algorithm to the test.
                    </p>
                    <p>
                        It&apos;s very straight forward but here&apos;s a few
                        simple instructions on how to use it. I hope you enjoy
                        the Catan-like aesthetics!
                    </p>
                </div>

                <div className="sect1 post__content">
                    <h2 id="_instructions">Instructions</h2>
                    <div className="sectionbody">
                        <div className="paragraph">
                            <p>
                                Use your mouse (or pointer) to select one of the
                                terrain tiles and use it to &quot;paint&quot;
                                over the map to create any disposition you like.
                                Terrain tiles are sorted from left to right in
                                order of
                                <em>passability</em>: grass, wheat, desert,
                                forest, ore, mountain and water.
                            </p>

                            <p>
                                Set a &quot;start&quot; and &quot;target&quot;
                                locations for the algorithm to use in a similar
                                fashion as terrain tiles. Only one of each can
                                exists.
                            </p>

                            <p>
                                Finally, use &quot;play&quot;, &quot;pause&quot;
                                and speed controls to, well, control the
                                animation at your own leisure.
                            </p>

                            <div className="admonition warning">
                                <svg xmlns="http://www.w3.org/2000/svg">
                                    <use href="/sprite.svg#icon-warning"></use>
                                </svg>
                                <p>
                                    Support for mobile devices is still pretty
                                    limited and will be improved at a later
                                    time.
                                </p>
                            </div>

                            <div className="admonition important">
                                <svg xmlns="http://www.w3.org/2000/svg">
                                    <use href="/sprite.svg#icon-important"></use>
                                </svg>
                                <p>
                                    For better visual results, it&apos;s adviced
                                    to use one of the dark themes from the
                                    palette switcher, found on the navigation
                                    bar.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <a-star-viz />
        </main>
    );
}
