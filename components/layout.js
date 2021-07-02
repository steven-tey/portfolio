import Head from 'next/head'
const prism = require("prismjs")
require('prismjs/components/prism-python');
import React,{useEffect} from 'react';

export default function Layout({ children }) {

  useEffect(() => {
    prism.highlightAll();
  }, []);

  const pageTitle = "Steven Tey"
  const logo = "/favicon.ico"
  const description = "My personal portfolio website"

  return (
    <div className="w-10/12 m-auto">
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href={logo} />
        <link rel="shortcut icon" type="image/x-icon" href={logo}/>
        <link rel="apple-touch-icon" sizes="180x180" href={logo}/>
        <meta name="theme-color" content="#7b46f6"/>

        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>

        <meta itemprop="name" content={pageTitle}/>
        <meta itemprop="description" content={description}/>
        <meta itemprop="image" content={logo}/>
        <meta name="description" content={description}/>
        <meta property="og:title" content={pageTitle}/>
        <meta property="og:description" content={description}/>
        <meta property="og:image" content={logo}/>
        <meta property="og:type" content="website"/>

        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="@StevenTey" />
        <meta name="twitter:creator" content="@StevenTey"/>
        <meta name="twitter:title" content={pageTitle}/>
        <meta name="twitter:description" content={description}/>
        <meta name="twitter:image" content={logo}/>
      </Head>
      <main>{children}</main>
    </div>
  )
}