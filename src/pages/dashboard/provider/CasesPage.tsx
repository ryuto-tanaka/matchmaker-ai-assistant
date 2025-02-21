
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, DollarSign, MessageSquare } from 'lucide-react';
import { CaseDetailsModal } from '@/components/modals/CaseDetailsModal';

const CasesPage = () => {
  const cases = [
    {
      id: 1,
      client: '株式会社ABC',
      type: 'IT導入補助金',
      status: '申請準備中',
      amount: '450万円',
      deadline: '2024/03/31',
      description: 'クラウドシステムの導入に関する補助金申請支援',
    },
    {
      id: 2,
      client: '株式会社XYZ',
      type: '事業再構築補助金',
      status: '審査中',
      amount: '1,200万円',
      deadline: '2024/04/15',
      description: '新規事業展開に向けた設備投資の補助金申請',
    },
    {
      id: 3,
      client: '有限会社DEF',
      type: 'ものづくり補助金',
      status: '交付決定',
      amount: '800万円',
      deadline: '2024/05/01',
      description: '製造ライン改善のための設備導入補助金',
    },
  ];

  const stats = [
    { icon: FileText, label: '進行中の案件', value: '4件' },
    { icon: MessageSquare, label: 'トークルーム', value: '2件' },
    { icon: Calendar, label: '審査中', value: '1件' },
    { icon: DollarSign, label: '今月の成約額', value: '35,000円' },
  ];

  return (
    <DashboardLayout userType="provider" userName="提供者">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">案件一覧</h1>
          <div className="text-sm text-gray-500">
            最終更新: {new Date().toLocaleDateString('ja-JP')}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <h3 className="text-xl font-bold">{stat.value}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">進行中の案件</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cases.map((case_) => (
                <div
                  key={case_.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{case_.client}</h3>
                        <p className="text-sm text-gray-500">{case_.type}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm">申請金額: {case_.amount}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm">期限: {case_.deadline}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        case_.status === '審査中' ? 'bg-yellow-100 text-yellow-700' :
                        case_.status === '交付決定' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {case_.status}
                      </span>
                      <CaseDetailsModal caseData={case_} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CasesPage;
