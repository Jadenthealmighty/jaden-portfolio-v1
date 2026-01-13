import Link from 'next/link'

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
          This was largely because there isn’t an efficient way to do projection transforms 
          for a physical lens without some shortcuts. 
          </p>
          <p className="mb-10">
          Not only does this program derive the characteristics of the lens from the 
          focal length, but it also accounts for spherical aberrations, given the attributes 
          of a non-ideal lens. Then, the most difficult part was efficiently computing the 
          chromatic distortions near the edges of the lens, which was done by referencing a 
          pre-processed hue LUT I’ve simulated in Python.
        </p>
        <h1 className="mb-8 text-5xl font-semibold tracking-tighter">
        Project Quick Links
        </h1>
        <div>
  <div className="projects-nav">
    <a href="#project1" className="project-nav-item">
      <span>Fourier Analysis of Stocks Options</span>
    </a>
    <a href="#project2" className="project-nav-item">
      <span>My Own Machine Learning Engine</span>
    </a>
    <a href="#project3" className="project-nav-item">
      <span>Cosmic Ray Detection</span>
    </a>
    <a href="#project4" className="project-nav-item">
      <span>UV Fluorescence Spectroscopy</span>
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
      Fourier Analysis of Stock Options Algorithm
      </h2>
      <p className="mb-4 text-center">--In the works--</p>
      <p className="mb-4">
      My largest project to date, this was an endeavor to learn more about 
      the stock & options markets that quickly developed into a larger project 
      with advice and implementation from both academics at the UofT Faculty of 
      Applied Econometrics and industry experts.</p>
      <p className="mb-4">
      Using a gradient optimization algorithm coupled with Fourier signal analysis, 
      we’ve found some pretty incredible results that will hopefully be compiled and 
      openly available soon. The primary focus of the algorithm has been on short- to 
      medium-term options contracts (7 - 50 days). Through randomized backtests, we are 
      seeing an average return of 11% across all contracts.
      </p>
      <div className="image-container">
    <div className="gradient-border">
      <img 
        className="img_center" 
        src="/images/Fourier_analysis.png" 
        alt="Volatility Window" 
      />
    </div>
  </div>
      <p className="mb-4">
      This is a particularly good example where the program estimated the highest 
      volatility window and bought the contract at 610 and sold it at 1,179 (accounting 
      for spread). Realistically, this is an outlier and in aggregate we were 
      looking at a skewed standard deviation of around 13%.
      </p>
      <p className="mb-10">
      As of October 2025, the program has been deployed on live data and has done particularly well 
      at implied volatility predictions. Stay tuned for more updates!
      </p>
  </div>

  <div id="project2">
  <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        General Machine Learning Engine
      </h2>
      <p className="mb-4">
      My biggest venture into machine learning! All the back propagation 
      logic is handled in Python, with the matrix transforms running in a C file 
      for optimized compute time. This was a big step for my experience in subroutines.
       It is a pretty basic program, but it gets at the 
      core math and logic behind machine learning.
</p>
<div className="image-container">
    <div className="gradient-border">
      <img 
        className="img_center" 
        src="/images/3BodyML.png" 
        alt="3Body Machine Learning" 
      />
    </div>
  </div>
        <p className="mb-10">
        Here, you can see it working to find stable configurations of the Three Body Problem. 
        If you would like to see a smaller version of it in action, check out my <Link className="text-[#75FAF6]" href="/skills#skills_page">skills page</Link>!
        </p>
  </div>

  <div id="project3">
  <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        Cosmic Ray Detection
      </h2>
      <p className="mb-4">
      At the age of 13, I built a cloud chamber for detecting cosmic ray traces. I entered 
      the Bay Area Randall Museum Science Fair, finishing fourth overall. I made a stacked 
      thermoelectric heat pump system to cool a small area to -54ºC. I did all of the CAD, 
      electrical soldering, and electrical system/power design myself. I later refined it, 
      adding a variable electromagnet to alter trace paths.
</p>
<div className="image-container">
    <div className="gradient-border">
      <img 
        className="img_center" 
        src="/images/cloud_chamber.jpg"
        alt="Cloud chamber" 
      />
    </div>
  </div>
        <p className="mb-10">
        Here you can see me testing the prototype on a test bench, which I made out of Legos 
        for its cheap and quick customizability. The full build has since been donated to 
        the Wente Scout Reservation to educate kids on nuclear energy.
        </p>

  </div>
  <div id="project4">
  <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        Ultra Violet Fluorescence Spectroscopy
      </h2>
      <p className="mb-4">
      I am working on the UofT Robotics Space Exploration team to build a suite of optical 
      science tests. The goal is a robust, light, and cost-effective package that can detect
       common chemical signatures of microorganisms. The ultimate goal of this system is to 
       showcase the challenges of detecting life on Mars, using systems with very little 
       power, no repairs, and compact designs.
</p>
<div className="image-container">
    <div className="gradient-border">
      <img 
        className="img_center" 
        src="/images/UVFluorescence.jpg"
        alt="UV Fluorescence Spectroscopy"
      />
    </div>
  </div>
        <p className="mb-10">
        Here you can see us validating out our micro-spectrometer head on a diluted 
        mixture of flavoproteins. Our system will be tested to the limits this August 
        at the University Rover Challenge in Utah.

        </p>

  </div>

</div>
        

    <p className="mb-10">

      </p>
      
        </section>
    );
  }
  