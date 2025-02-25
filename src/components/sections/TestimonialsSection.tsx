
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "田中 美咲",
    role: "株式会社イノベーション 代表取締役",
    content: "AIと専門家のサポートのおかげで、補助金申請の採択率が大幅に向上しました。手続きも簡単で、経営に集中できるようになりました。",
    rating: 5
  },
  {
    name: "佐藤 健一",
    role: "テックスタートアップ CEO",
    content: "初めての補助金申請でしたが、専門家の方が丁寧にサポートしてくださり、無事に採択されました。経営者の強い味方です。",
    rating: 5
  },
  {
    name: "山田 優子",
    role: "製造業 経営企画部長",
    content: "書類作成の時間が大幅に削減され、事業計画の質も向上。補助金申請のプロフェッショナルとして非常に頼りになります。",
    rating: 5
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <Star className="w-4 h-4" />
            お客様の声
          </div>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            多くの企業様に
            <br />
            ご利用いただいています
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            補助金・助成金申請のプロフェッショナルとして、
            <br />
            お客様の成長をサポートしています。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <Quote className="absolute top-4 right-4 text-primary/20 w-8 h-8" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">{testimonial.content}</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
