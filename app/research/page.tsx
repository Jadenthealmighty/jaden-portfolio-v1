import Link from 'next/link'

export default function ResearchPage() {
    return (
      <section>
        <div id="research_page">
        <main className="relative z-10 px-12 pt-[55vh] pb-20 max-w-4xl lg:max-w-5xl xl:max-w-6xl">
        </main>
        </div>
        <h2 className="mb-6 text-2xl font-bold text-[#75faf6]">
            About This Page
        </h2>
        <p className="mb-4">
        This is an unsupervised machine learning model I've written from scratch running directly in your browser.
        Every bit of matrix operations has been optimized to run in the TypeScript file,
        being run 100% on your computer. The model only sees where your mouse was 5 seconds ago (if on mobile, the last place you've tapped)
        and calculates its best prediction (in <span className="text-[#75FAF6]">blue</span>) of where your mouse currently is (in white).
        </p>
        <p className="mb-4">
        The background is actually a direct projection of the bias matrix that runs
        the majority of the program's functionality. Look at how the entries change over time!
        </p>
        <p className="mb-10">
        Try moving your mouse in a regular pattern and see how the prediction model adapts.
        </p>

        <h1 className="mb-6 text-5xl font-semibold tracking-tighter">
        Research
        </h1>
        <p className="mb-10">
        These days, most of my time goes into two research projects: laser cooling and trapping
        ytterbium atoms for an optical atomic clock, and building a quantum magnetometer out of
        diamond on a single circuit board. Both have pushed me way outside of what I learned in
        class, and I've had a lot of fun with them. Here's what I've been up to.
        </p>

        <div className="projects-nav">
          <a href="#mot-research" className="project-nav-item">
            <span>Magneto-Optical Trapping of Ytterbium-174</span>
          </a>
          <a href="#oot-research" className="project-nav-item">
            <span>Opto-Optical Trapping with the AC Stark Shift</span>
          </a>
          <a href="#nv-research" className="project-nav-item">
            <span>Single-Board NV Diamond Magnetometer</span>
          </a>
          <a href="#publications" className="project-nav-item">
            <span>Publications &amp; Talks</span>
          </a>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Yb-174 MOT                                                          */}
        {/* ------------------------------------------------------------------ */}
        <div id="mot-research">
        <h2 className="mb-2 text-2xl font-bold text-[#75faf6]">
            Magneto-Optical Trapping of Ytterbium-174
        </h2>
        <p className="mb-6 text-neutral-400">
            Braverman Group, University of Toronto
        </p>
        <p className="mb-4">
        My biggest project right now is in the Braverman group at UofT, where we're building a three-photon optical atomic clock out of neutral
        ytterbium-174. Before you can build a clock out of atoms though, you have to catch them.
        The first stage is a magneto-optical trap (MOT): six beams of 399 nm laser light and a pair
        of magnetic coils that work together to slow down a beam of hot ytterbium atoms coming out of
        an oven and hold them in a tiny cloud at the centre of a vacuum chamber, cooled to under a
        millikelvin.
        </p>
        <p className="mb-4">
        I've worked on a lot of the pieces of this: characterizing the 399 nm cooling laser and
        writing the software that locks its frequency, designing the cooling beam optics, and
        designing and characterizing the MOT coils. Most of my summer (and my ROP thesis) went into
        simulating the whole thing end to end, starting from the vapour pressure in the oven, through
        an 81-channel nozzle, across 344 mm of free flight, and into the trap. Our nozzle channels are
        semicircles on a rectangular base rather than round tubes, which means pretty much none of
        the textbook atom-beam results actually apply to them. So I wrote a 3D Monte Carlo that traces
        atoms through the real geometry, and coupled it to a rate-equation model of the trap built
        on PyLCP.
        </p>
        <div className="figure-pair">
          <div className="project-gradient-border" style={{ flex: 1.286 }}>
            <img
              className="img_center"
              src="/images/yb_spectroscopy.png"
              alt="Spectroscopy of the ytterbium atom beam showing the different isotope lines"
            />
          </div>
          <div className="project-gradient-border" style={{ flex: 1.031 }}>
            <img
              className="img_center"
              src="/images/yb_fluorescence.jpg"
              alt="Violet fluorescence from ytterbium atoms seen through a vacuum chamber viewport"
            />
          </div>
        </div>
        <p className="mb-4">
        On the left is spectroscopy of our atom beam: as we sweep the laser's frequency, each bright
        stripe is a different isotope of ytterbium lighting up (the axis shows the 798 nm laser
        before it gets frequency-doubled to 399 nm). On the right is the real thing: the violet glow
        of ytterbium atoms fluorescing in our 399 nm light, seen through one of the chamber's
        viewports.
        </p>
        <p className="mb-4">
        The best part was checking it against reality. The model matches a MolFlow+ simulation of the
        same nozzle to within 2%, transverse Doppler spectroscopy of our actual atom beam to within
        6%, and the mass of ytterbium we burned through during a controlled oven run to within 11%.
        With the model validated, it predicts the MOT should load about 2.6 × 10<sup>8</sup> atoms
        per second at 425 °C. One fun surprise along the way: the fringe field of our MOT coils ends
        up acting as an accidental Zeeman slower, which is why our slowing beam helps far more than
        we expected it to.
        </p>
        <div className="project-image-container wide">
          <div className="project-gradient-border">
            <img
              className="img_center"
              src="/images/mot_capture_map.png"
              alt="Simulated atom-beam cross-section and MOT capture map at the trap"
            />
          </div>
        </div>
        <p className="mb-10">
        Here you can see the simulated atom beam as it reaches the trap, 344 mm from the nozzle.
        Panel (a) is where the atoms land, (b) is the fraction of them the MOT actually catches at
        each point, and (c) is the product of the two, which is what really sets the load rate.
        Panel (d) is the capture velocity across the beam (roughly the fastest atom the trap can
        still catch at each point), shown for reference.
        </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* OOT                                                                 */}
        {/* ------------------------------------------------------------------ */}
        <div id="oot-research">
        <h2 className="mb-2 text-2xl font-bold text-[#75faf6]">
            Opto-Optical Trapping with the AC Stark Shift
        </h2>
        <p className="mb-6 text-neutral-400">
            Braverman Group, University of Toronto
        </p>
        <p className="mb-4">
        More recently, I've started simulating the group's next trap: an opto-optical trap (OOT).
        The idea is to get rid of the MOT coils entirely. A MOT works because the magnetic field
        gradient shifts the atoms' energy levels by an amount that depends on where they are, so an
        atom that drifts off-centre ends up resonant with the beam that pushes it back. In an OOT,
        a set of detuned "shift beams" at 1077 nm do the same job with light instead, using the AC
        Stark shift. The shift beams move the atoms' energy levels by a position-dependent amount,
        which to the atom looks just like the quadrupole field from a pair of MOT coils, while the
        same cooling beams handle the actual trapping.
        </p>
        <p className="mb-4">
        So why bother? Magnetic fields are cumbersome. Real coils take a long time to turn off,
        and a clock can't make its measurement until the field is gone, since any leftover field
        shifts the very transition you're trying to measure. Shift beams can be switched off with
        an acousto-optic modulator in about 100 ns, which is far faster than even the best coils. It's
        also much more scalable: an array of MOTs would need coils or magnets packed inside the vacuum
        chamber, but an array of OOTs only needs more light, which is a big deal for building
        quantum computers out of neutral atoms. You can read more in our
        group's <a className="text-[#75FAF6]" target="_blank" rel="noopener noreferrer" href="https://meetings-archive.aps.org/damop/2026/b08/10/">DAMOP 2026 abstract</a>.
        </p>
        <p className="mb-4">
        I built this on top of my MOT and atom-beam simulation, swapping out the coil field for the
        effective field of the shift beams (including their Doppler shift, since a moving atom sees
        the shift beams at a slightly different frequency than one sitting still). Right now I'm
        using it to scan the design space: how the shift-beam power, size and detuning change the
        fastest atom the trap can catch, how stiff the trap is, and how deep it is. We're still working
        on it, so stay tuned!
        </p>
        <div className="project-image-container wide">
          <div className="project-gradient-border">
            <img
              className="img_center"
              src="/images/oot_effective_field.png"
              alt="Effective magnetic field of the OOT shift beams"
            />
          </div>
        </div>
        <p className="mb-4">
        This is the effective field of the shift beams at our current design point (2 W, 10 mm
        waist, detuned by 10 linewidths). From left to right: a top-down view of the trap, the
        vertical plane containing the atom beam, and line cuts through the centre. Notice the zero
        at the centre, with the field pointing inward along the horizontal and outward along the
        vertical, exactly the shape you'd get from a pair of anti-Helmholtz MOT coils, but made
        entirely out of light.
        </p>
        <div className="project-image-container wide">
          <div className="project-gradient-border">
            <img
              className="img_center"
              src="/images/oot_design_scan.png"
              alt="OOT shift-beam design scan over power and waist"
            />
          </div>
        </div>
        <p className="mb-10">
        And here's one of the design scans over shift-beam power and waist. The capture velocity (a)
        barely moves across most of the scan, while the stiffness (b) and depth (c) of the trap climb
        quickly with smaller, more powerful beams. Panel (d) compares the full Doppler-shifted model
        against a simpler static-field picture. The two agree once the shift beams are detuned by
        about 10 linewidths or more, which is a nice sanity check at our operating point.
        </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* NV magnetometer                                                     */}
        {/* ------------------------------------------------------------------ */}
        <div id="nv-research">
        <h2 className="mb-2 text-2xl font-bold text-[#75faf6]">
            Single-Board NV Diamond Magnetometer
        </h2>
        <p className="mb-6 text-neutral-400">
            University of Toronto Quantum Computing Club
        </p>
        <p className="mb-4">
        My other research project is with the UofT Quantum Computing Club, where I'm on a team
        building a nitrogen-vacancy (NV) diamond magnetometer. NV centres are tiny defects in a
        diamond's crystal lattice whose spin states you can read out with a laser at room
        temperature. Because they point along four different crystal axes, a single diamond can
        measure both the strength and the direction of a magnetic field. The catch is that most NV
        vector magnetometers today are built from bulky, multi-board, lab-grade equipment.
        </p>
        <p className="mb-4">
        Our goal is to fit the whole thing (laser excitation, microwave generation and delivery,
        the bias magnetic field, photodetection, and control) onto one planar PCB using
        off-the-shelf parts and an open-source design. We used electromagnetic simulations to pick a
        microstrip ring antenna for driving the NV spins, co-designed with its on-board impedance
        matching, and we'll be characterizing the finished board with optically detected magnetic
        resonance (ODMR) and full three-axis field reconstruction. We'll be presenting this at SPIE
        Quantum West this February, with a paper on the way. Coming from atomic physics, this has
        been a crash course in RF design!
        </p>
        <div className="project-image-container">
          <div className="project-gradient-border">
            <img
              className="img_center"
              src="/images/nv_pcb.png"
              alt="NV magnetometer PCB design"
            />
          </div>
        </div>
        <p className="mb-10">
        Here's our current PCB design for the sensor board.
        </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Publications & talks                                                */}
        {/* ------------------------------------------------------------------ */}
        <div id="publications">
        <h2 className="mb-6 text-2xl font-bold text-[#75faf6]">
            Publications &amp; Talks
        </h2>
        <h3 className="mb-4 text-xl font-bold">Upcoming</h3>
        <ul className="mb-8 space-y-5">
          <li>
            <p className="font-semibold">An Embedded Planar Single-Board NV Vector Magnetometer</p>
            <p className="text-neutral-400">SPIE Photonics West, Quantum West · San Francisco · February 2027</p>
            <p className="text-neutral-400">Paper in preparation</p>
          </li>
          <li>
            <p className="font-semibold">Ytterbium-174 magneto-optical and opto-optical trapping</p>
            <p className="text-neutral-400">SPIE Photonics West, Quantum West · San Francisco · February 2027</p>
          </li>
        </ul>
        <h3 className="mb-4 text-xl font-bold">Past</h3>
        <ul className="mb-10 space-y-5">
          <li>
            <p className="font-semibold">Spatially Resolved Simulation of an Ytterbium-174 Magneto-Optical Trap</p>
            <p className="text-neutral-400">TUCAN (Toronto Ultra-Cold Atom Network)</p>
          </li>
          <li>
            <p className="font-semibold">Spatially Resolved Simulation of an Ytterbium-174 Magneto-Optical Trap</p>
            <p className="text-neutral-400">ROP Research Poster Fair · University of Toronto</p>
          </li>
        </ul>
        </div>

        <p className="mb-10">
        Curious about the code side of things? Check out my <Link className="text-[#75FAF6]" href="/projects">projects page</Link>.
        </p>
      </section>
    );
  }
