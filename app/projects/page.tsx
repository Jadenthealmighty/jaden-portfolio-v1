export default function ProjectsPage() {
    return (
      <>
        {(controls) => (
          <main className="px-12 py-20 max-w-4xl">
            <div className="mb-10">
              <label className="block text-sm text-gray-400 mb-2">
                Lens Focal Length
              </label>
              <input
                type="range"
                min={0.5}
                max={5}
                step={0.01}
                value={controls.focalLength}
                onChange={(e) =>
                  controls.setFocalLength(Number(e.target.value))
                }
                className="w-64"
              />
            </div>
  
            <h1 className="text-5xl font-bold mb-6">Projects</h1>
          </main>
        )}
      </>
    );
  }
  