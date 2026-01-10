import InteractiveBackground from "app/components/mlBackground";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative min-h-screen text-white">
      <InteractiveBackground />
      {children}
    </section>
  );
}
