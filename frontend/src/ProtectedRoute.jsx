import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ role, children }){
  if (role === null) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
;
