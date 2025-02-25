
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react";

export const ContactSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            まずは無料相談から
            <br />
            お気軽にお問い合わせください
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            補助金・助成金の申請に関するご相談は完全無料。
            <br />
            経験豊富な専門家が丁寧にご対応いたします。
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">電話相談</h3>
              <p className="text-gray-600 mb-4">平日9:00〜18:00</p>
              <p className="text-primary font-semibold">0120-XXX-XXX</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">メール相談</h3>
              <p className="text-gray-600 mb-4">24時間受付中</p>
              <p className="text-primary font-semibold">info@example.com</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <MessageSquare className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">オンラインチャット</h3>
              <p className="text-gray-600 mb-4">チャットですぐに相談</p>
              <Button variant="outline" className="w-full">
                チャットを開く
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="bg-primary/5 rounded-2xl p-8">
            <p className="text-gray-700 text-sm">
              ※ 初回相談は完全無料です。お気軽にご相談ください。
              <br />
              実際の申請支援サービスの料金は、補助金・助成金の種類や申請内容によって異なります。
              <br />
              詳細は個別にご相談させていただきます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
