// UserInfo.js
import React from 'react';

const UserInfo = ({ userInfo }) => {
  const { lastName, age } = userInfo;

  return (
    <div>
      <p>Last Name: {lastName}</p>
      <p>Age: {age}</p>
    </div>
  );
};

export default UserInfo;
