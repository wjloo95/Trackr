import { useState, ChangeEvent, FormEvent } from 'react';

import { RegisterFormType } from '../../types';
import { register, login } from '../../helpers/auth';
import { useHistory } from 'react-router-dom';

export const useRegisterForm = () => {
  const history = useHistory();

  const [formInputs, setFormInputs] = useState<RegisterFormType>({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create a new account for the user
    const registeredUser = await register(formInputs);

    if (registeredUser.status === 400) {
      throw new Error('Email in Use');
    }

    // Once created, sign that user in
    const loggedInUser = await login({
      email: formInputs.email,
      password: formInputs.password,
    });

    if (loggedInUser) {
      history.push('/');
    } else {
      throw new Error('Trouble creating an account. Please try again later!');
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
