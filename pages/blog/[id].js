import useSWR from 'swr'




function Profile( { query }) {
  const { id } = query;
  const { data, error } = useSWR(`https://antuncrnja.com/w/wp-json/wp/v2/posts/${id}`, fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}

export default Profile