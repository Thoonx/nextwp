const ContainerFront = ({children}) => (
	<>
    <div className="">{children}</div>

		<style jsx>{`
				div{
					max-width: 1200px;
					margin: 0 auto;
					min-height: 100vh;
					display: flex;
					align-items: center;
				}
				
		`}</style>
</>
)

export default ContainerFront