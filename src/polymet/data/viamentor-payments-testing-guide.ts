/**
 * VIAMENTOR - Payments Module Testing Guide
 * Guide complet de tests fonctionnels pour le module Payments
 */

export const paymentsTestingGuide = `
# 🧪 Guide de Tests - Module Payments ViaMenutor

## 📋 Vue d'ensemble

Ce guide décrit tous les workflows utilisateur à tester pour le module Payments.

---

## ✅ Tests Fonctionnels

### 1. **Enregistrement Manuel de Paiement**

#### Workflow Standard
1. ✓ Cliquer sur "Nouveau paiement"
2. ✓ Rechercher et sélectionner un élève
3. ✓ Vérifier l'affichage des factures ouvertes
4. ✓ Sélectionner une ou plusieurs factures
5. ✓ Vérifier le calcul automatique du total
6. ✓ Saisir le montant du paiement
7. ✓ Sélectionner la méthode de paiement
8. ✓ Ajouter une référence (optionnel)
9. ✓ Uploader un justificatif (optionnel)
10. ✓ Ajouter des notes internes (optionnel)
11. ✓ Cocher "Créer écriture comptable"
12. ✓ Vérifier l'aperçu de l'écriture
13. ✓ Soumettre le formulaire
14. ✓ Vérifier le toast de succès
15. ✓ Vérifier l'ajout dans la liste

#### Cas Limites
- ❌ Montant supérieur au total des factures (sans paiement partiel)
- ✓ Montant supérieur avec "Autoriser paiement partiel" activé
- ❌ Aucune facture sélectionnée
- ❌ Élève sans factures ouvertes
- ✓ Paiement partiel sur une facture
- ✓ Paiement multiple sur plusieurs factures

---

### 2. **Import Camt.054**

#### Workflow Standard
1. ✓ Cliquer sur "Import Camt.054"
2. ✓ **Step 1**: Upload fichier XML
3. ✓ **Step 2**: Aperçu des données
4. ✓ **Step 3**: Réconciliation
5. ✓ **Step 4**: Validation

---

### 3. **Paiements Non Réconciliés**

#### Actions disponibles
- ✓ Associer à facture
- ✓ Créer facture rétroactive
- ✓ Marquer vérifié

---

### 4. **Rapports Comptables**

#### Exports disponibles
- ✓ Journal des paiements (Excel/CSV/PDF)
- ✓ Rapport TVA (Excel/PDF)

---

### 5. **Notifications**

#### Fonctionnalités
- ✓ Gestion des modèles
- ✓ Test d'envoi
- ✓ Historique des envois

---

## 🌍 Tests i18n (Multilingue)

### Langues à Tester
1. ✓ **Français (FR)** - Langue par défaut
2. ✓ **Allemand (DE)**
3. ✓ **Italien (IT)**
4. ✓ **Anglais (EN)**

---

## 🔒 Tests de Permissions (RBAC)

### Rôles à Tester
1. ✓ **School Admin** - Accès complet
2. ✓ **Finance Manager** - Accès complet
3. ✓ **Instructor** - Lecture seule
4. ✓ **Student** - Pas d'accès

---

## ✅ Checklist Finale

### Fonctionnalités
- [ ] Enregistrement manuel de paiement
- [ ] Import Camt.054
- [ ] Paiements non réconciliés
- [ ] Rapports comptables
- [ ] Notifications
- [ ] Filtres et recherche
- [ ] Actions sur paiements
- [ ] Export des données

### i18n
- [x] Français (FR)
- [x] Allemand (DE)
- [x] Italien (IT)
- [x] Anglais (EN)

---

**Date**: ${new Date().toLocaleDateString("fr-CH")}
**Version**: 1.0.0
**Statut**: ✅ Prêt pour tests
`;

export default paymentsTestingGuide;
