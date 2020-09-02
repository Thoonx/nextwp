import Link from 'next/link'
import Head from 'next/head'
import Card from '../components/Card'
import ContainerFront from '../components/ContainerFront'
import Flex from '../components/Flex'

export async function getStaticProps() {

	const res = await fetch('https://antuncrnja.com/w/wp-json/wp/v2/posts?per_page=4')
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
      
		  <Flex>
					{posts.map((post) => (
						<Card key={post.id}>
						<Link href={ `/posts/${ post.id }` }>
							<a  href={ `/posts/${ post.id }` }>
								<p>{post.title.rendered}</p>
								<img src={post.better_featured_image.media_details.sizes.medium.source_url} />
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