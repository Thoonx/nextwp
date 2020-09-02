import Link from 'next/link'
import Card from '../../components/Card'
import Container from '../../components/Container'
import Flex from '../../components/Flex'


const Posts = ({ posts }) => {
	return(
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
		<button onClick={ () => router.push(`/posts?page=${page + 1}`)}>Next</button>
	  </Container>
)
}


  export async function getStaticProps() {

	const res = await fetch('https://antuncrnja.com/w/wp-json/wp/v2/posts?per_page=3&page=1')
	const posts = await res.json()
  
	return {
	  props: {
		posts
	  },
	  revalidate: 30
	}
  }

  export default Posts