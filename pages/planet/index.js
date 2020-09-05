import Link from 'next/link'
import Head from 'next/head'
import Card from '../../components/Card'
import ContainerFront from '../../components/ContainerFront'
import Flex from '../../components/Flex'


export async function getServerSideProps() {

	const res = await fetch(`../api/json.json`)
	const posts = await res.json()
  
	return {
	  props: {
		posts,
	  }
	  }
  }

  function Blog({ posts }) {
	return (
		
	  <ContainerFront>
      <div>
      
		  <Flex>
					{posts.map((post) => (
						<Card key={post.id}>
						<Link href={ `/planet/${ post.id }` }>
							<a  href={ `/planet/${ post.id }` }>
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