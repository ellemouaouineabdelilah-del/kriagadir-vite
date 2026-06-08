import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ChevronLeft, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Step3 = ({
  selectedCar,
  startDate,
  endDate,
  days,
  totalEstimate,
  personalData,
  onBack,
  onConfirmEmail,
  onConfirmWhatsApp,
}) => {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <Card>
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold">Récapitulatif de votre réservation</h2>
          <div className="space-y-2">
            <p><strong>Véhicule :</strong> {selectedCar.name}</p>
            <p><strong>Dates :</strong> du {format(startDate, "dd/MM/yyyy")} au {format(endDate, "dd/MM/yyyy")} ({days} jours)</p>
            <p><strong>Total estimé :</strong> {totalEstimate}€</p>
            <p><strong>Caution :</strong> {selectedCar.caution}€ (remboursable)</p>
            <hr />
            <p><strong>Nom complet :</strong> {personalData.firstName} {personalData.lastName}</p>
            <p><strong>Email :</strong> {personalData.email}</p>
            <p><strong>Téléphone :</strong> {personalData.phone}</p>
            <p><strong>Lieu de livraison :</strong> {personalData.lieuLivraison}</p>
            <p><strong>Lieu de récupération :</strong> {personalData.lieuRecuperation}</p>
            {personalData.notes && <p><strong>Notes :</strong> {personalData.notes}</p>}
          </div>
          <div className="flex flex-wrap gap-4 justify-between pt-4">
            <Button variant="outline" onClick={onBack}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Modifier
            </Button>
            <div className="flex gap-3">
              <Button onClick={onConfirmEmail} className="bg-blue-600 hover:bg-blue-700">
                <Mail className="mr-2 h-4 w-4" /> Confirmer par email
              </Button>
              <Button onClick={onConfirmWhatsApp} className="bg-green-600 hover:bg-green-700">
                <Phone className="mr-2 h-4 w-4" /> Confirmer par WhatsApp
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Step3;