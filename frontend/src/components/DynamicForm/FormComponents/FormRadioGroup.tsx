import styled from '@emotion/styled';
import {
	Radio, RadioGroup,
	Button,
	FormControl, FormLabel, FormControlLabel,
	TextField,
	Typography,
	Divider
} from '@mui/material';
import { Stack } from '@mui/system';

const TypographyStyling = styled(Typography)`
  margin-left: 10%;
`;
const TypographyFieldNameStyling = styled(Typography)`
  margin-left: 10%;
`;
const FormControlStyling = styled(FormControl)`
  margin-left: 10%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const FormControlLabelStyle = styled(FormControlLabel)`
  margin-left: 10%;
`;

export const FormRadioGroup = ({fieldName, fieldValues, fieldState, setFieldState}:any) => {


	const addFieldValue = () => {
		//push the values into fieldValues, render the boxing to enter it
		fieldValues.push('');
		setFieldState({...fieldState});
	};

	return (
		<>
			<Stack spacing={2}>
				<TypographyStyling variant="overline" display="block">Multiple Choice Values</TypographyStyling>
				<Divider />
      
				<FormControl>
					<FormLabel id="demo-radio-buttons-group-label">
						<TypographyFieldNameStyling variant="h5">{fieldName}</TypographyFieldNameStyling>
					</FormLabel>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue="empty"
						name="radio-buttons-group"
					>

						{fieldValues.length ? fieldValues.map((fields:string, index:number) => 
							fieldValues[index] !== '' ? 
								<FormControlLabelStyle key={index} value={fieldValues[index]} control={<Radio />} label={fieldValues[index]} /> 
								: <FormControlLabelStyle key={index} value="Enter a Value" control={<Radio />} label="Enter a Value" /> 
						) : null}
					</RadioGroup>
				</FormControl>
				{
					fieldValues.length ? <Divider/> : null
				}
				{fieldValues.length ? fieldValues.map((fields:string, index:number) => 
					<TextField key={index} id="outlined-basic" label="Value" variant="outlined"  onChange={(e) => (fieldValues[index] = e.target.value , setFieldState({...fieldState}))} />
				) : null}
				<ButtonContainer>
					<Button variant="contained" size="small" onClick={addFieldValue}>Add Values</Button>
				</ButtonContainer>
			</Stack>
		</>
	);
};
