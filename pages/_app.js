/*GIT
    git init
    sudo git remote add origin https://github.com/Thoonx/test1.git

        git add .
        git commit -m 'update'
        git push -u origin master -f

    git push -u origin master
    git checkout dev
    git pull 
*/

import '../styles/globals.css'
import Nav from '../components/Nav'
import Head from 'next/head'

const App = ({ Component, pageProps, router }) => (
  <>
  <Head>
  
  </Head>
      <Nav />
    <Component {...pageProps} key={router.route}/>
  </>
)

export default App
