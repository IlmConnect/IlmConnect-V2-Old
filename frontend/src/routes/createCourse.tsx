import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

//npm install @mui/material @mui/styled-engine-sc styled-components
//npm i -D @types/styled-components 

const Container = styled.div`
  width: 800px;
  display: flex;
`;

const CreateCourse = () => {
	const [courseName, setCourseName] = useState<string>('');
	const [courseDescription, setCourseDescription] = useState<string>('');

	const submitCourseDetails = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		//TODO
		//send course name and details to backend to create course
		try{
			//make post request with course name, course description, user information
		}
		catch{

		}
    
		console.log(courseName, courseDescription);
    
	};

	return (
		<>
			<Container>
				<form onSubmit={submitCourseDetails}> 
					<label style={{}}>Course Name: </label>
					<input style={{width: '100%', marginTop: '5px', padding: '10px', marginBottom: '5px'}}  type="text" name="name" placeholder='course name...' required onChange={e=> setCourseName(e.target.value)}/>

					<label style={{}}>Description</label>
					<textarea style={{width: '100%', marginTop: '5px', padding: '10px', marginBottom: '5px', resize: 'none', height: '150px'}} placeholder='course Description...' onChange={e=> setCourseDescription(e.target.value)} />

					<input type="submit" value="Submit"  />
				</form>
			</Container>
		</>
	);
};

export default CreateCourse;