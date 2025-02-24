
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { useProfileSetup } from '@/hooks/useProfileSetup';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const {
    formData,
    isSubmitting,
    validationErrors,
    handleChange,
    handleSubmit
  } = useProfileSetup();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="container max-w-lg mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          戻る
        </Button>

        <Card className="w-full">
          <ProfileForm
            formData={formData}
            validationErrors={validationErrors}
            isSubmitting={isSubmitting}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;
