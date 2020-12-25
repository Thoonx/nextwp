const Checkbox = (props, {posts, setMyPosts}) => {
	function filterPosts(e){
		if(e.target.checked){
		setMyPosts( posts.filter( post => post.title.toUpperCase().includes(e.target.value.toUpperCase())) )
		}else{
			setMyPosts(posts)
		}
	}
	
	return(
		<label>
			<input type="checkbox" value={props.value} onChange={filterPosts} />Post
		</label>
	)
	
}

export default Checkbox