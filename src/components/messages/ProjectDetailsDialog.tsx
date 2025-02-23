
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ProjectDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: {
    title: string;
    budget: string;
    deadline: string;
    deliveryDate: string;
    details: string;
  };
}

const ProjectDetailsDialog = ({ open, onOpenChange, project }: ProjectDetailsDialogProps) => {
  // Always ensure we have a valid project object with default values
  const safeProject = {
    title: project?.title || "相談内容",
    budget: project?.budget || "見積り希望",
    deadline: project?.deadline || "未定",
    deliveryDate: project?.deliveryDate || "未定",
    details: project?.details || "",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>相談内容の詳細</DialogTitle>
          <DialogDescription>
            相談依頼の詳細情報
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">{safeProject.title}</h3>
            <div className="bg-green-600 text-white p-4 rounded-lg mb-6">
              <div className="font-bold mb-2">【やりたいこと】IT導入補助金について</div>
              <div className="text-sm">
                期間：2024年3月31日まで<br />
                15:30:00
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground">予算</p>
                <p>{safeProject.budget}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">提案期限</p>
                <p>{safeProject.deadline}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">納品希望日</p>
                <p>{safeProject.deliveryDate}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsDialog;
