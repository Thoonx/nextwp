const Card = ({children}) => (
	<>
    <div>{children}</div>

<style jsx>{`
		div{
			flex: 1 1 150px;
			background: whitesmoke;
			margin: 10px;
			padding: 20px;
			border-radius: 20px;
		}
		
`}</style>
</>
)

export default Card