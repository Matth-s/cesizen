import { AlertTriangle, HeartPulse, ShieldCheck } from "lucide-react";

export const getStressLevel = (score: number) => {
  if (score > 300) {
    return {
      title: "Stress très élevé",
      risk: "80%",
      icon: AlertTriangle,
      color: "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400",
      badge: "Risque élevé",
      description:
        "Votre niveau de stress est particulièrement important. Votre organisme peut être fortement impacté au cours des prochains mois.",
      recommendation:
        "Prenez du temps pour récupérer et n’hésitez pas à demander de l’aide à un professionnel de santé.",
    };
  }

  if (score >= 100) {
    return {
      title: "Stress élevé",
      risk: "51%",
      icon: HeartPulse,
      color:
        "bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400",
      badge: "Vigilance",
      description:
        "Votre score indique une accumulation significative de stress au cours des derniers mois.",
      recommendation:
        "Essayez de réduire les sources de tension et accordez-vous des moments de récupération réguliers.",
    };
  }

  return {
    title: "Stress modéré",
    risk: "30%",
    icon: ShieldCheck,
    color:
      "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    badge: "Faible risque",
    description:
      "Votre niveau de stress reste relativement modéré et peu préoccupant.",
    recommendation:
      "Continuez à maintenir un bon équilibre de vie et des habitudes favorables à votre bien-être.",
  };
};
