import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Annuaire {
  @PrimaryColumn({ name: 'identifiant_de_l_etablissement' })
  identifiantDeLEtablissement: string;
  @Column({ name: 'nom_etablissement' })
  nomEtablissement: string;
  @Column({ name: 'type_etablissement' })
  typeEtablissement: string;
  @Column({ name: 'statut_public_prive' })
  statutPublicPrive: string;
  @Column({ name: 'adresse_1' })
  adresse1: string;
  @Column({ name: 'adresse_2' })
  adresse2: string;
  @Column({ name: 'adresse_3' })
  adresse3: string;
  @Column({ name: 'code_postal' })
  codePostal: string;
  @Column({ name: 'code_commune' })
  codeCommune: string;
  @Column({ name: 'nom_commune' })
  nomCommune: string;
  @Column({ name: 'code_departement' })
  codeDepartement: string;
  @Column({ name: 'code_academie' })
  codeAcademie: string;
  @Column({ name: 'code_region' })
  codeRegion: string;
  @Column({ name: 'ecole_maternelle' })
  ecoleMaternelle: string;
  @Column({ name: 'ecole_elementaire' })
  ecoleElementaire: string;
  @Column({ name: 'voie_generale' })
  voieGenerale: string;
  @Column({ name: 'voie_technologique' })
  voieTechnologique: string;
  @Column({ name: 'voie_professionnelle' })
  voieProfessionnelle: string;
  @Column({ name: 'telephone' })
  telephone: string;
  @Column({ name: 'fax' })
  fax: string;
  @Column({ name: 'web' })
  web: string;
  @Column({ name: 'mail' })
  mail: string;
  @Column({ name: 'restauration' })
  restauration: string;
  @Column({ name: 'hebergement' })
  hebergement: string;
  @Column({ name: 'ulis' })
  ulis: string;
  @Column({ name: 'apprentissage' })
  apprentissage: string;
  @Column({ name: 'segpa' })
  segpa: string;
  @Column({ name: 'section_arts' })
  sectionArts: string;
  @Column({ name: 'section_cinema' })
  sectionCinema: string;
  @Column({ name: 'section_theatre' })
  sectionTheatre: string;
  @Column({ name: 'section_sport' })
  sectionSport: string;
  @Column({ name: 'section_internationale' })
  sectionInternationale: string;
  @Column({ name: 'section_europeenne' })
  sectionEuropeenne: string;
  @Column({ name: 'lycee_agricole' })
  lyceeAgricole: string;
  @Column({ name: 'lycee_militaire' })
  lyceeMilitaire: string;
  @Column({ name: 'lycee_des_metiers' })
  lyceeDesMetiers: string;
  @Column({ name: 'post_bac' })
  postBac: string;
  @Column({ name: 'appartenance_education_prioritaire' })
  appartenanceEducationPrioritaire: string;
  @Column({ name: 'greta' })
  greta: string;
  @Column({ name: 'siren_siret' })
  sirenSiret: string;
  @Column({ name: 'nombre_d_eleves' })
  nombreDEleves: string;
  @Column({ name: 'fiche_onisep' })
  ficheOnisep: string;
  @Column({ name: 'position' })
  position: string;
  @Column({ name: 'type_contrat_prive' })
  typeContratPrive: string;
  @Column({ name: 'libelle_departement' })
  libelleDepartement: string;
  @Column({ name: 'libelle_academie' })
  libelleAcademie: string;
  @Column({ name: 'libelle_region' })
  libelleRegion: string;
  @Column({ name: 'coordx_origine' })
  coordxOrigine: string;
  @Column({ name: 'coordy_origine' })
  coordyOrigine: string;
  @Column({ name: 'epsg_origine' })
  epsgOrigine: string;
  @Column({ name: 'nom_circonscription' })
  nomCirconscription: string;
  @Column({ name: 'latitude' })
  latitude: string;
  @Column({ name: 'longitude' })
  longitude: string;
  @Column({ name: 'precision_localisation' })
  precisionLocalisation: string;
  @Column({ name: 'date_ouverture' })
  dateOuverture: string;
  @Column({ name: 'date_maj_ligne' })
  dateMajLigne: string;
  @Column({ name: 'etat' })
  etat: string;
  @Column({ name: 'ministere_tutelle' })
  ministereTutelle: string;
  @Column({ name: 'multi_uai' })
  multiUai: string;
  @Column({ name: 'rpi_concentre' })
  rpiConcentre: string;
  @Column({ name: 'rpi_disperse' })
  rpiDisperse: string;
  @Column({ name: 'code_nature' })
  codeNature: string;
  @Column({ name: 'libelle_nature' })
  libelleNature: string;
  @Column({ name: 'code_type_contrat_prive' })
  codeTypeContratPrive: string;
  @Column({ name: 'pial' })
  pial: string;
  @Column({ name: 'etablissement_mere' })
  etablissementMere: string;
  @Column({ name: 'type_rattachement_etablissement_mere' })
  typeRattachementEtablissementMere: string;
  @Column({ name: 'code_circonscription' })
  codeCirconscription: string;
  @Column({ name: 'code_zone_animation_pedagogique' })
  codeZoneAnimationPedagogique: string;
  @Column({ name: 'libelle_zone_animation_pedagogique' })
  libelleZoneAnimationPedagogique: string;
  @Column({ name: 'code_bassin_formation' })
  codeBassinFormation: string;
  @Column({ name: 'libelle_bassin_formation' })
  libelleBassinFormation: string;
  @Column({ name: 'annee_scolaire' })
  anneeScolaire: string;
  @Column({ name: 'multi_rythme' })
  multiRythme: string;
  @Column({ name: 'lundi_matin_debut' })
  lundiMatinDebut: string;
  @Column({ name: 'lundi_matin_fin' })
  lundiMatinFin: string;
  @Column({ name: 'lundi_apres_midi_debut' })
  lundiApresMidi_debut: string;
  @Column({ name: 'lundi_apres_midi_fin' })
  lundiApresMidi_fin: string;
  @Column({ name: 'lundi' })
  lundi: string;
  @Column({ name: 'mardi_matin_debut' })
  mardiMatinDebut: string;
  @Column({ name: 'mardi_matin_fin' })
  mardiMatinFin: string;
  @Column({ name: 'mardi_apres_midi_debut' })
  mardiApresMidiDebut: string;
  @Column({ name: 'mardi_apres_midi_fin' })
  mardiApresMidiFin: string;
  @Column({ name: 'mardi' })
  mardi: string;
  @Column({ name: 'mercredi_matin_debut' })
  mercrediMatinDebut: string;
  @Column({ name: 'mercredi_matin_fin' })
  mercrediMatinFin: string;
  @Column({ name: 'mercredi' })
  mercredi: string;
  @Column({ name: 'jeudi_matin_debut' })
  jeudiMatinDebut: string;
  @Column({ name: 'jeudi_matin_fin' })
  jeudiMatinFin: string;
  @Column({ name: 'jeudi_apres_midi_debut' })
  jeudiApresMidiDebut: string;
  @Column({ name: 'jeudi_apres_midi_fin' })
  jeudiApresMidiFin: string;
  @Column({ name: 'jeudi' })
  jeudi: string;
  @Column({ name: 'vendredi_matin_debut' })
  vendrediMatinDebut: string;
  @Column({ name: 'vendredi_matin_fin' })
  vendrediMatinFin: string;
  @Column({ name: 'vendredi_apres_midi_debut' })
  vendrediApresMidiDebut: string;
  @Column({ name: 'vendredi_apres_midi_fin' })
  vendrediApresMidiFin: string;
  @Column({ name: 'vendredi' })
  vendredi: string;
}
