import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="mb-4 text-2xl text-foreground">Project not found</h1>
      <Link
        href="/#projects"
        className="text-sm text-primary underline-offset-4 hover:underline"
      >
        Back to projects
      </Link>
    </main>
  );
}
