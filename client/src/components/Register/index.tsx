import React from 'react';
import { useRegisterForm } from '../../utils/customHooks/useRegisterForm';

export const Register = () => {
  const { formInputs, handleSubmit, handleInputChange } = useRegisterForm();
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="name"
          name="name"
          required
          onChange={handleInputChange}
          value={formInputs.name}
        />
      </div>
      <div>
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          required
          onChange={handleInputChange}
          value={formInputs.email}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          required
          onChange={handleInputChange}
          value={formInputs.password}
        />
      </div>
      <button type="submit">Create an Account</button>
    </form>
  );
};
