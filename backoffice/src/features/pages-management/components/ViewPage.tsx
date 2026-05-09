import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Globe, Eye, EyeOff } from 'lucide-react';
import type { IPageObject } from '../schemas/pages-schema';

type ViewPageProps = {
  page: IPageObject;
};

const ViewPage = ({ page }: ViewPageProps) => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-3xl">{page.title}</CardTitle>

              <CardDescription className="mt-2 text-base">
                {page.description || 'Aucune description disponible'}
              </CardDescription>
            </div>

            <Badge
              variant={page.isPublished ? 'default' : 'secondary'}
              className="flex items-center gap-2"
            >
              {page.isPublished ? (
                <>
                  <Eye className="size-4" />
                  Publiée
                </>
              ) : (
                <>
                  <EyeOff className="size-4" />
                  Brouillon
                </>
              )}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Globe className="size-4" />
              <span>/{page.slug}</span>
            </div>

            <div className="flex items-center gap-2">
              <FileText className="size-4" />
              <span>ID : {page.id}</span>
            </div>

            {page.createdAt && (
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />

                <span>
                  {new Date(page.createdAt).toLocaleDateString(
                    'fr-FR',
                    {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    },
                  )}
                </span>
              </div>
            )}
          </div>
        </CardHeader>

        {page.imageUrl && (
          <div className="px-6 flex justify-center">
            <img
              src={page.imageUrl}
              alt={page.title}
              className="max-h-100 w-auto max-w-full object-contain rounded-xl border"
            />
          </div>
        )}

        <CardContent className="space-y-8 pt-6">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Résumé</h2>

            <div className="border rounded-xl p-4 bg-muted/30">
              <p className="text-muted-foreground leading-relaxed">
                {page.description || 'Aucun résumé disponible'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Contenu</h2>

            <div className="border rounded-xl p-6 leading-7 whitespace-pre-wrap bg-background">
              {page.content || 'Aucun contenu disponible'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewPage;
