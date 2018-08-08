import React from 'react';
import Player from '../models/Player.js';

const PlayerForm = (props) => {

  const handleClick = (event) => {
    event.preventDefault();
    switch(event.target.checkIn.value) {
      case 'login':
        props.logIn(new Player(event.target));
        break;
      case 'signin':
        props.signIn(new Player(event.target));
        break;
      default:
        console.log('Default case');
    };
  };

    return(
      <form className='player-form' onSubmit={handleClick}>
        <input
          className='player-input'
          type='text'
          name='accountName'
          placeholder='Account'
          required
        />
        <input
          className='player-input'
          type='password'
          name='accountPassword'
          placeholder='Password'
          required
        />
        <div className='login-input'>
          <label className='player-input'>Log In</label>
          <input
            className='player-input'
            type='radio'
            name='checkIn'
            value='login'
            defaultChecked
          />
          <label className='player-input'>Sign In</label>
          <input
            className='player-input'
            type='radio'
            name='checkIn'
            value='signin'
          />
          <input
            className='player-input'
            type='submit'
            name='submit'
            value='Submit'
          />
        </div>
      </form>
    );

};

export default PlayerForm;
