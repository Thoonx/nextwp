import { useState } from 'react'
import { useRouter } from 'next/router'

const Hooks = () => {

	const router = useRouter()
	const [count, setCount] = useState(1)
	

	function decrement() {
		setCount(prev => prev - 1)
		push()
	}

	function increment() {
		setCount(prev => prev + 1)
		push()
	}

	function push(){
		router.push(`?page=${count + 1}`)
	}
	


	return(
		<>
     	 <h1>Hooooooks</h1>
			<button onClick={decrement}>-</button>
				<span>{count}</span>
			<button onClick={increment}>+</button>
	  </>
	)

} 

export default Hooks