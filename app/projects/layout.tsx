export default function ProjectsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="relative min-h-screen bg-black text-white">
        {children}
      </section>
    );
  }
  