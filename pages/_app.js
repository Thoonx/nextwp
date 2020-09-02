//GIT
//git init
//sudo git remote add origin https://github.com/Thoonx/test1.git
//git add .
//git commit -m 'test'
//git push -u origin master
//git push -u origin master -f
//git checkout dev
//git pull

import '../styles/globals.css'
import Nav from '../components/Nav'

const App = ({ Component, pageProps, router }) => (
  <>
      <Nav />
    <Component {...pageProps} key={router.route}/>
  </>
)


export default App
