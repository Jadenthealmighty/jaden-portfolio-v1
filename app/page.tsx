import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Jaden Al-Aidroos
      </h1>
      <p className="mb-4">
        {`Hello, I am a university student based in Toronto and San Francisco. I am currently 
        pursuing a Bachelor's in Science at the University of Toronto specializing in Physics with 
        minors in Computer Science and Mathematics.\n\nI have a strong background in computational modelling
         and a passion for problem solving.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
