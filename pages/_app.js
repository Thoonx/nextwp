import '../styles/globals.css'
import Nav from '../components/Nav'

const App = ({ Component, pageProps, router }) => (
  <>
      <Nav />
    <Component {...pageProps} key={router.route}/>
  </>
)

export default App
