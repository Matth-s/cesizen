'use client';

import { Badge } from '@/components/ui/badge';
import type { IDiagnosticWithAnswer } from '../schema/quiz-schema';
import { Card, CardContent } from '@/components/ui/card';

type ViewDiagnosticProps = {
  diagnostic: IDiagnosticWithAnswer;
};

export const ViewDiagnostic = ({
  diagnostic,
}: ViewDiagnosticProps) => {
  const { title, answer } = diagnostic;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-lg font-bold tracking-tight">
        Questions associés au diagnostic {title} :
      </h1>

      <div className="space-y-3">
        {answer.map((item) => (
          <Card key={item.id} className="border-muted">
            <CardContent className="flex items-center justify-between p-4">
              <p className="text-sm font-medium leading-none">
                {item.name}
              </p>

              <Badge variant="secondary">{item.value} pts</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewDiagnostic;
