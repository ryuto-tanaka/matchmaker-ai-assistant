
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
import { Checkbox } from "@/components/ui/checkbox";
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
    // 基本情報
    businessName: '',
    industry: '',
    location: '',
    
    // 事業概要
    businessDescription: '',
    targetCustomer: '',
    
    // 目標
    goals: [] as string[],
    otherGoal: '',
    
    // 補助金詳細
    grantPurpose: '',
    expenseTypes: [] as string[],
    otherExpense: '',
    schedule: '',
    requestAmount: '',
    expectedOutcome: ''
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData(prev => {
      const currentValues = prev[field] as string[];
      const exists = currentValues.includes(value);
      
      return {
        ...prev,
        [field]: exists 
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value]
      };
    });
  };

  const handleNext = () => {
    if (currentStep < 4) {
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

  const renderBasicInfo = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>事業者名（個人名または会社名）</Label>
        <Input
          value={formData.businessName}
          onChange={(e) => handleChange('businessName', e.target.value)}
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
            <SelectItem value="retail">小売業</SelectItem>
            <SelectItem value="restaurant">飲食業</SelectItem>
            <SelectItem value="service">サービス業</SelectItem>
            <SelectItem value="manufacturing">製造業</SelectItem>
            <SelectItem value="it">IT・情報通信</SelectItem>
            <SelectItem value="other">その他</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>所在地（市区町村）</Label>
        <Input
          value={formData.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="例：東京都渋谷区"
        />
      </div>
    </div>
  );

  const renderBusinessOverview = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>事業の概要</Label>
        <Textarea
          value={formData.businessDescription}
          onChange={(e) => handleChange('businessDescription', e.target.value)}
          placeholder="提供する商品・サービスを簡単に説明してください&#10;例：個人経営のカフェ、地域限定の宅配サービスなど"
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label>ターゲット顧客層</Label>
        <Textarea
          value={formData.targetCustomer}
          onChange={(e) => handleChange('targetCustomer', e.target.value)}
          placeholder="例：若い女性、ビジネスマン、高齢者など"
          rows={3}
        />
      </div>
    </div>
  );

  const renderGoals = () => (
    <div className="space-y-4">
      <Label>現在、最も達成したい目標は何ですか？（複数選択可）</Label>
      <div className="space-y-2">
        {[
          { id: 'increase_sales', label: '売上を伸ばしたい' },
          { id: 'new_customers', label: '新しい顧客を増やしたい' },
          { id: 'expand_area', label: 'サービスエリアを拡大したい' },
        ].map((goal) => (
          <div key={goal.id} className="flex items-center space-x-2">
            <Checkbox
              id={goal.id}
              checked={formData.goals.includes(goal.id)}
              onCheckedChange={(checked) => {
                if (checked) {
                  handleCheckboxChange('goals', goal.id);
                }
              }}
            />
            <Label htmlFor={goal.id}>{goal.label}</Label>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Label>その他の目標</Label>
        <Input
          value={formData.otherGoal}
          onChange={(e) => handleChange('otherGoal', e.target.value)}
          placeholder="その他の目標があれば記入してください"
        />
      </div>
    </div>
  );

  const renderGrantDetails = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>補助金や助成金を利用する目的</Label>
        <Textarea
          value={formData.grantPurpose}
          onChange={(e) => handleChange('grantPurpose', e.target.value)}
          placeholder="例：新商品開発、店舗改装、広告キャンペーンの実施など"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>申請したい経費（複数選択可）</Label>
        {[
          { id: 'equipment', label: '設備費用（機械の導入、店舗内装の変更など）' },
          { id: 'labor', label: '人件費（新規採用、研修費用など）' },
          { id: 'advertising', label: '広告費（SNS広告、チラシ制作費など）' },
          { id: 'development', label: '開発費（商品/サービスの試作やリニューアル）' },
          { id: 'it', label: 'IT導入費（ウェブサイト作成、ITツール導入）' },
        ].map((expense) => (
          <div key={expense.id} className="flex items-center space-x-2">
            <Checkbox
              id={expense.id}
              checked={formData.expenseTypes.includes(expense.id)}
              onCheckedChange={(checked) => {
                if (checked) {
                  handleCheckboxChange('expenseTypes', expense.id);
                }
              }}
            />
            <Label htmlFor={expense.id}>{expense.label}</Label>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label>事業スケジュール</Label>
        <Textarea
          value={formData.schedule}
          onChange={(e) => handleChange('schedule', e.target.value)}
          placeholder="例：来月から3ヶ月以内に店舗改装を完了したい"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>申請金額の目安</Label>
        <Select onValueChange={(value) => handleChange('requestAmount', value)}>
          <SelectTrigger>
            <SelectValue placeholder="金額を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="under_500k">50万円以下</SelectItem>
            <SelectItem value="500k_1m">50万円～100万円</SelectItem>
            <SelectItem value="1m_3m">100万円～300万円</SelectItem>
            <SelectItem value="over_3m">300万円以上</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>期待される成果</Label>
        <Textarea
          value={formData.expectedOutcome}
          onChange={(e) => handleChange('expectedOutcome', e.target.value)}
          placeholder="例：売上を20％アップさせる、新たな顧客層を獲得する、業務効率化を実現するなど"
          rows={3}
        />
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AI事業計画書作成アンケート</DialogTitle>
          <DialogDescription>
            Step {currentStep} / 4: {
              currentStep === 1 ? '基本情報' :
              currentStep === 2 ? '事業概要' :
              currentStep === 3 ? '目標設定' :
              '補助金詳細'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {currentStep === 1 && renderBasicInfo()}
          {currentStep === 2 && renderBusinessOverview()}
          {currentStep === 3 && renderGoals()}
          {currentStep === 4 && renderGrantDetails()}
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
            {currentStep === 4 ? '完了' : '次へ'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessPlanSurveyModal;
