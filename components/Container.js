const Container = ({children}) => (
	<>
    <div className="">{children}</div>

		<style jsx>{`
				div{
					max-width: 1200px;
					margin: 100px auto;
					background: white;
					padding: 30px;
					border-radius: 20px;
					box-shadow: rgba(178,177,194,.23) 0 2px 4px 0;
				}
				
		`}</style>
</>
)

export default Container 