import { useRouter } from 'next/router'
import Container from '../../components/Container'
import Image from 'next/image'

const Post = ({post}) => {

	const router = useRouter()

	if (router.isFallback) return <div>loading...</div>
  
	return (
		<Container>
			<h1>{post.title.rendered}</h1>
			<small style={{marginBottom:'25px',display:'block'}}>{post.date.replace('T', ' ')}</small>
			
			<Image src={
				post.better_featured_image 
				? `https://antuncrnja.com/w/wp-content/uploads/${post.better_featured_image.media_details.file}` 
				: 'https://www.ilac.com/wp-content/uploads/2019/06/placeholder-600x400.png'} unsized/>

			<div dangerouslySetInnerHTML={ {__html: post.content.rendered } } />
			<p className="acf">ACF: {post.acf ? post.acf.neki : ''}</p>
			<button onClick={ () => router.back()}>BACK</button>
		</Container>
	)
  }
  
  export async function getStaticPaths() {
	const res = await fetch(`${process.env.URL}/posts?_fields=id`)
	const posts = await res.json()

	const paths = posts.map((post) => ({
	  params: { id: post.id.toString() },
	}))

	return { paths, fallback: true }
  }
  
  export async function getStaticProps({ params }) {

	const res = await fetch(`${process.env.URL}/posts/${params.id}?_fields=id,title,content,acf,featured_media,better_featured_image,date`)
	const post = await res.json()

	return { 
		props: { 
		post,
	 },
	 revalidate: 1
	}
  }
  
  export default Post