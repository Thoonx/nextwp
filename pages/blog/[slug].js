import { useRouter } from 'next/router'
import Container from '../../components/Container'

const Post = ({post}) => {

	const router = useRouter()
  
	if (router.isFallback) return <div>loading...</div>
  
	return (
		<Container>
			<h1>{post[0].title.rendered}</h1>
			<small style={{marginBottom:'25px',display:'block'}}>{post[0].date.replace('T', ' ')}</small>
			
			<img src={
				post[0].better_featured_image 
				? `https://antuncrnja.com/w/wp-content/uploads/${post[0].better_featured_image.media_details.file}` 
				: 'https://www.ilac.com/wp-content/uploads/2019/06/placeholder-600x400.png'} />

			<div dangerouslySetInnerHTML={ {__html: post[0].content.rendered } } />
			<p className="acf">ACF: {post[0].acf ? post[0].acf.neki : ''}</p>
			
		</Container>
	)
  }
  
  export async function getStaticPaths() {
	const res = await fetch('https://antuncrnja.com/w/wp-json/wp/v2/posts?_fields=slug,id')
	const posts = await res.json()

	const paths = posts.map((post) => ({
	  params: { slug: post.slug },
	}))

	return { paths, fallback: true }
  }
  
  export async function getStaticProps({ params }) {

	const res = await fetch(`https://antuncrnja.com/w/wp-json/wp/v2/posts?slug=${params.slug}&?_fields=id,title,slug,content,acf,featured_media,better_featured_image,date`)
	const post = await res.json()

	return { 
		props: { 
		post,
	 }
	}
  }
  
  export default Post