import styled from "@emotion/styled";
import {
  Radio, RadioGroup,
  Button,
  FormControl, FormLabel, FormControlLabel,
  Box,
  Typography,
  Divider
} from "@mui/material";

const TypographyStyling = styled(Typography)`
  padding-left: 10%;
`
const FormControlStyling = styled(FormControl)`
  padding-left: 10%;
`

const AddValueButtonStyling = styled(Button)`
  justify-content: center;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const FormRadioGroup = ({fieldId, fieldName, fieldValues}:any) => {


  const addFieldValue = () => {
    //push the values into fieldValues, render the boxing to enter it
    fieldValues.push("1");
  }

  return (
    <>
    <Box>
      <TypographyStyling variant="overline" display="block">Multiple Choice Values</TypographyStyling>
      <Divider />
      
      <FormControlStyling>
        <FormLabel id="demo-radio-buttons-group-label">{fieldName}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
        </RadioGroup>
      </FormControlStyling>
      <Divider />
      {/*map through array counting values
        <FormControlLabel value="female" control={<Radio />} label="Female" />*/}
      <ButtonContainer>
        <Button variant="contained" size="small" onClick={addFieldValue}>Add Values</Button>
      </ButtonContainer>
    </Box>
    </>
  );
};
