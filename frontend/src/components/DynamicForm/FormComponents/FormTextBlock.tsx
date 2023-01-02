import React from 'react';
import styled from '@emotion/styled';
import { Stack,Typography, TextField, Divider} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

const TypographyStyling = styled(Typography)`
  margin-left: 10%;
`;
const TypographyFieldNameStyling = styled(Typography)`
  padding-left: 10%;
`;

const TextFieldContainer = styled.div`
	padding-left: 10%;
	padding-right: 10%;
	padding-bottom: 2%;
`;
const TextFieldstyling = styled(TextField)`
	width: 100%;
`;

interface props{
	fieldName : string,
	fieldValues : Array<string>,
	fieldState : object, 
	setFieldState:  Dispatch<SetStateAction<object>>
}

export const FormTextBlock = ({fieldName, fieldValues, fieldState, setFieldState}:props) => {
	return (
		<>
			<Stack spacing={2}>
				<TypographyStyling variant="overline" display="block">TextBlock Values</TypographyStyling>
				<Divider />
				<TypographyFieldNameStyling variant="h6" >{fieldName}</TypographyFieldNameStyling>
				<TextFieldContainer>
					<TextFieldstyling
						id="outlined-multiline-static"
						multiline
						minRows={4}
						value={fieldValues}
						placeholder="Enter a Value..."
						onChange={
							e => (fieldValues[0] = e.target.value, setFieldState({...fieldState}))
						}
					/>
				</TextFieldContainer>

			</Stack>	
		</>
	);
};
