// import fs from 'fs/promises'
// import path from 'path'
import { Layout } from 'nextra-theme-blog'
// import { collectPageMap } from 'nextra/page-map'

export const metadata = {
  // title: 'Next.js',
  // description: 'Generated by Next.js',
}

const pageMap = [
  {
    name: 'index',
    route: '/',
    frontMatter: {
      // sidebarTitle: 'Page',
      type: 'page',
      title: 'About',
      date: new Date(1577836800000).toISOString()
    }
  },
  {
    name: 'posts',
    route: '/posts',
    children: [
      {
        name: 'aaron-swartz-a-programmable-web',
        route: '/posts/aaron-swartz-a-programmable-web',
        frontMatter: {
          // sidebarTitle: 'Page',
          title: 'Notes on A Programmable Web by Aaron Swartz',
          date: '2016/5/21',
          description:
            "At the time when I was getting into web development, I had the chance to read one of the most inspiring book about the web, Aaron Swartz's A Programmable Web. And it completely changed my mind.",
          tag: 'web development',
          author: 'Shu'
        }
      },
      {
        name: 'callout',
        route: '/posts/callout',
        frontMatter: {
          // sidebarTitle: 'Page',
          title: 'Callout',
          date: '2023/5/15',
          description:
            'En example of using the Callout component in your blog.',
          tag: 'web development',
          author: 'Tristan Dubbeld'
        }
      },
      {
        name: 'code-blocks',
        route: '/posts/code-blocks',
        frontMatter: {
          // sidebarTitle: 'Page',
          title: 'Code blocks',
          date: '2022/7/29',
          description: 'En example of using code blocks in your blog.',
          tag: 'web development,JavaScript,GraphQL,C++,Java,React,Next.js,The Guild,MacBook Pro',
          author: 'Dimitri POSTOLOV'
        }
      },
      {
        name: 'draft',
        route: '/posts/draft',
        frontMatter: {
          // sidebarTitle: 'Page',
          title: 'Draft',
          date: '2023/6/28',
          description: 'An example of a draft post.',
          draft: true,
          tag: 'web development',
          author: 'Ada Lovelace'
        }
      },
      {
        name: 'index',
        route: '/posts',
        frontMatter: {
          // sidebarTitle: 'Page',
          type: 'posts',
          title: 'Random Thoughts',
          date: new Date(1578009600000).toISOString()
        }
      },
      {
        name: 'table',
        route: '/posts/table',
        frontMatter: {
          // sidebarTitle: 'Page',
          title: 'Table',
          date: '2022/8/28',
          description: 'En example of using table.',
          tag: 'web development',
          author: 'Dimitri POSTOLOV'
        }
      }
    ]
  },
  {
    name: 'tags',
    route: '/tags',
    children: []
  }
]

export default async function RootLayout({ children }) {
  // const rawJs = await collectPageMap({
  //   dir: path.join(process.cwd(), 'app'),
  //   route: '/'
  // })
  // const pageMapPath = path.join(process.cwd(), 'nextra-page-map.mjs')
  // await fs.writeFile(pageMapPath, rawJs)
  // const { pageMap } = await import('../nextra-page-map.mjs')
  // console.log({ pageMap })
  return (
    <html lang="en">
      <body>
        <Layout
          pageOpts={{ frontMatter: {}, pageMap }}
          themeConfig={{
            darkMode: true
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}