
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from "@/components/ui/card";
import { User, Star, MessageSquare, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { ConsultationRequestModal } from '@/components/modals/ConsultationRequestModal';

// 専門分野の定義
const categories = [
  'IT導入補助金',
  '事業再構築補助金',
  '小規模事業者持続化補助金',
  'ものづくり補助金',
  '省エネ補助金'
] as const;

const ExpertsPage = () => {
  const navigate = useNavigate();
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [selectedExpertId, setSelectedExpertId] = useState<number | null>(null);
  const [selectedExpertName, setSelectedExpertName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const experts = [
    { 
      id: 1, 
      name: '山田太郎',
      title: '中小企業診断士',
      specialties: ['IT導入補助金', '事業再構築補助金'],
      rating: 4.8,
      consultations: 156
    },
    { 
      id: 2, 
      name: '鈴木花子',
      title: '税理士',
      specialties: ['小規模事業者持続化補助金', 'ものづくり補助金'],
      rating: 4.9,
      consultations: 243
    },
    { 
      id: 3, 
      name: '佐藤一郎',
      title: '行政書士',
      specialties: ['事業再構築補助金', '省エネ補助金'],
      rating: 4.7,
      consultations: 128
    },
  ];

  const handleConsultationRequest = (expertId: number, expertName: string) => {
    setSelectedExpertId(expertId);
    setSelectedExpertName(expertName);
    setIsConsultationModalOpen(true);
  };

  const handleConsultationComplete = () => {
    setIsConsultationModalOpen(false);
    if (selectedExpertId) {
      navigate("/dashboard/applicant/experts");
      setTimeout(() => {
        navigate(`/dashboard/messages/${selectedExpertId}`);
      }, 100);
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = searchQuery === "" ||
      expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.specialties.some(specialty =>
        specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategories = selectedCategories.length === 0 ||
      expert.specialties.some(specialty =>
        selectedCategories.includes(specialty)
      );

    return matchesSearch && matchesCategories;
  });

  return (
    <DashboardLayout userType="applicant" userName="申請者">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">専門家に相談</h1>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="専門家を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid gap-6">
            {filteredExperts.map((expert) => (
              <Card key={expert.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{expert.name}</h3>
                        <p className="text-sm text-gray-500">{expert.title}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="text-sm">{expert.rating}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm">{expert.consultations}件の相談</span>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {expert.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => handleConsultationRequest(expert.id, expert.name)}>
                      相談する
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <ConsultationRequestModal
          isOpen={isConsultationModalOpen}
          onClose={() => setIsConsultationModalOpen(false)}
          expertName={selectedExpertName}
          onSubmitComplete={handleConsultationComplete}
        />
      </div>
    </DashboardLayout>
  );
};

export default ExpertsPage;

