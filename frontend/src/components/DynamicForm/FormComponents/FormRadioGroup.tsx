import styled from '@emotion/styled'
import {
	Radio, RadioGroup,
	Button,
	FormControl, FormControlLabel,
	TextField,
	Typography,
	Divider,
	InputAdornment 
} from '@mui/material'
import { Stack } from '@mui/system'
import { Dispatch, SetStateAction } from 'react'


const TypographyStyling = styled(Typography)`
	margin-left: 10%;
`
const TypographyFieldNameStyling = styled(Typography)`
	margin-left: 10%;
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 50px;
`

const FormControlLabelStyle = styled(FormControlLabel)`
	margin-left: 10%;
`

interface props{
	fieldName : string,
	fieldValues : Array<string>,
	fieldState : object, 
	setFieldState:  Dispatch<SetStateAction<object>>
}

export const FormRadioGroup = ({fieldName, fieldValues, fieldState, setFieldState}: props) => {

	const addFieldValue = () => {
		fieldValues.push('')
		setFieldState({...fieldState})
	}

	return (
		<>
			<Stack spacing={2}>
				<TypographyStyling variant="overline" display="block">Multiple Choice Values</TypographyStyling>
				<FormControl>
					
					<TypographyFieldNameStyling variant="caption" fontSize={25}>{fieldName}</TypographyFieldNameStyling>
					
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue="empty"
						name="radio-buttons-group"
					>

						{fieldValues.length ? fieldValues.map((fields:string, index:number) => 
							fieldValues[index] !== '' ? 
								<FormControlLabelStyle key={index} value={index} control={<Radio />} label={fieldValues[index]} /> 
								: <FormControlLabelStyle key={index} value={index} control={<Radio />} label="Enter a Value" /> 
						) : null}
					</RadioGroup>
				</FormControl>
				{
					fieldValues.length ? <Divider/>: null
				}
				{fieldValues.length ? fieldValues.map((fields:string, index:number) => 
					<TextField 
						key={index} 
						id="outlined-basic" 
						label="Value" 
						variant="outlined" 
						value={fields}
						style={{marginLeft: '10%', marginRight: '10%'}} 
						InputProps={{
							endAdornment: 
							<InputAdornment position="end"><Button variant="contained"  color="error" onClick={() => (fieldValues.splice(index,1), setFieldState({...fieldState})
							)}>X</Button></InputAdornment>
						}}
						onChange={(e) => (fieldValues[index] = e.target.value , setFieldState({...fieldState}))} />
				) : null}
				<ButtonContainer>
					<Button variant="contained" size="small" onClick={addFieldValue}>Add Values</Button>
				</ButtonContainer>
			</Stack>
		</>
	)
}
