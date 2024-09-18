import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseinit';
import { getUser, updateUser as updateUserApi } from '../utils/apiUtils';

const useUser = () => {
    const [user, loading, error] = useAuthState(auth);
    const [userData, setUserData] = useState(null);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        if (user) {
            // If user is logged in, fetch user data
            const fetchUserData = async () => {
                setFetching(true);
                try {
                    const response = await getUser(user.uid);
                    setUserData(response);
                } catch (err) {
                    console.error("Error fetching user data:", err);
                } finally {
                    setFetching(false);
                }
            };

            fetchUserData();
        } else {
            // If no user is logged in, reset userData
            setUserData(null);
        }
    }, [user]);

    // Function to update user data
    const updateUser = async (updatedData) => {
        if (!user) return;

        try {
            const updatedUserData = await updateUserApi(user.uid, updatedData);
            setUserData({ ...userData, ...updatedUserData });
        } catch (err) {
            console.error("Error updating user data:", err);
        }
    };

    return {
        user,
        userData,
        loading,
        error,
        fetching,
        updateUser
    };
};

export default useUser;
