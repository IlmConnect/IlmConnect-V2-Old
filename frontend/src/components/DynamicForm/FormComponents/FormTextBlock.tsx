import React from 'react';
import styled from '@emotion/styled';
import { Stack,Typography } from '@mui/material';

const TypographyStyling = styled(Typography)`
  margin-left: 10%;
`;

export const FormTextBlock = () => {
	return (
		<>
			<Stack spacing={2}>
				<TypographyStyling variant="overline" display="block">TextBlock Values</TypographyStyling>
			</Stack>
		</>
	);
};
