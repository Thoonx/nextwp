import Link from 'next/link'
import Card from '../../components/Card'
import Container from '../../components/Container'
import Flex from '../../components/Flex'

export async function getStaticProps() {

	const res = await fetch('https://antuncrnja.com/w/wp-json/wp/v2/posts')
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
		
	  <Container>
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
	  </Container>
	)
  }

  export default Blog