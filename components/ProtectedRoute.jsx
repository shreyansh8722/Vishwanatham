import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from './LoadingSpinner'; 

export function ProtectedRoute({ children, adminOnly }) {
  // Get userRole from the updated hook
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  // 1. Check if Logged In
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check if Admin (Using Role from DB, NOT Email)
  if (adminOnly && userRole !== 'admin') {
    // If user is logged in but NOT an admin, kick them to Home
    return <Navigate to="/" replace />;
  }

  return children;
}