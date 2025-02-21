
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File } from 'lucide-react';

const DocumentsSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>書類管理</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <File className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="font-medium">事業計画書_v{index + 1}</p>
                  <p className="text-sm text-gray-500">更新日: 2024/02/01</p>
                </div>
              </div>
              <Button variant="outline" size="sm">表示</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsSection;
