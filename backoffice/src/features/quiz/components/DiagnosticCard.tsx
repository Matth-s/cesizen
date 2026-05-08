import { ChevronRight } from 'lucide-react';
import type { IQuizObject } from '../schema/quiz-schema';
import { Link } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';

type DiagnosticCardProps = {
  diagnostic: IQuizObject;
};

const DiagnosticCard = ({ diagnostic }: DiagnosticCardProps) => {
  const {
    id,
    title,
    _count: { answer },
    createdAt,
  } = diagnostic;

  return (
    <Link to={id} className="block">
      <Card className="transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer">
        <CardContent className="flex items-center justify-between p-5">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold leading-none">
              {title}
            </h3>

            <p className="text-sm text-muted-foreground">
              {answer} questions
            </p>

            <p className="text-xs text-muted-foreground">
              Créé le {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>

          <ChevronRight className="text-muted-foreground transition-transform group-hover:translate-x-1" />
        </CardContent>
      </Card>
    </Link>
  );
};

export default DiagnosticCard;
