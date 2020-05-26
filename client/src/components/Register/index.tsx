import React from 'react';
import { useRegisterForm } from '../../utils/customHooks/useRegisterForm';

import { Link } from 'react-router-dom';

export const Register = () => {
  const { formInputs, handleSubmit, handleInputChange } = useRegisterForm();
  return (
    <div className="card-container form-container">
      <h1>Create An Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <label>Name</label>
          <input
            type="name"
            name="name"
            required
            onChange={handleInputChange}
            value={formInputs.name}
          />
        </div>
        <div className="form-element">
          <label>Email Address</label>
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
        <button type="submit">Register</button>
      </form>
      <div className="form-redirect">
        <span>or </span>
        <Link to="/login">login now</Link>
      </div>
    </div>
  );
};
