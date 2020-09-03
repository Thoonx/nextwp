import Link from 'next/link'
import Card from '../../components/Card'
import Container from '../../components/Container'
import Flex from '../../components/Flex'
import { url } from '../api/url'
import { useState } from 'react'



const Posts = ({ posts, allPosts, lastPost }) => {
	let showMore = 2;
	const [load, setLoad] = useState(showMore)

	
	const loader = () => {
		const test = 1
		lastPost = posts[load - test].title.rendered;

		const allA = document.querySelectorAll('.test')
		allA.forEach( x => {
			if(x.querySelector('p').innerText == lastPost){
				x.setAttribute("id", "zadnji");
				console.log(load)
				console.log(lastPost)
			}else{
				x.removeAttribute("id")
			}
			
		})

		setLoad(load + showMore)

	}
   
	return(
	  <Container>
		  <Flex>
				{posts.slice(0,load).map((post) => (
					<Card key={post.id} >
					<Link href={ `/blog/${ post.slug }` }>
						<a href={ `/blog/${ post.slug }`} className="test">
				<p>{post.title.rendered}</p>
							<img src={
								post.better_featured_image 
								? post.better_featured_image.media_details.sizes.medium.source_url 
								: 'https://www.ilac.com/wp-content/uploads/2019/06/placeholder-600x400.png'} />
						</a>
					</Link>
					</Card>
				))}
             
			 
		</Flex>
		<a href="#zadnji"><button onClick={() => setLoad(loader)} className={load >= allPosts ? 'erase' : 'active'}>LOAD MORE</button></a>
	  </Container>
)
}

  export async function getStaticProps() {

	const res = await fetch(`${url}wp-json/wp/v2/posts?_fields=id,slug,title,acf,content,date,featured_media,better_featured_image`)
	const posts = await res.json()

	const allPosts = posts.length;
	
  
	return {
	  props: {
		posts,
		allPosts
	  },
	  revalidate: 30
	}
  }

  export default Posts


  