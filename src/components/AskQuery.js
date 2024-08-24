import axios from 'axios';
import React, { Fragment, useState, useEffect } from 'react';
import { Button, Container, FormGroup } from 'reactstrap';
import { Form, Input } from 'reactstrap';
import base_url from '../api/Coder911Api'; // 

const AskQuery = ({ email, setEmail }) => {
    const [programmingLanguages, setProgrammingLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [queryTitle, setQueryTitle] = useState('');
    const [queryDescription, setQueryDescription] = useState('');
  
    useEffect(() => {
      const timer = setTimeout(() => {
        axios.get(`${base_url.queries_url}/queryLanguageType/fetchProgrammingLanguage`)
          .then(response => {
            setProgrammingLanguages(response.data);
            console.log('Programming Languages:', response.data);
          })
          .catch(error => {
            console.error('Error fetching programming languages:', error);
          });
      }, 1000);
  
      return () => clearTimeout(timer);
    }, []);
  
    const handleLanguageChange = (event) => {
      setSelectedLanguage(event.target.value);
    };
  
    const handleTitleChange = (event) => {
      setQueryTitle(event.target.value);
    };
  
    const handleDescriptionChange = (event) => {
      setQueryDescription(event.target.value);
    };
  
    async function handleSubmit(event) {
      event.preventDefault(); // Prevent form from submitting the default way
      console.log('Email:', email); // Debugging statement
      const queryDTO = {
        email: email, // Include email in the queryDTO
        selectedLanguage: selectedLanguage,
        queryTitle: queryTitle,
        queryDescription: queryDescription
      };
      try {
        const response = await axios.post(`${base_url.queries_url}/queries/createQuery`, queryDTO);
        console.log('Query created:', response.data);
        clearData();
      } catch (error) {
        console.error('Error creating query:', error);
      }
    }
  
    function clearData() {
      setSelectedLanguage('');
      setQueryTitle('');
      setQueryDescription('');
    }
  
    return (
      <Fragment>
        <h1 className='text-center my-3'>Your Query</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="selectedProgrammingLanguage"><p>Programming Language &nbsp;</p></label>
            <select
              id="selectedProgrammingLanguage"
              name="selectedProgrammingLanguage"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="">Select a language</option>
              {programmingLanguages.length > 0 ? (
                programmingLanguages.map((language, index) => (
                  <option key={index} value={language}>
                    {language}
                  </option>
                ))
              ) : (
                <option value="">No programming language available</option>
              )}
            </select>
          </FormGroup>
          <FormGroup>
            <label htmlFor="queryTitle">Query Title</label>
            <Input
              type="text"
              placeholder="Enter title here"
              name="queryTitle"
              id="queryTitle"
              value={queryTitle}
              onChange={handleTitleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="queryDescription">Describe your issue</label>
            <Input
              type="textarea"
              style={{ height: 150 }}
              placeholder="Enter Description here"
              name="queryDescription"
              id="queryDescription"
              value={queryDescription}
              onChange={handleDescriptionChange}
            />
          </FormGroup>
          <Container className='text-center'>
            <Button color='success' type='submit'>Ask Query</Button>
          </Container>
        </Form>
      </Fragment>
    );
  };
  
  export default AskQuery;