
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface BusinessPlanSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const BusinessPlanSurveyModal: React.FC<BusinessPlanSurveyModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    businessType: '',
    employeeCount: '',
    annualRevenue: '',
    businessDescription: '',
    targetMarket: '',
    competitiveAdvantage: '',
    fundingNeeds: '',
    useOfFunds: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>会社名</Label>
        <Input
          value={formData.companyName}
          onChange={(e) => handleChange('companyName', e.target.value)}
          placeholder="例：株式会社〇〇"
        />
      </div>
      <div className="space-y-2">
        <Label>業種</Label>
        <Select onValueChange={(value) => handleChange('industry', value)}>
          <SelectTrigger>
            <SelectValue placeholder="業種を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manufacturing">製造業</SelectItem>
            <SelectItem value="service">サービス業</SelectItem>
            <SelectItem value="retail">小売業</SelectItem>
            <SelectItem value="it">IT・情報通信</SelectItem>
            <SelectItem value="other">その他</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>従業員数</Label>
        <RadioGroup onValueChange={(value) => handleChange('employeeCount', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1-10" id="emp-1" />
            <Label htmlFor="emp-1">1-10名</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="11-50" id="emp-2" />
            <Label htmlFor="emp-2">11-50名</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="51-100" id="emp-3" />
            <Label htmlFor="emp-3">51-100名</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="100+" id="emp-4" />
            <Label htmlFor="emp-4">100名以上</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>事業内容</Label>
        <Textarea
          value={formData.businessDescription}
          onChange={(e) => handleChange('businessDescription', e.target.value)}
          placeholder="主な事業内容を具体的に記載してください"
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label>ターゲット市場</Label>
        <Textarea
          value={formData.targetMarket}
          onChange={(e) => handleChange('targetMarket', e.target.value)}
          placeholder="想定している顧客層や市場について記載してください"
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label>競争優位性</Label>
        <Textarea
          value={formData.competitiveAdvantage}
          onChange={(e) => handleChange('competitiveAdvantage', e.target.value)}
          placeholder="自社の強みや特徴を記載してください"
          rows={3}
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>必要な資金額</Label>
        <Select onValueChange={(value) => handleChange('fundingNeeds', value)}>
          <SelectTrigger>
            <SelectValue placeholder="必要な資金額を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="~1000">〜100万円</SelectItem>
            <SelectItem value="1000-5000">100万円〜500万円</SelectItem>
            <SelectItem value="5000-10000">500万円〜1000万円</SelectItem>
            <SelectItem value="10000+">1000万円以上</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>資金の使途</Label>
        <Textarea
          value={formData.useOfFunds}
          onChange={(e) => handleChange('useOfFunds', e.target.value)}
          placeholder="資金の具体的な使用用途を記載してください"
          rows={4}
        />
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>AI事業計画書作成アンケート</DialogTitle>
          <DialogDescription>
            Step {currentStep} / 3: {
              currentStep === 1 ? '基本情報' :
              currentStep === 2 ? '事業内容' :
              '資金計画'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            戻る
          </Button>
          <Button onClick={handleNext}>
            {currentStep === 3 ? '完了' : '次へ'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessPlanSurveyModal;
