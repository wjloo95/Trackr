import { useState, ChangeEvent, FormEvent } from 'react';

import { LoginFormType } from '../../types';
import { login } from '../../helpers/auth';
import { useHistory } from 'react-router-dom';

export const useLoginForm = () => {
  const history = useHistory();

  const [formInputs, setFormInputs] = useState<LoginFormType>({
    email: '',
    password: '',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loggedInUser = await login(formInputs);

    if (loggedInUser) {
      history.push('/');
    } else {
      throw new Error('Trouble logging in. Please try again later!');
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
