// UserProfile.js
import React from 'react';
import { useUserContext } from '../../context/UserContext.js';
import UserFirstName from './UserProfile/UserFirstName';
import UserInfo from './UserProfile/UserInfo';
import UserKeyData from './UserProfile/UserKeyData';

const UserProfile = () => {
  // Utilisez le crochet personnalisé pour accéder aux données utilisateur
  const userData = useUserContext();

  // Exécutez le console.log en dehors du rendu JSX
  console.log('ça passe');

  return (
    <div>
      <h2>User Profile</h2>
      
      {/* Vérifiez si les données utilisateur existent avant de les afficher */}
      {userData && userData.userInfos && (
        <div>

          <UserFirstName firstName={userData.userInfos.firstName} />
          <UserInfo userInfo={userData.userInfos} />
          <UserKeyData keyData={userData.keyData} />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
