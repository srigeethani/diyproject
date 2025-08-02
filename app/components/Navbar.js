'use client';

import React from "react";
import { useRouter } from 'next/navigation';


export default function Navbar() {
     const router = useRouter();
  return (
    <nav className="navbar">
      <div className="logo">DIY Planner</div>
      <div className="nav-links">
        <button onClick={() => router.push('/')}>Home</button>
  <button onClick={() => router.push('/projects')}>Projects</button>
  <button onClick={() => router.push('/contact')}>Contact</button>
  <button onClick={() => router.push('/login')}>Login</button>
  <button onClick={() => router.push('/signup')}>Signup</button>
      </div>
    </nav>
  );
}
