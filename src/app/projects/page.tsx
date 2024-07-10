import PostTag from "@/components/PostTag";
import { getPostData } from "@/lib/asciidoc/posts";
import { getDocs } from "@/lib/asciidoc/posts";

export default function ProjectPage() {
    const projectPage = getPostData("public/pages/projects.adoc");
    const projects = getDocs("projects");

    return (
        <main className="layout-content">
            <header>
                <h1 className="post__title">{projectPage.title}</h1>
                <div
                    id="preamble"
                    className="post__content"
                    dangerouslySetInnerHTML={{ __html: projectPage.content }}
                />
            </header>

            {projects.map((project) => (
                <article className="project" key={project.slug}>
                    <header>
                        <h2 className="project__title">{project.title}</h2>
                    </header>

                    <aside className="project__tags">
                        {project.technologies.map((tech) => (
                            <PostTag tag={tech} key={project.title + tech} />
                        ))}
                    </aside>

                    <div
                        className="project__description"
                        dangerouslySetInnerHTML={{ __html: project.content }}
                    />
                </article>
            ))}
        </main>
    );
}
