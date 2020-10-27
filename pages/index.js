import Link from 'next/link'
import Head from 'next/head'
import Card from '../components/Card'
import ContainerFront from '../components/ContainerFront'
import Flex from '../components/Flex'
import { url } from '../pages/api/url'

export async function getStaticProps() {

	const res = await fetch(`https://antuncrnja.com/w/wp-json/wp/v2/posts?_fields=id,slug,title,acf,content,date,featured_media,better_featured_image.media_details.sizes&per_page=4`)
	const posts = await res.json()
  
	return {
	  props: {
		posts,
	  },
	  revalidate: 30
	  }
  }

  function Blog({ posts }) {
	return (
		
	  <ContainerFront>
      <div>
      <h1>HELLO UPDATE</h1>
		  <Flex>
					{posts.map((post) => (
						<Card key={post.id}>
						<Link href={ `/posts/${ post.id }` }>
							<a  href={ `/posts/${ post.id }` }>
								<p>{post.title.rendered}</p>
								<img src={
									post.better_featured_image 
									? post.better_featured_image.media_details.sizes.medium.source_url 
									: 'https://www.ilac.com/wp-content/uploads/2019/06/placeholder-600x400.png'} 
								/>
							</a>
						</Link>
						</Card>
					))}

		</Flex>
    </div>
	  </ContainerFront>
	)
  }

  export default Blog