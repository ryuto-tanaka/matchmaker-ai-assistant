
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "補助金・助成金の申請は初めてですが大丈夫でしょうか？",
    answer: "はい、安心してお任せください。経験豊富な専門家が初めての方でもわかりやすく丁寧にサポートいたします。申請に必要な書類や手続きについても、ステップバイステップでご案内いたします。"
  },
  {
    question: "申請から採択までどのくらいの期間がかかりますか？",
    answer: "補助金・助成金の種類によって異なりますが、一般的に申請から採択まで1〜3ヶ月程度かかります。当社のAIと専門家のサポートにより、通常の申請期間より大幅に短縮することが可能です。"
  },
  {
    question: "費用はどのくらいかかりますか？",
    answer: "基本的な相談は無料です。申請支援サービスの費用は、補助金・助成金の種類や申請内容によって異なります。詳細は個別にご相談させていただき、透明性のある料金体系でご案内いたします。"
  },
  {
    question: "どのような業種の企業が利用できますか？",
    answer: "製造業、IT、サービス業、小売業など、幅広い業種の企業様にご利用いただけます。業種や企業規模に応じて、最適な補助金・助成金をご提案いたします。"
  }
];

export const FAQSection = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <HelpCircle className="w-4 h-4" />
            よくある質問
          </div>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            ご不明な点は
            <br />
            お気軽にご相談ください
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            お客様からよくいただくご質問をまとめました。
            <br />
            その他のご質問もお気軽にお問い合わせください。
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
