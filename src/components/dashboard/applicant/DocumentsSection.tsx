
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File } from 'lucide-react';
import DocumentDetailsModal from '@/components/modals/DocumentDetailsModal';

interface Document {
  title: string;
  updatedAt: string;
}

const DocumentsSection = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>書類管理</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => {
              const document = {
                title: `事業計画書_v${index + 1}`,
                updatedAt: '2024/02/01'
              };

              return (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <File className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="font-medium">{document.title}</p>
                      <p className="text-sm text-gray-500">更新日: {document.updatedAt}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDocument(document)}
                  >
                    表示
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <DocumentDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        document={selectedDocument}
      />
    </>
  );
};

export default DocumentsSection;
