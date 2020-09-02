const Card = ({children}) => (
	<>
    <div>{children}</div>

<style jsx>{`
		div{
			flex: 1 1 150px;
			background: white;
			margin: 10px;
			padding: 20px;
			border-radius: 20px;
			box-shadow: rgba(178,177,194,.23) 0 2px 4px 0;
			transition: all .2s ease;
		}
		div:hover{
			box-shadow: rgba(178,177,194,.23) 16px 8px 20px 0;
			transform: scale(1.03);
		}
		
`}</style>
</>
)

export default Card