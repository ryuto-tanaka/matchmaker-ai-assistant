
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { File } from 'lucide-react';

interface DocumentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    title: string;
    updatedAt: string;
  } | null;
}

const DocumentDetailsModal = ({ isOpen, onClose, document }: DocumentDetailsModalProps) => {
  if (!document) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <File className="h-5 w-5" />
            書類詳細
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">ファイル名</h3>
              <p className="text-gray-600">{document.title}</p>
            </div>
            <div>
              <h3 className="font-medium">最終更新日</h3>
              <p className="text-gray-600">{document.updatedAt}</p>
            </div>
            {/* Note: 将来的にファイルのプレビューやダウンロード機能を追加予定 */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDetailsModal;
