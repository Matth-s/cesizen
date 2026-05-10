import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

const UserParams = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Mail className="size-5 text-blue-500" />

          <div>
            <CardTitle>Informations du compte</CardTitle>

            <CardDescription>
              Vos informations personnelles de connexion.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Nom d'utilisateur</Label>

          <Input value="senos" disabled />
        </div>

        <div className="space-y-2">
          <Label>Email</Label>

          <Input value="senos@example.com" disabled />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserParams;
