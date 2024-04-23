'use client'
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import Login from '@/components/login/login';
import Register from '@/components/login/register';
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function Home() {
  const [email] = useState('');
  const router = useRouter();

  const isLogin = usePathname() === '/login';
  const toggleRoute = isLogin ? '/register' : '/login';
  const toggleButtonText = isLogin ? 'Register' : 'Login';

  const handleLogin = (email: string, password: string) => {
    // Implement login logic
    console.log('Login with:', email, password);
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic
    console.log('Continue with Google');
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Logged in with:', email);
    // Endpoint logic here
  };
  
  return (
    <div className=" relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="absolute right-4 top-4 md:right-8 md:top-8 flex items-center space-x-4">
        <ThemeToggle/>
        <Button
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "relative"
          )}
          onClick={() => router.push(toggleRoute)}
        >
          {toggleButtonText}
      </Button>
      </div>
      <div className=" relative hidden h-full flex-col bg-zinc-900 p-10 text-white lg:flex dark:border-r">
          <div className=" relative z-20 flex items-center text-lg font-medium">
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            width="33" 
            height="24" 
            viewBox="0 0 33 24" 
            fill="none" 
            className="mr-2 h-7 w-7">
            <path d="M32.4396 8.9605C32.4396 8.40588 31.992 7.95826 31.4374 7.95826H29.9171C29.4807 7.95826 29.0753 8.17504 28.8276 8.5354L28.6052 8.85917L25.5421 2.12772C25.0719 1.10011 24.0866 0.401939 22.9632 0.297722C18.4784 -0.0992406 13.9686 -0.0992406 9.48346 0.297722C8.36014 0.401888 7.37476 1.10011 6.90463 2.12772L3.86972 8.85917L3.64731 8.5354C3.40238 8.17504 2.99415 7.95826 2.55779 7.95826H1.00938C0.505429 7.95263 0.0774748 8.32425 0.00994264 8.82256C-0.0604407 9.32087 0.249247 9.79107 0.736292 9.92613L2.84781 10.5174L1.51331 11.9588C0.969945 12.5472 0.671499 13.3186 0.677121 14.121V22.978C0.679936 23.5411 1.13602 23.9972 1.70192 24H6.13324C6.69631 23.9972 7.15242 23.5411 7.15804 22.978V21.2916H25.2829V22.978C25.2857 23.5439 25.7474 24 26.3133 24H30.7531C31.3162 23.9972 31.7723 23.5411 31.7751 22.978V14.0986C31.7836 13.2991 31.4852 12.5249 30.9418 11.9365L29.6073 10.495L31.7189 9.90379C32.1412 9.77991 32.4312 9.39689 32.4396 8.9605ZM8.29527 2.7611C8.53175 2.23744 9.03286 1.87986 9.60721 1.83201C13.9992 1.44349 18.4195 1.44349 22.8109 1.83201C23.3937 1.87142 23.9089 2.22897 24.1511 2.7611L27.3296 9.78819H5.13048L8.29527 2.7611ZM4.97877 17.3839C4.03281 17.3867 3.17976 16.8209 2.81659 15.9453C2.4534 15.0726 2.6533 14.0674 3.32053 13.3974C3.99058 12.7301 4.99565 12.5303 5.86845 12.8934C6.74399 13.2566 7.3099 14.1097 7.30709 15.0556C7.30428 16.3423 6.2626 17.3811 4.97877 17.3839ZM20.6121 18.617C20.6121 18.952 20.3418 19.2251 20.0068 19.2308H12.4391C12.1041 19.2251 11.8338 18.952 11.8338 18.617V17.2347C11.8367 16.8996 12.1069 16.6322 12.4391 16.6294H20.0068C20.339 16.6322 20.6093 16.8996 20.6121 17.2347V18.617ZM27.4674 17.3839C26.5215 17.3839 25.6684 16.8152 25.308 15.9425C24.9477 15.0669 25.1476 14.0618 25.8176 13.3946C26.4877 12.7273 27.4927 12.5303 28.3655 12.8934C29.2383 13.2594 29.8042 14.1125 29.8014 15.0556C29.8014 15.675 29.5564 16.269 29.1172 16.7054C28.678 17.1418 28.084 17.3867 27.4674 17.3839Z" fill="white"/>
          </svg>
            VTravel
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Why drive alone when you can carpool and make new friends?&rdquo;
              </p>
              <footer className="text-sm">Heemanshu Bhaskar</footer>
            </blockquote>
          </div>
          <div className="absolute top-0 left-5 w-full h-full">
          <img src="/car-animation.gif" alt="VTravel" className="object-cover" style= {{width: 'auto', height: '90%'}}/>
          </div>
      </div>
      {isLogin ? (
        <Login onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />
      ) : (
        <Register />
      )}
    </div>
  );
}
