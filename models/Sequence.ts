/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-23 13:50:50
 * @modify date 2021-07-23 13:50:50
 * @desc [description]
 */
export interface SeqStat {
  Reads: number;
  Yield: number;
  GeeCee: number;
  MinLen: number;
  AvgLen: number;
  MaxLen: number;
  AvgQual: number;
  ErrQual: number;
  Ambiguous: number;
}

export interface FlatSequence {
  id: string;
  TaxID: number;
  ScientificName: string;
  seqtype: string;
  Experiment: string;
  LibraryName: string;
  LibraryStrategy: string;
  LibrarySelection: string;
  LibrarySource: string;
  LibraryLayout: string;
  InsertSize: number;
  InsertDev: number;
  Platform: string;
  SequencerModel: string;
  Projectid: string;
  SampleName: string;
  CenterName: string;
  taxName_1: string;
  taxFrac_1: number;
  taxName_2: string;
  taxFrac_2: number;
  taxName_3: string;
  taxFrac_3: number;
  taxName_4: string;
  taxFrac_4: number;
  owner: string; // need to check
  DateCreated: string;
  LastUpdate: string;
  Description: string;
  RawStats__Reads: number;
  RawStats__Yield: number;
  RawStats__GeeCee: number;
  RawStats__MinLen: number;
  RawStats__AvgLen: number;
  RawStats__MaxLen: number;
  RawStats__AvgQual: number;
  RawStats__ErrQual: number;
  RawStats__Ambiguous: number;
  QcStats__Reads: number;
  QcStats__Yield: number;
  QcStats__GeeCee: number;
  QcStats__MinLen: number;
  QcStats__AvgLen: number;
  QcStats__MaxLen: number;
  QcStats__AvgQual: number;
  QcStats__ErrQual: number;
  QcStats__Ambiguous: number;
}
