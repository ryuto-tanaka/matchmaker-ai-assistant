import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ConsultationRequestModal } from '@/components/modals/ConsultationRequestModal';
import { ExpertSearchBar } from '@/components/experts/ExpertSearchBar';
import { ExpertCategoryFilter } from '@/components/experts/ExpertCategoryFilter';
import { ExpertCard } from '@/components/experts/ExpertCard';
import { useExperts } from '@/hooks/useExperts';
import { Expert } from '@/types/expert';

const categories = [
  'IT導入補助金',
  '事業再構築補助金',
  '小規模事業者持続化補助金',
  'ものづくり補助金',
  '省エネ補助金'
] as const;

type SortOption = 'rating-desc' | 'rating-asc' | 'consultations-desc' | 'consultations-asc' | 'newest' | 'recommended';

const ExpertsPage = () => {
  const navigate = useNavigate();
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [selectedExpertId, setSelectedExpertId] = useState<string | null>(null);
  const [selectedExpertName, setSelectedExpertName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('rating-desc');

  const { data: experts = [], isLoading, error } = useExperts();

  const handleConsultationRequest = (expertId: string, expertName: string) => {
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

  const getSortedExperts = (expertsData: Expert[]) => {
    const filtered = expertsData.filter(expert => {
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

    return filtered.sort((a, b) => {
      switch (sortOption) {
        case 'rating-desc':
          return b.rating - a.rating;
        case 'rating-asc':
          return a.rating - b.rating;
        case 'consultations-desc':
          return b.consultations - a.consultations;
        case 'consultations-asc':
          return a.consultations - b.consultations;
        case 'newest':
          return new Date(b.joined_at).getTime() - new Date(a.joined_at).getTime();
        case 'recommended':
          return b.recommendation_score - a.recommendation_score;
        default:
          return 0;
      }
    });
  };

  const renderExpertCard = (expert: Expert) => {
    return (
      <ExpertCard
        key={expert.id}
        expert={expert}
        onConsultationRequest={handleConsultationRequest}
      />
    );
  };

  return (
    <DashboardLayout userType="applicant" userName="申請者">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">専門家に相談</h1>

        <div className="space-y-4">
          <ExpertSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortOption={sortOption}
            onSortChange={(value) => setSortOption(value as SortOption)}
          />

          <ExpertCategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
          />

          {/* Show loading state for initial load */}
          {isLoading && !experts.length && (
            <div className="grid gap-6">
              {[...Array(6)].map((_, index) => (
                <ExpertCard key={`loading-${index}`} isLoading={true} />
              ))}
            </div>
          )}

          {/* Show error state if there's an error and no data */}
          {error && !experts.length && (
            <div className="grid gap-6">
              <ExpertCard error={error.message} />
            </div>
          )}

          {/* Show expert cards if we have data */}
          {experts.length > 0 && (
            <div className="grid gap-6">
              {getSortedExperts(experts).map(renderExpertCard)}
            </div>
          )}
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
