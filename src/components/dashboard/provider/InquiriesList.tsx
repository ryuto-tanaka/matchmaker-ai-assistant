
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const InquiriesList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>新規問い合わせ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4" role="list" aria-label="新規問い合わせリスト">
          {[1, 2, 3].map((_, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              role="listitem"
            >
              <div>
                <p className="font-medium">補助金申請支援の相談</p>
                <p className="text-sm text-gray-500" aria-label="受付日">
                  受付日: 2024/02/15
                </p>
              </div>
              <span 
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                role="status"
                aria-label="問い合わせのステータス"
              >
                未対応
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
