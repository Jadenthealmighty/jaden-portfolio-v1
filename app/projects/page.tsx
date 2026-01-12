export default function ProjectsPage() {
    return (
      <section>
        <main className="relative z-10 px-12 pt-[40vh] pb-20 max-w-4xl lg:max-w-5xl xl:max-w-6xl">
        </main>
       

        <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
            About This Page
        </h2>
          <p className="mb-4">
          This is an accurate lens optics simulation; your mouse position 
          (tap position on mobile) determines the focal length and camera distance 
          in the setup. Mathematically, this was the hardest simulation to write out. 
          This was largely because there isn’t an efficient way to project transforms 
          through a physical lens without some shortcuts. 
          </p>
          <p className="mb-10">
          Not only does this program derive the characteristics of the lens from the 
          focal length, but it also accounts for spherical aberrations, given the attributes 
          of a non-ideal lens. Then, the most difficult part was efficiently computing the 
          chromatic distortions near the edges of the lens, which was done by referencing a 
          pre-processed hue LUT I’ve simulated in Python.
        </p>
        <h1 className="mb-8 text-5xl font-semibold tracking-tighter">
        Projects
        </h1>
        <div>
  <div className="projects-nav">
    <a href="#project1" className="project-nav-item">
      <span>Project Alpha</span>
    </a>
    <a href="#project2" className="project-nav-item">
      <span>Project Beta</span>
    </a>
    <a href="#project3" className="project-nav-item">
      <span>Project Gamma</span>
    </a>
    <a href="#project4" className="project-nav-item">
      <span>Project Delta</span>
    </a>
    <a href="#project5" className="project-nav-item">
      <span>Project Epsilon</span>
    </a>
    <a href="#project6" className="project-nav-item">
      <span>Project Zeta</span>
    </a>
    <a href="#project7" className="project-nav-item">
      <span>Project Eta</span>
    </a>
    <a href="#project8" className="project-nav-item">
      <span>Project Theta</span>
    </a>
    <a href="#project9" className="project-nav-item">
      <span>Project Iota</span>
    </a>
  </div>

  <div id="project1">
  <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        Title
      </h2>
      <p className="mb-4">
      ERROR BAD ACCESS</p>
  </div>

  <div id="project2">
  <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        Title
      </h2>
      <p className="mb-4">
      ERROR BAD ACCESS</p>
  </div>

  <div id="project3">
  <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        Title
      </h2>
      <p className="mb-4">
      ERROR BAD ACCESS</p>
  </div>

</div>
        <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        Title
      </h2>
      <p className="mb-4">
      ERROR BAD ACCESS</p>

    <p className="mb-10">

      </p>
      
        </section>
    );
  }
  