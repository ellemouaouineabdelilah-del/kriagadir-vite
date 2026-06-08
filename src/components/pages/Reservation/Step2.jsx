import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { personalInfoSchema } from "./schema";
import { locations } from "./constants";

const Step2 = ({ personalData, onNext, onBack }) => {
  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalData || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      lieuLivraison: "",
      lieuRecuperation: "",
      notes: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const lieuLivraisonValue = watch("lieuLivraison");
  const lieuRecuperationValue = watch("lieuRecuperation");

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <form onSubmit={handleSubmit(onNext)} className="space-y-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Vos coordonnées</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" placeholder="Jean" {...register("firstName")} className="mt-1" />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
              </div>
              {/* Last Name */}
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" placeholder="Dupont" {...register("lastName")} className="mt-1" />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
              </div>
              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="jean@example.com" {...register("email")} className="mt-1" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              {/* Phone */}
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" placeholder="+212 6XX XXX XXX" {...register("phone")} className="mt-1" />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>
              {/* Lieu de livraison */}
              <div>
                <Label htmlFor="lieuLivraison">Lieu de livraison</Label>
                <Select value={lieuLivraisonValue} onValueChange={(value) => setValue("lieuLivraison", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choisir" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.lieuLivraison && <p className="text-red-500 text-sm mt-1">{errors.lieuLivraison.message}</p>}
              </div>
              {/* Lieu de récupération */}
              <div>
                <Label htmlFor="lieuRecuperation">Lieu de récupération</Label>
                <Select value={lieuRecuperationValue} onValueChange={(value) => setValue("lieuRecuperation", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choisir" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.lieuRecuperation && <p className="text-red-500 text-sm mt-1">{errors.lieuRecuperation.message}</p>}
              </div>
              {/* Notes */}
              <div className="md:col-span-2">
                <Label htmlFor="notes">Notes / Demandes spéciales</Label>
                <Textarea id="notes" placeholder="Sièges enfant, siège bébé, etc." {...register("notes")} className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Retour
          </Button>
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
            Suivant <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default Step2;