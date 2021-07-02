import Layout from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Blog({ allPostsData }) {

    return (
      <Layout>
        <div className="my-20 text-center">
            <h1 className="font-bold text-6xl my-8 text-gray-800">Blog</h1>
            <p className="text-2xl text-gray-600">Some of my thoughts and musings</p>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 mb-20 sm:grid-cols-3">
          {allPostsData.map(({ slug, date, title, image }, index) => (
            <Link href={`/blog/${slug}`}><a>
                <div className={classNames(
                    index == 0 ? "col-span-2" : "col-span-1",
                    "rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all ease duration-150"
                    )} key={slug}>
                    <div>
                        <img src={`/blog/${image}`} />
                    </div>
                    <div className="px-8 py-5">
                        <h3 className="font-semibold text-lg">{title}</h3>
                        <p className="text-sm text-gray-600 my-2"><Date dateString={date} /></p>
                    </div>
                </div>
            </a></Link>
          ))}
        </div>
      </Layout>
    )
}
  

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
      props: {
        allPostsData
      }
    }
}