'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

type LoginProps = {
  onLogin: (usernameOrEmail: string, password: string) => void;
  onGoogleLogin: () => void;
};

const Login = ({ onLogin, onGoogleLogin }: LoginProps) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(usernameOrEmail, password);

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      if (response.status === 200){
        router.push('/trips');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your username or email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="usernameOrEmail"
              type="text"
              placeholder="Username or email"
              required
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-right mt-2">
            <a href="#" className="text-sm font-semibold hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
          </div>

          <Button className="w-full" type="submit">
            Sign In
          </Button>

          <div className="flex flex-col items-center justify-center mt-7">
            <div className="flex items-center w-full">
              <hr className="border-gray-500 flex-1" />
              <div className="px-2 text-sm text-gray-500 whitespace-nowrap">OR</div>
              <hr className="border-gray-500 flex-1" />
            </div>
            
            <Button className="w-full mt-2 flex items-center justify-center bg-white border text-black border-gray-300 hover:bg-gray-100" type="button" onClick={onGoogleLogin}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="h-4 w-4 mr-2" viewBox="0 0 48 48">
              <defs>
                <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
              </defs>
              <clipPath id="b">
                <use xlinkHref="#a" overflow="visible"/>
              </clipPath>
              <path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/>
              <path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/>
              <path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/>
              <path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/>
            </svg>
              Sign in with Google
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
