import React from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';
import {
	TextField,
	Button,
	MenuItem,
	Stack,
	FormControl,
	Box,
	Divider,
	Card,
	Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { createElement } from 'react';
import { FormRadioGroup} from './FormComponents/FormRadioGroup';
import { FormTextBlock } from './FormComponents/FormTextBlock';
import {FormDropDown} from './FormComponents/FormDropDown';
import { FormQuestionnaire } from './FormComponents/FormQuestionnaire';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #c9def0;
  position: absolute;
  display: flex;
  justify-content: center;
  overflow: auto;
`;

const Wrapper = styled.div`
  width: 85%;
  background-color: whitesmoke;
  position: relative;
  overflow: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const FormSubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const FormContainter = styled(Card)`
  margin-top: 30px;
  min-height: 250px;
  height: auto;
  justify-content: center;
`;

const FieldNameStyle = styled(TextField)`
  width: 80%;
  margin-left: 10%;
`;

const FormTitleStyle = styled(TextField)`
  width: 80%;
  margin-top: 100px;
  margin-left: 10%;
  margin-bottom: 5px;
`;

const FormDescriptionStyle = styled(TextField)`
  width: 80%;
  margin-left: 10%;
`;

const FieldsButtonContainer = styled.div`
  height: 10%;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const FormButtonStyle = styled(Button)`
  margin-right: 5px;
`;

const DividerStyle = styled(Divider)`
  margin-top: 10px;
`;


const fieldTypeHelper:any = {
	'Multiple Choice': FormRadioGroup,
	Textblock : FormTextBlock,
	Dropdown : FormDropDown,
	Questionnaire : FormQuestionnaire,
};
const formChoices = ['Multiple Choice', 'Textblock', 'Dropdown', 'Questionnaire'];


const DynamicForm = () => {
	const [fieldState, setFieldState] = useState({
		formTitle: '',
		formDescription: '',
		currentId: 1,
		fields: [
			{
				fieldId: 0,
				fieldType: '',
				fieldName: '',
				fieldValues: [],
				required: false,
				sensitive: false,
				toggleHide: false,
			},
		],
	});

	const handleSetTitle = (e: string) => {
		setFieldState({
			formTitle: e,
			formDescription: fieldState.formDescription,
			currentId: fieldState.currentId,
			fields: [...fieldState.fields]
		});
	};
	const handleSetDescription = (e: string) => {
		setFieldState({
			formTitle: fieldState.formTitle,
			formDescription: e,
			currentId: fieldState.currentId,
			fields: [...fieldState.fields]
		});
	};

	const handleSubmitForm = () => {
		//TODO submit form to backend
		console.log();
	};

	const handleAddField = () => {
		console.log(fieldState);
		setFieldState({
			...fieldState,	
			currentId: fieldState.currentId + 1,
			fields: [
				...fieldState.fields,
				{
					fieldId: fieldState.currentId,
					fieldType: '',
					fieldName: '',
					fieldValues: [],
					required: false,
					sensitive: false,
					toggleHide: false,
				},
			],
		});
	};

	const renderFieldComponent = (field:{fieldName : string, fieldId : number, fieldType: string, fieldValues: Array<string>, toggleHide: boolean}) => {
		if(typeof fieldTypeHelper[field.fieldType] !== 'undefined'){
			return createElement(
				fieldTypeHelper[field.fieldType],
				{
					fieldName: field.fieldName,
					fieldValues: field.fieldValues,
					toggleHide : field.toggleHide,
					fieldState: fieldState,
					setFieldState: setFieldState
				}
			);
		}

	};


	const formTypeList = formChoices.map((choice, index) => (
		<MenuItem key={index} value={choice}>
			{choice}
		</MenuItem>
	));

	return (
		<>
			<Container>
				<Wrapper>
					<FormTitleStyle
						onChange={(e) => handleSetTitle(e.target.value)}
						label="Add a Title to your Form"
						variant="outlined"
						required
					/>
					<FormDescriptionStyle
						onChange={(e) => handleSetDescription(e.target.value)}
						label="Add a Description to your Form..."
						variant="filled"
						multiline
						rows={3}
					/>					
					<FormSubmitButtonContainer>
						<Button variant="contained" color="success" onClick={handleSubmitForm}>Submit Form</Button>
					</FormSubmitButtonContainer>
					<DividerStyle variant="middle" />
					<Stack spacing={3}>
						{fieldState.fields.map((fields, index) =>
							fields.fieldId > 0 ? (
								<FormContainter key={index}>
									<Box style={{ width: '100%' }}>
										<FieldsButtonContainer>
											{
												!(fields.toggleHide) ? 											
													<FormButtonStyle variant="contained" color="inherit" onClick={() => (fields.toggleHide = !(fields.toggleHide), setFieldState({...fieldState})) }>Hide</FormButtonStyle>
													: <FormButtonStyle variant="contained" color="inherit" onClick={() => (fields.toggleHide = !(fields.toggleHide), setFieldState({...fieldState})) }>UnHide</FormButtonStyle>
											}
		
											<Button variant="contained" color="error" size="small" onClick={() => (fieldState.fields.splice(index,1), setFieldState({...fieldState}))}>
												Delete
											</Button>
										</FieldsButtonContainer>
										<Stack spacing={2}>
											<FieldNameStyle
												onChange={(e) => {
													fields.fieldName = e.target.value;
													setFieldState({...fieldState,
														fields: [...fieldState.fields],
													});
												}}
												label="Field Name"
												variant="outlined"
												required
												value={fields.fieldName}
											/>
											<FormControl style={{ marginLeft: '10%', width: '80%' }}>
												<InputLabel id="form-control-choices">Type</InputLabel>
												<Select
													labelId="form-select-label"
													id="form-select"
													value={fields.fieldType}
													label="Form"
													onChange={(e) => {
														fields.fieldType = e.target.value;
														fields.fieldValues.length ? fields.fieldValues = [] : null,
														setFieldState({...fieldState,
															fields: [...fieldState.fields],
														});
													}}
												>
													{formTypeList}
												</Select>
											</FormControl>
											{
												!(fields.toggleHide) ? renderFieldComponent(fields) : null
											}
										</Stack>
									</Box>
								</FormContainter>
							) : null
						)}
					</Stack>

					<ButtonContainer>
						<Button
							variant="outlined"
							startIcon={<AddIcon />}
							type="submit"
							size="large"
							onClick={handleAddField}
						>
							Add Field
						</Button>
					</ButtonContainer>
				</Wrapper>
			</Container>
		</>
	);
};

export default DynamicForm;
