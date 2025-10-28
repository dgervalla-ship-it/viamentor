# ✅❌ DO & DON'T - VIAMENTOR DESIGN GUIDELINES

**Version** : 1.0  
**Date** : 28 octobre 2025  
**Objectif** : Standards design pour cohérence UI/UX

---

## 🎨 TOP 20 COMPOSANTS

### 1. BUTTON

#### ✅ DO
- Utiliser `variant="default"` pour action principale
- Utiliser `variant="destructive"` pour actions delete
- Limiter texte à 2-3 mots max
- Inclure icône si améliore compréhension
- Bouton principal 1 seul par écran

```tsx
✅ <Button variant="default">Save</Button>
✅ <Button variant="destructive"><Trash2 /> Delete</Button>
✅ <Button size="sm">Quick Action</Button>
```

#### ❌ DON'T
- Pas de multiples boutons primaires (confusion)
- Pas de texte long (> 4 mots)
- Pas de rouge pour actions non-destructives
- Pas oublier état loading

```tsx
❌ <Button>Click here to save your modifications permanently</Button>
❌ <Button variant="default">Delete</Button> // Devrait être destructive
❌ <Button variant="default">Save</Button>
   <Button variant="default">Submit</Button> // 2 primaires
```

---

### 2. CARD

#### ✅ DO
- Utiliser pour grouper infos connexes
- Toujours inclure `CardHeader` avec titre
- Padding cohérent (Tailwind spacing)
- Hover state si cliquable

```tsx
✅ <Card>
     <CardHeader>
       <CardTitle>Student Info</CardTitle>
     </CardHeader>
     <CardContent>...</CardContent>
   </Card>
```

#### ❌ DON'T
- Pas de Card dans Card (sauf cas exceptionnels)
- Pas de Card trop large (max 600px)
- Pas de Card sans titre

```tsx
❌ <Card><Card>...</Card></Card> // Nested cards
❌ <Card className="w-full">...</Card> // Trop large desktop
❌ <Card><p>Content</p></Card> // Pas de CardHeader
```

---

### 3. INPUT

#### ✅ DO
- Toujours inclure `<Label>` associé
- Placeholder = exemple, pas label
- Validation temps réel (si possible)
- Message erreur clair sous input

```tsx
✅ <div>
     <Label htmlFor="email">Email</Label>
     <Input 
       id="email"
       type="email"
       placeholder="exemple@viamentor.ch"
     />
     {error && <p className="text-destructive text-sm">{error}</p>}
   </div>
```

#### ❌ DON'T
- Pas de placeholder comme label
- Pas d'input sans label
- Pas d'erreurs techniques cryptiques

```tsx
❌ <Input placeholder="Entrez votre email" /> // Pas de label
❌ <Input placeholder="Email" /> // Placeholder = label (mauvais)
❌ <p className="error">ERR_VALIDATION_FAILED_003</p> // Cryptique
```

---

### 4. DIALOG / MODAL

#### ✅ DO
- Titre explicite (`DialogTitle`)
- Action principale à droite
- Fermeture possible (X, ESC, outside click)
- Focus automatique sur bouton principal

```tsx
✅ <Dialog>
     <DialogContent>
       <DialogHeader>
         <DialogTitle>Supprimer l'élève ?</DialogTitle>
         <DialogDescription>
           Cette action est irréversible.
         </DialogDescription>
       </DialogHeader>
       <DialogFooter>
         <Button variant="outline">Annuler</Button>
         <Button variant="destructive">Supprimer</Button>
       </DialogFooter>
     </DialogContent>
   </Dialog>
```

#### ❌ DON'T
- Pas de Dialog dans Dialog
- Pas de Dialog sans titre
- Pas de Dialog pour contenu long (use Sheet)
- Pas bloquer fermeture sans raison

```tsx
❌ <Dialog><Dialog>...</Dialog></Dialog> // Nested modals
❌ <DialogContent><p>Texte long...</p></DialogContent> // Pas de titre
❌ <Dialog closeOnEscape={false} closeOnOutsideClick={false} /> // Trap user
```

---

### 5. TABLE

#### ✅ DO
- Headers explicites
- Tri activable (si >10 lignes)
- Pagination (si >50 lignes)
- Actions dans dernière colonne
- Stripe rows pour lisibilité

```tsx
✅ <Table>
     <TableHeader>
       <TableRow>
         <TableHead>Nom</TableHead>
         <TableHead>Email</TableHead>
         <TableHead>Actions</TableHead>
       </TableRow>
     </TableHeader>
     <TableBody>
       {students.map(s => <TableRow key={s.id}>...</TableRow>)}
     </TableBody>
   </Table>
```

#### ❌ DON'T
- Pas de table sans headers
- Pas de table > 100 lignes sans pagination
- Pas de colonnes trop larges (max 200px)

```tsx
❌ <Table><tbody>...</tbody></Table> // Pas de <thead>
❌ {students.map(s => <tr>...</tr>)} // 500 lignes no pagination
```

---

### 6. FORM

#### ✅ DO
- Grouper champs logiquement
- Validation inline
- Auto-save (long forms)
- Progress indicator (multi-step)
- Error summary en haut

```tsx
✅ <Form>
     <div className="space-y-4">
       <FormField name="firstName" />
       <FormField name="lastName" />
     </div>
     <FormField name="email" />
     <Button type="submit">Save</Button>
   </Form>
```

#### ❌ DON'T
- Pas de reset button (confusion)
- Pas de validation qu'au submit
- Pas de formulaires > 10 champs (wizard)

```tsx
❌ <Form>
     <Input />
     <Input />
     ... 20 inputs ...
     <Button>Reset</Button> // Dangereux
   </Form>
```

---

### 7. TOAST / NOTIFICATION

#### ✅ DO
- Durée : 3-5s (succès), 7s (erreur)
- Position cohérente (bottom-right)
- Action optionnelle (Undo)
- Max 1 toast à la fois

```tsx
✅ toast.success("Élève créé !", {
     action: <Button size="sm">Voir</Button>
   });

✅ toast.error("Erreur sauvegarde", {
     description: "Veuillez réessayer.",
     duration: 7000,
   });
```

#### ❌ DON'T
- Pas de toast pour chaque action
- Pas de toast bloquant
- Pas de texte technique

```tsx
❌ toast.info("onClick triggered") // Trop verbeux
❌ toast.error("ERR_500_INTERNAL_SERVER_ERROR") // Cryptique
❌ // 5 toasts simultanés
```

---

### 8. TOOLTIP

#### ✅ DO
- Texte court (< 100 chars)
- Délai 500ms (pas instantané)
- Contraste accessible

```tsx
✅ <Tooltip content="Supprimer définitivement">
     <Button variant="ghost" size="icon">
       <Trash2 className="h-4 w-4" />
     </Button>
   </Tooltip>
```

#### ❌ DON'T
- Pas de tooltip sur mobile (pas de hover)
- Pas de tooltip obligatoire pour compréhension

```tsx
❌ <Tooltip content="Lorem ipsum dolor sit amet..." /> // Trop long
❌ <Button>Btn</Button> // Texte cryptique, tooltip requis = mauvais
```

---

### 9. BADGE / TAG

#### ✅ DO
- Couleur sémantique (success=vert, error=rouge)
- Texte court (1-2 mots)
- Taille cohérente

```tsx
✅ <Badge variant="success">Actif</Badge>
✅ <Badge variant="warning">En attente</Badge>
✅ <Badge variant="destructive">Inactif</Badge>
```

#### ❌ DON'T
- Pas de couleurs random
- Pas de texte long

```tsx
❌ <Badge className="bg-purple-500">Status</Badge> // Pas sémantique
❌ <Badge>Élève en attente de validation administrateur</Badge> // Trop long
```

---

### 10. SELECT / DROPDOWN

#### ✅ DO
- Label explicite
- Placeholder utile
- Options triées (alphabétique ou logique)
- Search si > 10 options

```tsx
✅ <Select>
     <SelectTrigger>
       <SelectValue placeholder="Sélectionner catégorie" />
     </SelectTrigger>
     <SelectContent>
       <SelectItem value="A">Catégorie A (Moto)</SelectItem>
       <SelectItem value="B">Catégorie B (Voiture)</SelectItem>
     </SelectContent>
   </Select>
```

#### ❌ DON'T
- Pas de dropdown >20 options sans search
- Pas d'options non triées

```tsx
❌ <Select>
     <option>Genève</option>
     <option>Zurich</option>
     <option>Berne</option>
     ... 50 options ... // Ajouter search
   </Select>
```

---

## 🎨 RÈGLES GÉNÉRALES

### Couleurs

#### ✅ DO
- Utiliser tokens CSS (`--primary`, `--destructive`)
- Respecter contraste WCAG AA (4.5:1)
- Mode dark cohérent

```tsx
✅ className="bg-primary text-primary-foreground"
✅ className="text-muted-foreground"
```

#### ❌ DON'T
- Pas de couleurs hardcodées
- Pas de texte gris sur gris clair

```tsx
❌ className="bg-[#3b82f6]" // Hardcodé
❌ className="text-gray-400 bg-gray-300" // Contraste insuffisant
```

---

### Spacing

#### ✅ DO
- Utiliser Tailwind spacing scale (4, 8, 12, 16, 24, 32)
- Padding cohérent (Card = p-6, Dialog = p-6)

```tsx
✅ className="space-y-4" // Vertical spacing
✅ className="gap-2" // Grid/Flex gap
```

#### ❌ DON'T
- Pas de valeurs arbitraires sans raison

```tsx
❌ className="mt-[17px]" // Pourquoi 17px ?
✅ className="mt-4" // 16px (standard)
```

---

### Typography

#### ✅ DO
- Hiérarchie claire (h1 > h2 > h3)
- Line-height suffisant (1.5 - 1.75)
- Max-width texte (65ch)

```tsx
✅ <h1 className="text-3xl font-bold">Titre</h1>
✅ <p className="text-base leading-7 max-w-prose">Long text...</p>
```

#### ❌ DON'T
- Pas de ALL CAPS sans raison
- Pas de texte trop long sans breaks

```tsx
❌ <h1 className="uppercase">TITRE EN MAJUSCULES</h1> // Difficile à lire
❌ <p className="w-full">Very long paragraph...</p> // Pas de max-width
```

---

### Responsive

#### ✅ DO
- Mobile-first approach
- Breakpoints Tailwind (sm, md, lg, xl)
- Touch targets ≥ 44px mobile

```tsx
✅ className="flex flex-col md:flex-row"
✅ className="text-sm md:text-base"
✅ <Button className="h-11 md:h-9"> // Touch-friendly mobile
```

#### ❌ DON'T
- Pas de desktop-only features critiques
- Pas de touch targets < 44px

```tsx
❌ className="hidden md:block" // Feature critique cachée mobile
❌ <button className="h-6 w-6" /> // 24px trop petit mobile
```

---

### Accessibilité

#### ✅ DO
- Alt text images
- ARIA labels éléments interactifs
- Keyboard navigation complète
- Focus visible

```tsx
✅ <img src="..." alt="Photo élève Kevin Weber" />
✅ <button aria-label="Supprimer élève">
     <Trash2 />
   </button>
✅ className="focus:ring-2 focus:ring-primary"
```

#### ❌ DON'T
- Pas de `alt=""` sur images informatives
- Pas d'actions sans label
- Pas de focus invisible

```tsx
❌ <img src="student.jpg" /> // Pas d'alt
❌ <div onClick={handleDelete}><Trash2 /></div> // Pas de button, pas d'aria
❌ className="outline-none" // Focus invisible
```

---

## ✅ CHECKLIST AVANT PR

- [ ] Composant conforme Do/Don't
- [ ] Responsive testé (mobile/tablet/desktop)
- [ ] Accessibilité vérifiée (clavier, screen reader)
- [ ] Storybook story créée
- [ ] Tokens CSS utilisés (pas hardcodé)
- [ ] Dark mode vérifié

---

_Guidelines créées le 28 octobre 2025 - Living document_

