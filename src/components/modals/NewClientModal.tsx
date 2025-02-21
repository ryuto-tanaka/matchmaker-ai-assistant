
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Users, Phone } from 'lucide-react';

export function NewClientModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    contactPerson: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement client registration logic
    console.log('New client data:', formData);
    setOpen(false);
    setFormData({ name: '', industry: '', contactPerson: '', phone: '' });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>新規登録</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>クライアント新規登録</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">会社名</Label>
            <div className="relative">
              <Building className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="name"
                placeholder="株式会社〇〇"
                className="pl-8"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">業界</Label>
            <Input
              id="industry"
              placeholder="IT・通信"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPerson">担当者名</Label>
            <div className="relative">
              <Users className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="contactPerson"
                placeholder="山田太郎"
                className="pl-8"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">電話番号</Label>
            <div className="relative">
              <Phone className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="phone"
                placeholder="03-1234-5678"
                className="pl-8"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              キャンセル
            </Button>
            <Button type="submit">登録</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
