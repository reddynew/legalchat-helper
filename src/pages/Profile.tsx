
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User, ShieldCheck, Clock } from 'lucide-react';

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated || !user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-serif font-semibold">Your Profile</h1>
                <p className="text-muted-foreground">Manage your account and review your legal inquiries</p>
              </div>
              
              <Button 
                variant="outline" 
                className="border-legal-200 text-legal-700 hover:bg-legal-50"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your personal details and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
                      <p className="text-base">{user.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h3>
                      <p className="text-base">{user.phone}</p>
                    </div>
                    {user.email && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                        <p className="text-base">{user.email}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6 flex justify-end">
                <Button 
                  variant="outline" 
                  className="border-legal-200 text-legal-700 hover:bg-legal-50"
                >
                  <User className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
            
            <Tabs defaultValue="inquiries">
              <TabsList className="mb-8 grid grid-cols-2 sm:inline-flex">
                <TabsTrigger value="inquiries">Legal Inquiries</TabsTrigger>
                <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="inquiries">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Legal Inquiries</CardTitle>
                    <CardDescription>Review and manage your submitted inquiries</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No inquiries yet</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                        You haven't submitted any legal inquiries. Start a chat to get help with your legal matter.
                      </p>
                      <Button 
                        className="bg-legal-700 hover:bg-legal-800 text-white"
                        onClick={() => navigate('/')}
                      >
                        Start Legal Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy & Security</CardTitle>
                    <CardDescription>Manage your data and security preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Data Privacy</h3>
                          <ShieldCheck className="h-5 w-5 text-legal-700" />
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          Your data is protected and only shared with legal professionals you choose to work with.
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-legal-200 text-legal-700 hover:bg-legal-50"
                        >
                          Privacy Settings
                        </Button>
                      </div>
                      
                      <div className="border-t pt-6">
                        <h3 className="font-medium mb-2">Security Options</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">Two-Factor Authentication</p>
                              <p className="text-muted-foreground text-xs">Add an extra layer of security</p>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-legal-200 text-legal-700 hover:bg-legal-50"
                            >
                              Enable
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">Change Password</p>
                              <p className="text-muted-foreground text-xs">Update your account password</p>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-legal-200 text-legal-700 hover:bg-legal-50"
                            >
                              Update
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-serif font-semibold text-legal-700">LegalAssist</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-legal-700 text-sm">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-legal-700 text-sm">Terms of Service</a>
              <a href="#" className="text-muted-foreground hover:text-legal-700 text-sm">Contact</a>
            </div>
          </div>
          <div className="mt-6 text-center md:text-left text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LegalAssist. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
