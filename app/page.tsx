import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        My Portfolio
      </h1>
      <p className="mb-4">
        {`I am jaden, I study physics at the University of Toronto!!`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
