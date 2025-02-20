
import { metrics } from "@/data/metrics";

export const MetricsSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            圧倒的な効率化を実現
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            AIと専門家の力で、申請プロセスを大幅に効率化
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="relative bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <h3 className="text-xl font-semibold mb-4">{metric.title}</h3>
                <div className="text-5xl font-bold text-primary mb-2">
                  {metric.reduction}
                  <span className="text-2xl">%</span>
                </div>
                <p className="text-gray-600">{metric.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
