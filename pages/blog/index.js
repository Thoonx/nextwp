import Link from 'next/link'
import Card from '../../components/Card'
import Container from '../../components/Container'
import Flex from '../../components/Flex'
import { url } from '../api/url'


const Posts = ({ posts }) => {
	return(
	  <Container>
		  <Flex>
				{posts.map((post) => (
					<Card key={post.id}>
					<Link href={ `/blog/${ post.slug }` }>
						<a  href={ `/blog/${ post.slug }` }>
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
	  </Container>
)
}

  export async function getStaticProps() {

	const res = await fetch(`${url}wp-json/wp/v2/posts?_fields=id,slug,title,acf,content,date,featured_media,better_featured_image`)
	const posts = await res.json()
  
	return {
	  props: {
		posts
	  },
	  revalidate: 30
	}
  }

  export default Posts


  