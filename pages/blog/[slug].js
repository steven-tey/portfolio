import Layout from '../../components/layout'
import { getAllPostSlugs, getPostData, getAdjacentPostsData } from '../../lib/posts'
import Link from 'next/link'
import Image from 'next/image'
import Date from '../../components/date'
import styles from './text.module.css'
import { getPlaiceholder } from "plaiceholder";

export default function Post({ postData, adjacentPosts }) {

    return (
      <Layout>
        <div className="text-center sm:text-left sm:ml-20 mt-20">
            <Link href="/blog">
            <a className="font-semibold text-purple-700">← Back to all posts</a>
            </Link>
        </div>
        <div className="text-center mt-10 w-11/12 sm:w-7/12 m-auto">
            <h1 className="font-bold text-3xl sm:text-6xl sm:leading-snug my-8 text-gray-800">{postData.title}</h1>
            <p className="text:lg sm:text-2xl text-gray-600 w-10/12 m-auto">{postData.description}</p>
        </div>
        <a href="https://twitter.com/StevenTey"><div className="my-10 mx-auto w-48">
          <div className="relative w-8 h-8 sm:w-16 sm:h-16 rounded-full overflow-hidden inline-block align-middle">
            <Image width={100} height={100} src={'https://pbs.twimg.com/profile_images/1246395641351122944/T-d3aIeE_400x400.jpg'} />
          </div>
          <div className="inline-block text-md sm:text-lg align-middle ml-3">
            by <span className="font-semibold">Steven Tey</span>
          </div>
        </div></a>
        <div className="w-full sm:w-10/12 m-auto mb-20 rounded-2xl overflow-hidden">
          <Image 
            width={2024}
            height={1430}
            placeholder="blur"
            blurDataURL={postData.placeholder.base64}
            src={`/blog/${postData.image}`} 
          />
        </div>

        <div className="grid grid-cols-6 gap-3 w-full sm:w-10/12 m-auto">
            <div className="hidden sm:visible col-span-1 sm:grid justify-self-end h-64 pt-10 sticky top-0">
              <a href={`https://twitter.com/intent/tweet?url=https://steventey.com/blog/${encodeURIComponent(postData.slug)}&text=${encodeURIComponent(postData.title)}`} target='__blank'>
                <div className="flex rounded-full w-12 h-12 my-3 p-1.5 bg-gray-100 hover:bg-gray-200">
                  <img className="w-7/12 m-auto" src="/icons/twitter.png"/>
                </div>
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=https://steventey.com/blog/${encodeURIComponent(postData.slug)}`} target='__blank'>
                <div className="flex rounded-full w-12 h-12 my-3 p-1.5 bg-gray-100 hover:bg-gray-200">
                  <img className="w-7/12 m-auto" src="/icons/facebook.png"/>
                </div>
              </a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?mini=true&url=https://steventey.com/blog/${encodeURIComponent(postData.slug)}&title=${encodeURIComponent(postData.title)}&summary=${encodeURIComponent(postData.description)}&source=steventey.com`} target='__blank'>
                <div className="flex rounded-full w-12 h-12 my-3 p-1.5 bg-gray-100 hover:bg-gray-200">
                  <img className="w-7/12 m-auto"src="/icons/linkedin.png"/>
                </div>
              </a>
              <Link href='/blog'><a>
                <div className="flex rounded-full w-12 h-12 my-3 p-1.5 bg-gray-100 hover:bg-gray-200">
                  <img className="w-7/12 m-auto"src="/icons/leftArrow.png"/>
                </div>
              </a></Link>
            </div>
            <div className="col-span-6 sm:col-span-5">
              <div 
                  className={styles.text}
                  dangerouslySetInnerHTML={{ __html: postData.contentHtml}} 
              />
            </div>
        </div>
        <div className="relative mt-10 sm:mt-20 mb-20">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-white text-sm text-gray-500">Continue Reading</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 mb-20 sm:grid-cols-3">
          {adjacentPosts.map(({ slug, date, title, image, placeholder }, index) => (
              <Link href={`/blog/${slug}`}><a>
                  <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all ease duration-150" key={slug}>
                      <div>
                          <Image 
                            width={2024}
                            height={1430}
                            placeholder="blur"
                            blurDataURL={placeholder.base64}
                            src={`/blog/${image}`} 
                          />
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

const plaiceholder = async (path) => {
  try {
    const base64 = await getPlaiceholder(path)
    return base64
  } catch (err) {
    err;
  }
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.slug)
    const adjacentPostsRaw = await getAdjacentPostsData(params.slug)
    postData.placeholder = await plaiceholder(`/blog/${postData.image}`)
    const adjacentPosts = await Promise.all(
      adjacentPostsRaw.map(async (post) => (
        {... post, placeholder: await plaiceholder(`/blog/${post.image}`)}
      ))
    )

    return {
      props: {
        postData, 
        adjacentPosts
      }
    }
  }
  