import Head from 'next/head'
import Link from 'next/link'


const Home = () => (

    <div>
      <Head>
        <title>Next WP</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href={ `/posts/` }><a>Posts button</a></Link>
    </div>
  )

  export default Home
