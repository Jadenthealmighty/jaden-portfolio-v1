import Link from 'next/link'

export default function SkillsPage() {
    return (
      
      <section>
        <div id="skills_page">
        <main className="relative z-10 px-12 pt-[40vh] pb-20 max-w-4xl lg:max-w-5xl xl:max-w-6xl">
        </main>
        </div>
        <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
            About This Page
        </h2>
        
          <p className="mb-4">
        This is an unsupervised machine learning model I've written from scratch running directly in your browser. 
        Every bit of matrix operations has been optimized to run in the TypeScript file, 
        being run 100% on your computer. The model only sees where your mouse was 5 seconds ago (if on mobile, the last place you've tapped) 
        and calculates its best prediction (in <span style={{ color: '#75FAF6', marginBottom: '2.5rem' }}>blue</span>) of where your mouse currently is (in white).
          </p>
          <p className="mb-10">
        The background is actually a direct projection of the bias matrix that runs 
        the majority of the program's functionality. Look at how the entries change over time!

        </p>
        
        <h1 className="mb-6 text-5xl font-semibold tracking-tighter">
        Skills
        </h1>
        <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        Computer Programming
      </h2>
    <div id="lang_section">
      <p className="mb-4">
      I have been coding for the majority of my life; as a result, I am proficient in 
      Python and Java programming languages, with Python being my primary language. 
      I have intermediate knowledge of MATLAB, C++, and C. Most recently, I’ve been using a lot of 
      C to optimize my machine learning model and write MCU code for robotics. I am also very 
      familiar with JavaScript and, by extension, TypeScript. Additionally, I have a working 
      knowledge of HTML and CSS. Over the last year, I've worked in a team of 40 other programmers
      which has enriched my skills in clean architecture and Git/Github.</p>

    <p className="mb-10">
      I’ve done work with my own Linux (Ubuntu) server management, and so I’m very 
      familiar with bash, file systems, and Linux maintenance. In terms of operating 
      systems, most of my workflow is in macOS, but a portion of my work is also done on
      a Windows VM with the Microsoft Office 365 applications.
      </p>
    
        <section>
        <h1 className="text-5xl font-bold mb-4">Languages</h1>
        <div className="languages-grid">
      <div className="language-item">
        <img src="/images/python-logo.png" alt="Python" className="language-logo" />
      </div>
      <div className="language-item">
        <img src="/images/java-logo.png" alt="Java" className="language-logo" />
      </div>
      <div className="language-item">
        <img src="/images/typescript-logo.png" alt="TypeScript" className="language-logo" />
      </div>
      <div className="language-item">
        <img src="/images/javascript-logo.png" alt="JavaScript" className="language-logo" />
      </div>
      <div className="language-item">
        <img src="/images/cpp-logo.png" alt="C++" className="language-logo" />
      </div>
      <div className="language-item">
        <img src="/images/c-logo.png" alt="C" className="language-logo" />
      </div>
      <div className="language-item">
        <img src="/images/html-logo.png" alt="HTML" className="language-logo" />
      </div>
      <div className="language-item">
        <img src="/images/css-logo.png" alt="CSS" className="language-logo" />
      </div>
      <div className="language-item">
        <img src="/images/MATLAB-logo.png" alt="Matlab" className="language-logo" />
      </div>
      <div className="language-item">
        <img src="/images/linux-logo.webp" alt="Linux" className="language-logo" />
      </div>
    </div>
    
    <p className="mb-6"></p>
    </section>
    </div>
      <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        Math and Physics
      </h2>
      <p className="mb-10">
      I competed in the USAPhO(USA Physics Olympiad), Putnam Competition, and CAML 
      (California Math League). Earning the rank of top 100 in the USA for USAPho and top 5 
      in California at 14 for CAML. Recently, much of my math 
      has been in Combinatorics, Graph Theory, and Stochastic Calculus.
      </p>
      <h2 className= "mb-8 text-2xl font-bold text-[#75faf6]">
        Quantitative Finance
      </h2>
      <p className="mb-10">
      Much of my most recent work has been in quantitative finance research, 
      applying my knowledge of time series analysis and computer programming in 
      new and creative ways. Through my most recent project, I’ve gained a thorough 
      experience in options volatility and short-term pricing diffusion analysis.
      You can see my work in the <Link className="text-[#75FAF6]" href="/projects#project1">projects page</Link>.
      </p>
      <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        Engineering
      </h2>
      <p className="mb-10">
      I have a working knowledge of CAD, and I regularly use both SolidWorks and Autodesk 
      Fusion. For the last four years, I have been in different robotics teams working on 
      both programming and manufacturing. In 2024, my deployed code was used in the FRC 
      World Championships. Through this, I’ve gained extensive experience soldering, using 
      power tools, and 3D printing.
      </p>
      <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        Presentational Skills
      </h2>
      <p className="mb-4">
      I have strong public speaking skills through competing in parliamentary debate 
      and earning the Eagle Scout rank in Boy Scouts, and I have had plenty of experience 
      in PowerPoint and Google Slides.
      </p>
      <p className="mb-4">
One of my biggest personal hobbies is videography and video editing. I have had upwards 
of 7 years of experience in Premiere Pro and After Effects, and Blender. I currently also 
work as a contract videographer for the UofT newspaper, The Varsity.
      </p> 


        </section>
    );
  }
  