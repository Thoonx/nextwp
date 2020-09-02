import { useRouter } from 'next/router'
import Container from '../../components/Container'

const Post = ({post}) => {

	const router = useRouter()
  
	if (router.isFallback) return <div>loading...</div>
  
	return (
		<Container>
			<h1>{post.title.rendered}</h1>
	        <p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p>
			<img src={`https://antuncrnja.com/w/wp-content/uploads/${post.better_featured_image.media_details.file}`} />
			<p>ACF: {post.acf ? post.acf.neki : ''}</p>
			
		</Container>
	)
  }
  
  export async function getStaticPaths() {
	const res = await fetch('https://antuncrnja.com/w/wp-json/wp/v2/posts')
	const posts = await res.json()

	const paths = posts.map((post) => ({
	  params: { id: post.id.toString() },
	}))

	return { paths, fallback: true }
  }
  
  export async function getStaticProps({ params }) {

	const res = await fetch(`https://antuncrnja.com/w/wp-json/wp/v2/posts/${params.id}`)
	const post = await res.json()

	return { 
		props: { 
		post,
	 },
	 revalidate: 1
	}
  }
  
  export default Post