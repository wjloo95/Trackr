import React from 'react';
import { useLoginForm } from '../../utils/customHooks/useLoginForm';
import { Link } from 'react-router-dom';

export const Login = () => {
  const { formInputs, handleSubmit, handleInputChange } = useLoginForm();
  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Log In</button>
      </form>
      <div>
        or <Link to="/register">register now</Link>
      </div>
    </>
  );
};
