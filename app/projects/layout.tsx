import CubeBackground from "app/components/CubeBackground";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative min-h-screen text-white">
      <CubeBackground />
      {children}
    </section>
  );
}
