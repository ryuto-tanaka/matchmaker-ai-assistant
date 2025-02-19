
import { ServiceCategory } from "@/types/categories";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  categories: ServiceCategory[];
}

export const ServiceCategoriesSection = ({ categories }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            90ジャンル以上に対応
          </span>
          <h2 className="text-4xl font-bold mb-6">
            あらゆる分野の専門家を
            <span className="text-primary block mt-2">強力にサポート</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            経験や実績を活かして、あなたの専門分野で収益を上げるためのサポートをご提供します。
            <span className="block mt-2 font-medium">
              個人事業主から企業まで、幅広い分野でご活用いただけます。
            </span>
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-primary/20"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.services.map((service, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-colors duration-200"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            ※上記以外にも多数の分野に対応しております。お気軽にご相談ください。
          </p>
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-4 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            onClick={() => navigate("/register")}
          >
            すべてのジャンルを見る
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
