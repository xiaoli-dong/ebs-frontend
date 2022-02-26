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
  seqstat__r_Reads: number;
  seqstat__r_Yield: number;
  seqstat__r_GeeCee: number;
  seqstat__r_MinLen: number;
  seqstat__r_AvgLen: number;
  seqstat__r_MaxLen: number;
  seqstat__r_AvgQual: number;
  seqstat__r_ErrQual: number;
  seqstat__r_Ambiguous: number;
  seqstat__q_Reads: number;
  seqstat__q_Yield: number;
  seqstat__q_GeeCee: number;
  seqstat__q_MinLen: number;
  seqstat__q_AvgLen: number;
  seqstat__q_MaxLen: number;
  seqstat__q_AvgQual: number;
  seqstat__q_ErrQual: number;
  seqstat__q_Ambiguous: number;
}
