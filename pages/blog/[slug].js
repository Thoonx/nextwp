import { useRouter } from 'next/router'
import Container from '../../components/Container'
import Image from 'next/image'

const Post = ({post}) => {

	const router = useRouter()
	if (router.isFallback) return <div>loading...</div>
  
	return (
		<Container>
			<h1>{post.title}</h1>
			<small style={{marginBottom:'25px',display:'block'}}>{post.date.replace('T', ' ')}</small>
			<img src={post.featured_image.new_image_size} /> 
			<div dangerouslySetInnerHTML={ {__html: post.content } } />
			<p className="acf">ACF: {post.acf ? post.acf : ''}</p>
			<button style={{background: '#ff4c4c'}} onClick={ () => router.back()}>BACK</button>
		</Container>
	)
  }
  
  export async function getStaticPaths() {
	const res = await fetch(`https://antuncrnja.com/w/wp-json/ac/v1/posts/`)
	const posts = await res.json();

	const paths = posts.map((post) => ({
	  params: { slug: post.slug },
	}))

	return { paths, fallback: true }
  }
  
  export async function getStaticProps({ params }) {

	const res = await fetch(`https://antuncrnja.com/w/wp-json/ac/v1/posts/${params.slug}`)
	const post = await res.json()

	return { 
		props: { 
		post,
	 },
	 revalidate: 1
	}
  }
  
  export default Post