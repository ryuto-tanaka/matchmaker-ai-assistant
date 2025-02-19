
import { TargetCategory } from "@/types/categories";
import { CheckCircle2 } from "lucide-react";

interface Props {
  categories: TargetCategory[];
}

export const TargetCategoriesSection = ({ categories }: Props) => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            幅広い業種に対応
          </span>
          <h2 className="text-4xl font-bold mb-6">
            あらゆる業種の企業様を
            <span className="text-primary block mt-2">強力にサポート</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            業種や規模を問わず、さまざまな企業様の補助金・助成金申請をサポートしています。
            <span className="block mt-2 font-medium">
              豊富な実績と専門知識で、最適な補助金・助成金を見つけ出します。
            </span>
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-primary/20"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {category.title}
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-2">
                    主な補助対象
                  </h4>
                  <ul className="space-y-2">
                    {category.examples.map((example, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-2">
                    対象業種例
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.industries.map((industry, i) => (
                      <span
                        key={i}
                        className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
