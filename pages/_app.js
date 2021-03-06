/*GIT
    git init

    git config --global user.name 'Thoonx'
    git config --global user.email 'ggold.zg@gmail.com'

    sudo git remote add origin https://github.com/Thoonx/test1.git

        sudo git add .
        sudo git commit -m 'update'
        sudo git push -u origin master -f

    git push -u origin master
    git checkout dev
    git pull 
*/

import '../styles/globals.css'
import Nav from '../components/Nav'
import Head from 'next/head'
import 'swiper/swiper-bundle.min.css'

const App = ({ Component, pageProps, router }) => (
  <>
  <Head>
  
  </Head>
      <Nav />
    <Component {...pageProps} key={router.route}/>
  </>
)

export default App
