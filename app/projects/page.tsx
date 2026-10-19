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
  <a href="#gary-proj" className="project-nav-item">
      <span>Gary: My Own Virtual Physics Assistant</span>
    </a>
    <a href="#distributed-compute-proj" className="project-nav-item">
      <span>Distributed Compute System</span>
    </a>
  <a href="#uv-spectroscopy-proj" className="project-nav-item">
      <span>UV Fluorescence and Raman Spectroscopy</span>
    </a>
  <a href="#atmospher-proj" className="project-nav-item">
      <span>Atmospheric Simulation in C++</span>
    </a>
    <a href="#stock-analysis-proj" className="project-nav-item">
      <span>Fourier Analysis of Stocks Options</span>
    </a>
    <a href="#q-computing-proj" className="project-nav-item">
      <span>Quantum Computer Programming with Qiskit</span>
    </a>
    <a href="#machine-learning-proj" className="project-nav-item">
      <span>My Own Machine Learning Engine</span>
    </a>
    <a href="#cosmic-ray-proj" className="project-nav-item">
      <span>Cosmic Ray Detection</span>
    </a>
    <a href="#in-the-works" className="project-nav-item">
      <span>In the Works</span>
    </a>
  </div>
  <div id="gary-proj">
  <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
      Gary: My Physics Simulation Assistant
      </h2>
      <p className="mb-4">
      Meet Gary, my lab assistant who works the night shift. Gary is a locally hosted,
      Qwen-based language model that I've trained on my own physics simulations, and his job
      is to run them for me. If a simulation gives an error at 4 AM, he'll decide whether to queue another, or wait until
      I can fix it. He manages the simulation queue, my server compute resources, decides what to run next, and
      reads out the results, so the big parameter sweeps for
      my <Link className="text-[#75FAF6]" href="/research">research</Link> keep going while I sleep or go to class.
      </p>
      <div className="project-image-container wide">
        <div className="project-gradient-border">
          <img
            className="img_center"
            src="/images/gary_simhub.png"
            alt="Simhub dashboard showing Gary's simulation queue and results"
          />
        </div>
      </div>
      <p className="mb-10">
      Here's the dashboard I use to keep an eye on him. Every figure is a simulation Gary has
      queued, run, and plotted (these ones are sweeps for the ytterbium MOT), along with the key
      numbers extracted from the results.
      </p>
  </div>
  <div id="distributed-compute-proj">
  <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
      Distributed Compute System
      </h2>
      <p className="mb-4">
      Gary needs something to run all of those simulations on, so I built him a small distributed
      compute system out of two servers, one with me here in Toronto and one back home in San
      Francisco, all connected over Tailscale.
      </p>
      <p className="mb-10">
      Since my two servers are good at different things, Gary also manages the resources across
      both of them, matching each job to whichever platform suits it best. It's been a great excuse
      to get much deeper into Linux server management, networking, and keeping things running
      across a continent when I'm not around to babysit them.
      </p>
  </div>
   <div id="uv-spectroscopy-proj">
  <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        Ultra Violet Fluorescence and Raman Spectroscopy
      </h2>
      <p className="mb-4">
      I am working on the UofT Robotics Space Exploration team to build a suite of optical 
      science tests that run on top of a rover. The goal is a robust, light, and cost-effective package that can detect
       common chemical signatures of microorganisms using fluorescence signals from 385 nm light.
       </p>
       <p className="mb-4">
        This year's goal is to also build a Raman spectrometer in this same module, using a high-power
        532 nm laser to detect the Raman spectrum of organic molecules, we can distinguish between
        different bio-signatures of life in samples collected on the rover!
</p>
<div className="project-image-container">
    <div className="project-gradient-border">
      <img 
        className="img_center" 
        src="/images/UVFluorescence.jpg"
        alt="UV Fluorescence Spectroscopy"
      />
    </div>
  </div>
        <p className="mb-10">
        Here you can see us testing our spectrometer on the fluorescence of riboflavin.
        We were able to characterize the spectrum of its fluorescence from a sample of dirt,
        earning us one of the highest scores for optical design in the University Rover Challenge.

        </p>
  

  </div>
  <div id="atmospher-proj">
  <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
      Atmospheric Simulation in C++
      </h2>
      <p className="mb-4">
      I wanted to build an atmospheric fluid simulation from the ground up 
      and have it run in real time on my laptop. I made this model more as 
      a proof of concept. I made it easier to use by letting you set starting
       conditions and update data through a Python subroutine, where nearly 
       all of the calculations are handled in C++ for maximum computation 
       speed. I plan to use it as a testbed engine for whatever atmospheric 
       simulations seem interesting.

      </p>
      <p className="mb-4">
      This program was inspired by my Thermodynamics class, 
      which has turned into something much closer to a statistics class. 
      When programming it, I started from the basic definition of 
      microcanonical ensembles and then kept working until what you see now. 
      I don’t code in C++ as often as I used to, so this was the perfect 
      opportunity to develop my skills in writing efficient code. You can 
      see below some of the quick test cases I’ve run with it.

      </p>
  <div className="project-image-container">
    <div className="project-gradient-border">
      <img 
        className="img_center" 
        src="/images/climate_sim.gif" 
        alt="jaden-climate-gif" 
      />
    </div>
  </div>
      <p className="mb-4">
      Here you can see me running it on a cross section of a 640,000 partition 3D grid. Seen here measuring 
      pressure, temperature, chemical potential, density from a 
      hotspot and a cold front. You can even see a fluctuation in pressure
      propogate through the simulation in the GIF. Note 
      that this GIF is playing at real-time speed, achieving around 80,000 
      timesteps per second. (The pixelation in the picture is from the 
      MP4-GIF compression.)
      </p>
      <div className="project-image-container">
        <div className="project-gradient-border">
          <img 
            className="img_center" 
            src="/images/pressure_dif_graph.png" 
            alt="jaden-climate-graph" 
          />
        </div>
      </div>
      <p className="mb-4">
      This is a graph generated by the Python subroutine I have running with 
      the code. This was a quick demo of a hot and cold region meeting, 
      showing the difference in the average pressure in both regions over time. 
      </p>
      <p className="mb-10">
      GitHub repo is available for this project, though it is optimized solely for GNU g++
      to make sure the graphics run smoothly on a separate thread.
      </p>
  </div>
  <div id="stock-analysis-proj">
  <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
      Fourier Analysis of Stock Options Algorithm
      </h2>
      <p className="mb-4">
      Some of my previous research was in quantitative finance. This started as an endeavor 
      to learn more about the stock & options markets, and quickly developed into a larger 
      project with advice from both academics at UofT and industry experts.</p>
      <p className="mb-4">
      The algorithm paired gradient optimization with Fourier signal analysis to predict 
      volatility windows in short- to medium-term options contracts (7 - 50 days). It was 
      a great crash course in time series analysis, and a lot of those signal processing 
      skills have carried over into my physics work.
      </p>
      <div className="project-image-container">
    <div className="project-gradient-border">
      <img 
        className="img_center" 
        src="/images/Fourier_analysis.png" 
        alt="Volatility Window" 
      />
    </div>
  </div>
      <p className="mb-10">
      Here you can see the program estimating the highest-volatility window for one of 
      the contracts it analyzed.
      </p>
  </div>
  <div id="q-computing-proj">
  <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
      Quantum Computing Grover's Algorithm
      </h2>
      <p className="mb-4 text-center">--In the works--</p>
      <p className="mb-4">
      This is a project I’ve been working on independently, running my code on IBM’s 100-qubit quantum computers. 
      Its goal is to implement Grover’s algorithm, which has the potential to search and sort through large databases 
      much faster than current non-quantum computers. This could be game-changing for applications like machine learning 
      and high-performance computational modelling/simulation.
      </p>
      <p className="mb-4">
      This project is still in the works, but I plan to update this page with my progress. It has been a fun experiment 
      of applying my knowledge of quantum mechanics to practical work with the openly available IBM quantum processors.
      </p>
      <div className="project-image-container">
    <div className="project-gradient-border">
      <img 
        className="img_center" 
        src="/images/grovers.png" 
        alt="Grovers" 
      />
    </div>
  </div>
      <p className="mb-4">
      Here you can see the circuit diagram for a basic implementation of Grover’s algorithm, 
      which I am currently working on expanding to take full advantage of the new 100-qubit quantum processors.
      </p>
  </div>

  <div id="machine-learning-proj">
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
<div className="project-image-container">
    <div className="project-gradient-border">
      <img 
        className="img_center" 
        src="/images/3BodyML.png" 
        alt="3Body Machine Learning" 
      />
    </div>
  </div>
        <p className="mb-10">
        Here, you can see it working to find stable configurations of the Three Body Problem. 
        If you would like to see a smaller version of it in action, check out my <Link className="text-[#75FAF6]" href="/research#research_page">research page</Link>!
        </p>
  </div>

  <div id="cosmic-ray-proj">
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
<div className="project-image-container">
    <div className="project-gradient-border">
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
 
  <div id="in-the-works">
  <h1 className="mb-8 text-5xl font-semibold tracking-tighter">
        In The Works!
        </h1>
  <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        Live Atmospheric Model and Weather Simulations
      </h2>
      <p className="mb-10">
      If you really enjoyed my atmospheric simulation engine (see above), 
      you’ll love this. I’ve been working on creating live weather 
      simulations and predictions. It’s a big project, but I am using 
      my simulation engine with data from Open-Meteo and RAP. Stay in 
      tune because I’ll be giving updates on this soon!

</p>
<h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        Qiskit Quantum Shor's Algorithms
      </h2>
      <p className="mb-4">
This project has been more for my own learning purposes and is
 something that I've found genuine interest in. I set out with a 
 goal to write my own implementation of Shor's algorithm using
  Qiskit by deriving it myself analytically (with a lot of help of course). 
      </p>
      <p className="mb-10">
      I’ve always been very interested in cybersecurity. Because of this, 
      I’ve been trying to use this, as well as with Kali tools, to break 
      (MY OWN) simple custom RSA encryption I have written on a Raspberry 
      Pi. It’s been quite finicky (I didn’t quite realize how much I’d 
      have to learn about Hamming error correction), but it’s been fun 
      to actually physically apply some of my quantum computing code.
</p>
<h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        Training my own Large Language Model
      </h2>
      <p className="mb-10">
      This project is still a while away, but I am working to develop my current adaptive 
      machine learning model into a tokenized LLM. Baby steps for now, but I will be posting
      updates here!
</p>
</div>

</div>
        

    <p className="mb-10">

      </p>
      
        </section>
    );
  }
  