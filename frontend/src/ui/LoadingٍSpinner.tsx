import { CircularProgress } from "@mui/material"


interface Props {
	loading: boolean
	children: React.ReactNode | React.ReactNode[]
}

const LoadingSpinner: React.FC<Props> = ({
	loading,
	children
}) => {
	return loading?
		<CircularProgress 
			color="inherit"
			size={24}
		/>:
		<>
			{children}
		</>
}
export default LoadingSpinner
