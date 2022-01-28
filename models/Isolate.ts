/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-08-25 08:49:44
 * @modify date 2021-08-25 08:49:44
 * @desc [description]
 */

export interface Pipeline {
  assembler: string;
  variant_caller: string;
}

export interface FlatAssembly {
  id: string;
  sequence: string;
  owner: string;
  sequence__project__id: string;
  sequence__project__title: string;
  sequence__LibrarySource: string;
  sequence__LibraryLayout: string;
  sequence__SequencerModel: string;
  sequence__CenterName: string;
  seqtype: string;
  count: number;
  bp: number;
  Ns: number;
  gaps: number;
  min: number;
  max: number;
  avg: number;
  N50: number;
  DateCreated: string;
  LastUpdate: string;
  Description: string;
}
export interface FlatStats {
  id: string;
  owner: string;
  assembly: string;
  assembly__sequence__project__id: string;
  assembly__sequence__project__title: string;
  assembly__sequence__LibrarySource: string;
  assembly__sequence__LibraryLayout: string;
  assembly__sequence__SequencerModel: string;
  assembly__sequence__CenterName: string;
  seqtype: string;
  CDS: number;
  CRISPR: number;
  ncRNA: number;
  oriC: number;
  rRNA: number;
  region: number;
  regulatory_region: number;
  tRNA: number;
  tmRNA: number;
  DateCreated: string;
  LastUpdate: string;
  Description: string;
}

export interface Allele {
  locus: string;
  allele: string;
}

export interface FlatMLSTWithProfile {
  id: string;
  owner: string;
  assembly: string;
  assembly__sequence__project__id: string; //need to check
  assembly__sequence__project__title: null; //need to check
  assembly__sequence__LibrarySource: null; //need to check
  assembly__sequence__LibraryLayout: null; //need to check
  assembly__sequence__SequencerModel: null; //need to check
  assembly__sequence__CenterName: null; //need to check
  seqtype: string;
  scheme: string;
  st: number;
  DateCreated: string;
  LastUpdate: string;
  Description: string;
  profile: Array<Allele>;
}

export interface GeneCoverage {
  geneName: string;
  pctCoverage: number;
}
export interface Amr {
  geneName: string;
  sequenceName: string;
  scope: string;
  elementType: string;
  dclass: string;
  method: string;
  pctCoverage: number;
  pctIdentity: number;
}

// export interface Virulence {}

export interface FlatResistomeWithProfile {
  id: string;
  owner: string;
  assembly: string;
  assembly__sequence__project__id: string; //need to check
  assembly__sequence__project__title: string; //need to check
  assembly__sequence__LibrarySource: string;
  assembly__sequence__LibraryLayout: string;
  assembly__sequence__SequencerModel: string;
  assembly__sequence__CenterName: string;
  seqtype: string;
  num_found: number;
  DateCreated: string;
  LastUpdate: string;
  Description: string;
  profile: Array<Amr>;
}

export interface FlatVirulomeWithProfile {
  id: string;
  owner: string;
  assembly: string;
  assembly__sequence__project__id: string; //need to check
  assembly__sequence__project__title: string; //need to check
  assembly__sequence__LibrarySource: string;
  assembly__sequence__LibraryLayout: string;
  assembly__sequence__SequencerModel: string;
  assembly__sequence__CenterName: string;
  seqtype: string;
  num_found: number;
  DateCreated: string;
  LastUpdate: string;
  Description: string;
  profile: Array<GeneCoverage>;
}

export interface Attribute {
  tag: string;
  value: string;
}

export interface FlatAnnotationWithAttr {
  id: string;
  owner: string;
  assembly: string;
  assembly__sequence__project__id: string; // need to check
  assembly__sequence__project__title: string; // need to check
  assembly__sequence__LibrarySource: string;
  assembly__sequence__LibraryLayout: string;
  assembly__sequence__SequencerModel: string;
  assembly__sequence__CenterName: string;
  seqid: string;
  source: string;
  ftype: string;
  start: number;
  end: number;
  score: string;
  strand: string;
  phase: string;
  seqtype: string;
  DateCreated: string;
  LastUpdate: string;
  Description: string;
  attr: Array<Attribute>;
}

export interface FlatPsummary {
  id: string;
  sequence: string;
  owner: string;

  project__id: string;
  project__title: string;
  sequence__LibrarySource: string;
  sequence__LibraryLayout: string;
  sequence__SequencerModel: string;
  sequence__CenterName: string;

  pct_reads_mapped: number;
  num_reads_mapped: number;
  main_lin: string;
  sublin: string;
  num_dr_variants: number;
  num_other_variants: number;
  drtype: string;

  //Drugs
  rifampicin: string;
  isoniazid: string;
  pyrazinamide: string;
  ethambutol: string;
  streptomycin: string;
  fluoroquinolones: string;
  moxifloxacin: string;
  ofloxacin: string;
  levofloxacin: string;
  ciprofloxacin: string;
  aminoglycosides: string;
  amikacin: string;
  kanamycin: string;
  capreomycin: string;
  ethionamide: string;
  para_aminosalicylic_acid: string;
  cycloserine: string;
  linezolid: string;
  bedaquiline: string;
  clofazimine: string;
  delamanid: string;

  DateCreated: string;
  LastUpdate: string;
  Description: string;
}

export interface Lineage {
  lin: string;
  frac: string;
  family: string;
  spoligotype: string;
  rd: string;
}

export interface Variant {
  chr: string;
  genome_pos: string;
  type: string;
  change: string;
  freq: number;
  nucleotide_change: string;
  locus_tag: string;
  gene: string;
  _internal_change: string;
}

export interface Resistance {
  drug: string;
  mutations: string;
}

export interface Profile {
  id: string;
  sequence: string;
  pct_reads_mapped: number;
  num_reads_mapped: number;
  main_lin: string;
  sublin: string;
  num_dr_variants: number;
  num_other_variants: number;
  drtype: string;
  lineage: Array<Lineage>;
  dr_resistances: Array<Resistance>;
  dr_variants: Array<Variant>;
  other_variants: Array<Variant>;
  owner: string;
  DateCreated: string;
  LastUpdate: string;
  Description: string;
}
