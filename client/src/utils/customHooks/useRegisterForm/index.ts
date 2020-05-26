import { useState, ChangeEvent, FormEvent } from 'react';

import { RegisterFormType } from '../../types';
import { register, login } from '../../helpers/auth';
import { useHistory } from 'react-router-dom';
import { displayError, displaySuccess } from '../../helpers/alert';

export const useRegisterForm = () => {
  const history = useHistory();

  const [formInputs, setFormInputs] = useState<RegisterFormType>({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      // Create a new account for the user
      const registeredUser = await register(formInputs);

      // Once created, sign that user in
      const loggedInUser = await login({
        email: formInputs.email,
        password: formInputs.password,
      });

      if (loggedInUser) {
        displaySuccess(`Account Successfully Created!`);
        history.push('/');
      } else {
        throw new Error('Error creating user');
      }
    } catch (error) {
      displayError(
        'There was an error creating this account. Please try again later.'
      );
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }));
  };

  return { formInputs, handleSubmit, handleInputChange };
};
