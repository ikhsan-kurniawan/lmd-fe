import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const Profile = ({ token }) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.getProfile(token);
        setProfile(response.data);
      } catch (error) {
        alert("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [token]);

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {profile.username}</p>
      <p>Real Name: {profile.real_name}</p>
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phone}</p>
      <Link to="/update-profile">Update Profile</Link>
    </div>
  );
};

export default Profile;
