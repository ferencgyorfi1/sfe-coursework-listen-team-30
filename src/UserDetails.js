import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';

function UserDetails() {
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetchUserDetails();
  }, []); // Fetch user details on component mount
  
  const firestore = getFirestore(); // Get Firestore instance
  
  const fetchUserDetails = async () => {
    try {
      const userId = getCurrentUserId();
      if (userId) {
        const userRef = doc(collection(firestore, 'users'), userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFirstName(userData.firstName || '');
          setLastName(userData.lastName || '');
          setEmail(userData.email || '');
          setDob(userData.dob || '');
          setAddress(userData.address || '');
        }
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleEditDetails = () => {
    setEditing(true);
  };

  const handleSaveDetails = async () => {
    try {
      const userId = getCurrentUserId(); // Implement this function to get the current user ID
      if (userId) {
        const userRef = doc(collection(firestore, 'users'), userId);
        await setDoc(userRef, {
          firstName,
          lastName,
          email,
          dob,
          address,
          updatedAt: serverTimestamp(), // Add a timestamp for last update
        });
        setEditing(false);
      }
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  const getCurrentUserId = () => {
    const auth = getAuth();
    if (auth.currentUser) {
      return auth.currentUser.uid;
    } else {
      // Handle the case when the current user is not authenticated
      return null;
    }
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
