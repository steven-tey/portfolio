import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the slug
    return {
      slug,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAdjacentPostsData(currentSlug) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the slug
    return {
      slug,
      ...matterResult.data
    }
  })
  allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
  
  const currIdx = allPostsData.findIndex(x => x.slug == currentSlug);
  const numPosts = allPostsData.length
  var filteredIdx = []
  if ( numPosts - currIdx == 1 || numPosts - currIdx == numPosts ) { // first or last post
    filteredIdx =  [Math.abs(currIdx-1), Math.abs(currIdx-2), Math.abs(currIdx-3)]
  } else if ( numPosts - currIdx == 2 ) { // second to last post
    filteredIdx =  [currIdx-2, currIdx-1, currIdx+1]
  } else { // second post or any other post
    filteredIdx =  [currIdx-1, currIdx+1, currIdx+2]
  }
  
  const adjacentPostData = allPostsData.filter((el,i)=>filteredIdx.some(j => i === j))
  
  // Sort posts by date
  return adjacentPostData
}

export function getAllPostSlugs() {
    const fileNames = fs.readdirSync(postsDirectory)
  
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       slug: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       slug: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, '')
        }
      }
    })
  }

  export async function getPostData(slug) {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
  
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()
  
    // Combine the data with the slug and contentHtml
    return {
      slug,
      contentHtml,
      ...matterResult.data
    }
  }