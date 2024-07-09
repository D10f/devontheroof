import PostTag from "@/components/PostTag";
import { getDocs } from "@/lib/asciidoc/posts";

export default function ProjectPage() {
    const projects = getDocs("projects");

    return (
        <main className="layout-content">
            {projects.map((project) => (
                <article className="project" key={project.slug}>
                    <header>
                        <h2 className="project__title">{project.title}</h2>
                    </header>

                    <aside className="project__tags">
                        {project.technologies.map((tech) => (
                            <PostTag tag={tech} key={project.title} />
                        ))}
                    </aside>

                    <p
                        className="project__description"
                        dangerouslySetInnerHTML={{ __html: project.content }}
                    />
                </article>
            ))}
        </main>
    );
}
