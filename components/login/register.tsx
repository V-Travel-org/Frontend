'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, fullName, contactInfo }),
      });

      if (response.status === 201) {
        router.push('/login');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create your Account</CardTitle>
        <CardDescription>Enter your details to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder='••••••••'
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Lokesh V"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactInfo">Phone Number</Label>
            <Input
              id="contactInfo"
              placeholder="9123456789"
              required
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </div>
          <Button className="w-full" type="submit">
            Sign Up
          </Button>
          <div className="flex flex-col items-center justify-center mt-7">
          <div className="flex items-center w-full">
            <hr className="border-gray-500 flex-1" />
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <hr className="border-gray-500 flex-1" />
          </div>
          
          <Button className="w-full mt-2 flex items-center justify-center bg-white border text-black border-gray-300 hover:bg-gray-100 hover:scale-105 duration-300" type="button" onClick={() => {
            // Google OAuth logic here
            console.log('Sign up with Google');
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="h-4 w-4 mr-2" viewBox="0 0 48 48">
              <defs>
                <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
              </defs>
              <clipPath id="b">
                <use xlinkHref="#a" overflow="visible"/>
              </clipPath>
              <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/>
              <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/>
              <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/>
              <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/>
            </svg>
            Sign in with Google
          </Button>
        </div>
        <p className="text-center text-sm mt-4 md:hidden">
          Already have an account? <a href="/login" className="underline hover:text-blue-700 focus:text-blue-700">Sign in</a>
        </p>
        <p className="text-center text-sm mt-4">
          By clicking continue, you agree to our <a href="/terms" className="underline hover:text-blue-700 focus:text-blue-700">Terms of Service</a> and <a href="/privacy" className="underline hover:text-blue-700 focus:text-blue-700">Privacy Policy</a>.
        </p>
        </form>
      </CardContent>
    </Card>
  );
}