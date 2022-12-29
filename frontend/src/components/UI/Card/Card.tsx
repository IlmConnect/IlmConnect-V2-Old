import MaterialCard from '@mui/material/Card';

export default function Card(props) {
	const styles = {margin: '2rem auto', ...props.styles};
	return (
		<MaterialCard sx={ styles }>
			{props.children}
		</MaterialCard>
	);
}