
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, signup, requestOtp, isLoading, error } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);

  const handleRequestOtp = async () => {
    if (!phone || phone.length < 10) return;
    
    const success = await requestOtp(phone);
    if (success) {
      setOtpRequested(true);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !otp) return;
    
    const success = await login(phone, otp);
    if (success) {
      resetForm();
      onClose();
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !otp) return;
    
    const success = await signup(name, phone);
    if (success) {
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setOtp('');
    setOtpRequested(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden rounded-2xl">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-2xl font-serif text-center">Welcome to LegalAssist</DialogTitle>
          <DialogDescription className="text-center pt-2">
            Sign in or create an account to get legal help
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mx-6 my-4">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="px-6 pb-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone-login">Phone Number</Label>
                <Input
                  id="phone-login"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={otpRequested || isLoading}
                  required
                />
              </div>
              
              {!otpRequested ? (
                <Button 
                  type="button" 
                  className="w-full" 
                  onClick={handleRequestOtp}
                  disabled={!phone || phone.length < 10 || isLoading}
                >
                  {isLoading ? "Sending..." : "Request OTP"}
                </Button>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="otp-login">One-Time Password</Label>
                    <Input
                      id="otp-login"
                      type="text"
                      placeholder="Enter the 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={!otp || otp.length < 6 || isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </>
              )}
              
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
              
              <p className="text-xs text-center text-gray-500 mt-4">
                For demo purposes, any 6-digit code will work as OTP
              </p>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="px-6 pb-6">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name-register">Full Name</Label>
                <Input
                  id="name-register"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone-register">Phone Number</Label>
                <Input
                  id="phone-register"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={otpRequested || isLoading}
                  required
                />
              </div>
              
              {!otpRequested ? (
                <Button 
                  type="button" 
                  className="w-full" 
                  onClick={handleRequestOtp}
                  disabled={!name || !phone || phone.length < 10 || isLoading}
                >
                  {isLoading ? "Sending..." : "Request OTP"}
                </Button>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="otp-register">One-Time Password</Label>
                    <Input
                      id="otp-register"
                      type="text"
                      placeholder="Enter the 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={!name || !phone || !otp || otp.length < 6 || isLoading}
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </Button>
                </>
              )}
              
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
              
              <p className="text-xs text-center text-gray-500 mt-4">
                For demo purposes, any 6-digit code will work as OTP
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
