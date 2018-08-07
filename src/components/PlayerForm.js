import React from 'react';

const PlayerForm = (props) => {

    return(
      <form className='player-form'>
        <input
          className='player-input'
          type='text'
          name='account-field'
          placeholder='Account'
          required />
        <input
          className='player-input'
          type='text'
          name='password-field'
          placeholder='Password'
          required />
        <input
          className='player-input'
          type='submit'
          name='submit'
          value='Login' />
        <input
          className='player-input'
          type='submit'
          name='submit'
          value='Sign in' />
      </form>
   );

};

export default PlayerForm;
