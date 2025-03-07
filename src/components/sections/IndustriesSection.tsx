
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, CheckCircle2 } from "lucide-react";
import { targetIndustries } from "@/data/industries";

export const IndustriesSection = () => {
  const [showAllIndustries, setShowAllIndustries] = useState(false);
  const initialDisplayCount = 24;

  const industryNames = targetIndustries.map(industry => industry.name);
  const displayedIndustryNames = showAllIndustries 
    ? industryNames 
    : industryNames.slice(0, initialDisplayCount);

  return (
    <div className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <Building className="w-4 h-4" />
            幅広い業種に対応
          </div>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            あらゆる業種の企業様を
            <span className="block mt-2">強力にサポート</span>
          </h2>
          <p className="text-xl text-gray-600">
            業種や規模を問わず、さまざまな企業様の補助金・助成金申請をサポートしています。
            <span className="block mt-2 font-medium">
              豊富な実績と専門知識で、最適な補助金・助成金を見つけ出します。
            </span>
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-primary/20 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle2 className="text-primary w-6 h-6" />
            <h3 className="text-2xl font-bold text-gray-900">
              対応業種一覧
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {displayedIndustryNames.map((industryName, i) => (
              <span
                key={i}
                className="inline-flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-colors duration-200"
              >
                {industryName}
              </span>
            ))}
          </div>
          <div className="mt-8 space-y-6">
            {!showAllIndustries && (
              <Button
                variant="outline"
                className="w-full max-w-md mx-auto block border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => setShowAllIndustries(true)}
              >
                すべての対応業種を見る
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            <div className="p-4 bg-primary/5 rounded-xl">
              <p className="text-gray-700 text-sm">
                ※上記以外の業種もサポート可能です。業種特有の補助金・助成金についてもお気軽にご相談ください。
                専門家が貴社に最適な支援策をご提案いたします。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
