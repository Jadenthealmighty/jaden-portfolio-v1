import InteractiveBackground from "app/components/InteractiveBackground";
import Link from 'next/link'

export default function Page() {
  return (
    <>
    <InteractiveBackground />
    <section>
    <div className="image-container">
    <div className="gradient-border">
      <img 
        className="img_center" 
        src="/images/headshotJaden.jpg" 
        alt="Jaden Al-Aidroos" 
      />
    </div>
  </div>
  <p className="mb-4"></p>
      <h1 className="mb-8 text-center text-5xl font-semibold tracking-tighter">
        Jaden Al-Aidroos
      </h1>
      <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        About me
      </h2>
      <p className="mb-4">
      Hello, I am a university student based in Toronto and San Francisco. 
      I am currently pursuing a Bachelor of Science degree at the University of Toronto, 
      specializing in Physics with minors in Computer Science and Mathematics</p>
      <p className="mb-4">
      In 2024, I competed in the US Physics Olympiad (Team USA Physics Competition), 
      placing among the top in the country for a shot at representing the United States 
      internationally. Since then, I’ve spent my time building robots, programming in 10 
      languages, teaching math at high schools around Toronto, doing quantitative finance 
      research, and preparing to represent the University of Toronto in the Putnam Math Competition.</p>
      <p className="mb-10">
      I hope you enjoy this website as much as I enjoyed making it. 
      Go explore the website to see some of the things I’ve been working on!
      </p>
      <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        Quick Facts
      </h2>
      <p className="mb-4">
      <ul className="list-disc list-inside ml-6 space-y-2">
        <li>Top 100 in the United States in <a className="text-[#75FAF6]" href="https://www.aapt.org/physicsteam/2024/upload/2024-USAPhO-Qualifiers_v3.pdf">USAPhO Qualification Exam</a></li>
        <li>Grew up coding, proficient in Python, Java, C++ and <Link className="text-[#75FAF6]" href="/skills#lang_section">7 other languages</Link></li>
        <li>Actively doing <Link className="text-[#75FAF6]" href="/projects#project1">research in Quantitative Finance</Link></li>
        <li>Currently working on a <Link className="text-[#75FAF6]" href="/projects#project2">General Machine Learning Engine</Link></li>
      </ul>
      </p>

      <p className="mb-10"></p>
      <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        Background in Simulation
      </h2>
      <h2 className= "mb-3 text-xl font-bold">
        This Website
      </h2>
      <p className="mb-4">
      My favourite passion projects have been physics and real-time simulations. 
      As you will see throughout this site, every page has a different interactive
       program running in the background that I've coded from scratch. I encourage you to play around with them 
       and see what interesting patterns you can achieve.
      </p>
      <h2 className= "mb-3 text-xl font-bold">
        This Page
      </h2>
        <p className="mb-4">
        Move the mouse around and see how the particle behaves (if you are on mobile, 
        tap to move the center of mass). The background of this page is my own physics simulation 
        running fully in your browser; it is calculating the physical effects of gravitational 
        wave propagation on orbiting bodies. The mathematical model even behaves according 
        to special and general relativity, accounting for space-time warping and relativistic 
        effects near the speed of light.
      </p>
      <p className="mb-10">
      Try getting the white ball to orbit your mouse cursor.
      </p>
      <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        Personal Interests
      </h2>
      <p className="mb-4">
      I play on the University of Toronto Physics Student Union hockey team. Though I was 
      born in Montreal, I grew up for the most part in California, so relearning how to 
      play hockey has been a fun challenge over the last year.

      </p>
    
      <p className="mb-10">
      I’ve been playing guitar since I was 7, and it’s my favourite way to unwind. 
      You can check out my music on my <a className="text-[#75FAF6]" href="https://www.instagram.com/jaden_hates_tenor_clef/">music Instagram account</a>.
      </p>
      <h2 className= "mb-6 text-2xl font-bold text-[#75faf6]">
        Contact
      </h2>
      <p className="mb-4">
        Email: <a className="text-[#75FAF6]" href="mailto:jaden.r.alaidroos@gmail.com" >jaden.r.alaidroos@gmail.com</a></p>
        <p className="mb-4">
        LinkedIn: <a className="text-[#75FAF6]" href="https://www.linkedin.com/in/jaden-al-aidroos-5b7727240" >Jaden@LinkedIn</a></p>
      <p></p>
    </section>
    </>
  )
}
// New line doesn't seem to work