import { useState, ChangeEvent, FormEvent } from 'react';

import { LoginFormType } from '../../types';
import { login } from '../../helpers/auth';
import { useHistory } from 'react-router-dom';
import { displayError, displaySuccess } from '../../helpers/alert';

export const useLoginForm = () => {
  const history = useHistory();

  const [formInputs, setFormInputs] = useState<LoginFormType>({
    email: '',
    password: '',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const loggedInUser = await login(formInputs);

      if (loggedInUser === 'invalid') {
        throw new Error('invalid');
      }

      if (loggedInUser) {
        displaySuccess('Logged in Successfully!');
        history.push('/');
      } else {
        throw new Error('Trouble logging in');
      }
    } catch (error) {
      if (error.message === 'invalid') {
        displayError('Please try a different email or password.');
      } else {
        displayError(
          'There was an error logging into this account. Please try again later.'
        );
      }
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
