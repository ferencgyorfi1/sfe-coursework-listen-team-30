import React, { useState, useEffect } from 'react';
import { firestore } from './utils/firebase'; // Import Firestore from Firebase SDK

function UserDetails() {
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Fetch user details from Firestore and populate state variables on component mount
    const fetchUserDetails = async () => {
      try {
        const userId = getCurrentUserId(); // Implement this function to get the current user ID
        const userDoc = await firestore.collection('users').doc(userId).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setFirstName(userData.firstName || '');
          setLastName(userData.lastName || '');
          setEmail(userData.email || '');
          setDob(userData.dob || '');
          setAddress(userData.address || '');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleEditDetails = () => {
    setEditing(true);
  };

  const handleSaveDetails = async () => {
    try {
      const userId = getCurrentUserId(); // Implement this function to get the current user ID
      
      await firestore.collection('users').doc(userId).set({
        firstName,
        lastName,
        email,
        dob,
        address,
      });
      setEditing(false);
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  const getCurrentUserId = () => {
    // Implement this function to get the current user ID using Firebase Authentication
    // Example: return firebase.auth().currentUser.uid;
  };

  return (
    <div>
      {editing ? (
        <div>
          <label>
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            Date of Birth:
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          </label>
          <br />
          <label>
            Address:
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>
          <br />
          <button onClick={handleSaveDetails}>Save</button>
        </div>
      ) : (
        <div>
          <p>First Name: {firstName}</p>
          <p>Last Name: {lastName}</p>
          <p>Email: {email}</p>
          <p>Date of Birth: {dob}</p>
          <p>Address: {address}</p>
          <button onClick={handleEditDetails}>Edit Details</button>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
