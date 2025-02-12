
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Shield, User, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const userTypes = [
    {
      id: 'applicant',
      title: '申請者',
      description: '補助金・助成金の申請をお考えの方',
      icon: User,
    },
    {
      id: 'provider',
      title: 'サービス提供者',
      description: '補助金・助成金申請のサポートを提供する企業',
      icon: Briefcase,
    },
    {
      id: 'expert',
      title: '専門家',
      description: '士業・専門家として支援を提供する方',
      icon: Shield,
    },
  ];

  const handleUserTypeSelect = (type: string) => {
    // We'll implement the actual registration logic later with Supabase
    console.log('Selected user type:', type);
    navigate('/profile-setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            アカウントタイプを選択
          </h1>
          <p className="text-gray-600">
            最適なサービスを提供するため、ユーザータイプをお選びください
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {userTypes.map((type) => (
            <Card
              key={type.id}
              className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={() => handleUserTypeSelect(type.id)}
            >
              <CardHeader className="text-center pt-8">
                <type.icon className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-semibold">{type.title}</h3>
              </CardHeader>
              <CardContent className="text-center pb-8">
                <p className="text-gray-600 text-sm">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Register;
