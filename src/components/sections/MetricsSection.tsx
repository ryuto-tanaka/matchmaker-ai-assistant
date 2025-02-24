
import { metrics } from "@/data/metrics";
import { Award } from "lucide-react";

export const MetricsSection = () => {
  return (
    <div className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <Award className="w-4 h-4" />
            実績が証明する効果
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            圧倒的な効率化を実現
          </h2>
          <p className="text-xl text-gray-600">
            AIと専門家の力で、申請プロセスを大幅に効率化
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{metric.title}</h3>
                  <div className="text-5xl font-bold text-primary mb-4">
                    {metric.reduction}
                    <span className="text-2xl ml-1">%</span>
                  </div>
                  <p className="text-gray-600">{metric.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
