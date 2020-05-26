import React from 'react';
import { useLoginForm } from '../../utils/customHooks/useLoginForm';
import { Link } from 'react-router-dom';

export const Login = () => {
  const { formInputs, handleSubmit, handleInputChange } = useLoginForm();
  return (
    <div className="card-container form-container">
      <h1>Log Into Your Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            onChange={handleInputChange}
            value={formInputs.email}
          />
        </div>
        <div className="form-element">
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={handleInputChange}
            value={formInputs.password}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="form-redirect">
        <span>or </span>
        <Link to="/register">register now</Link>
      </div>
    </div>
  );
};
