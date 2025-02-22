
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Case } from '@/types/client';
import { CaseDetailsModal } from '@/components/modals/CaseDetailsModal';
import { Bell } from 'lucide-react';

interface CaseBoardProps {
  filteredCases: Case[];
  onStatusChange: (caseId: number, newStatus: string) => void;
}

export const CaseBoard = ({ filteredCases, onStatusChange }: CaseBoardProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      onStatusChange(Number(active.id), over?.id as string);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {['見積依頼中', '商談中', '受注確定'].map(status => (
          <div key={status} className="space-y-4">
            <h3 className="font-semibold text-center p-2 bg-gray-100 rounded-lg">
              {status}
            </h3>
            <SortableContext
              items={filteredCases.filter(c => c.status === status).map(c => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {filteredCases
                  .filter(case_ => case_.status === status)
                  .map((case_) => (
                    <div
                      key={case_.id}
                      className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                        <div className="w-full sm:w-auto">
                          <h4 className="font-semibold">{case_.client}</h4>
                          <p className="text-sm text-gray-500">{case_.type}</p>
                          {case_.reminder && (
                            <div className="flex items-center mt-2 text-yellow-600">
                              <Bell className="h-4 w-4 mr-1" />
                              <span className="text-sm">
                                リマインダー: {case_.reminder}
                              </span>
                            </div>
                          )}
                        </div>
                        <CaseDetailsModal caseData={case_} />
                      </div>
                    </div>
                  ))}
              </div>
            </SortableContext>
          </div>
        ))}
      </div>
    </DndContext>
  );
};
