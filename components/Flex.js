const Container = ({children}) => (
	<>
	<div>{children}</div>

	<style jsx>{`
			div{
				display: flex;
				flex-wrap: wrap;
			}
			
	`}</style>
</>
)

export default Container 