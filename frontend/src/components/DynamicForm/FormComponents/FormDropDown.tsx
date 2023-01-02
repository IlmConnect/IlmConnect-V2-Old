import React from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';
import {
	FormControl,
	Select,
	MenuItem,
	Stack,
	Divider,
	Typography,
	Button,
	TextField,
	InputAdornment 
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

const TypographyStyling = styled(Typography)`
  margin-left: 10%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const TypographyFieldNameStyling = styled(Typography)`
  margin-left: 10%;
`;


interface props{
	fieldName : string,
	fieldValues : Array<string>,
	fieldState : object, 
	setFieldState:  Dispatch<SetStateAction<object>>
}

export const FormDropDown = ({fieldName, fieldValues, fieldState, setFieldState}:props) => {
	const [selection, setSelection] = useState('');

	const addFieldValue = () => {
		fieldValues.push('');
		setFieldState({...fieldState});
	};

	return (
		<>
			<Stack spacing={2}>
				<TypographyStyling variant="overline" display="block">DropDown Values</TypographyStyling>
				<Divider />
				<FormControl>
					<TypographyFieldNameStyling variant="h6">{fieldName}</TypographyFieldNameStyling>
					<Select
						value={selection}
						onChange={(e) => setSelection(e.target.value)}
						displayEmpty
						inputProps={{ 'aria-label': 'Without label' }}
						style={{marginLeft: '10%', marginRight: '10%'}}
					>

						{fieldValues.length ? fieldValues.map((fields:string, index:number) => 
							fieldValues[index] !== '' ? 
								<MenuItem key = {index} value={fieldValues[index]}>{fieldValues[index]}</MenuItem>
								: null
						) : null}
					</Select>
				</FormControl>
				{
					fieldValues.length ? <Divider/> : null
				}
				{
					fieldValues.length ? 
						fieldValues.map((fields:string, index:number) => 	
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
								onChange={(e) => (fieldValues[index] = e.target.value , setFieldState({...fieldState} ))} 
							/>
	
						) : null
				}
				<ButtonContainer>
					<Button variant="contained" size="small" onClick={addFieldValue}>Add Values</Button>
				</ButtonContainer>
			</Stack>
		</>
	);
};
