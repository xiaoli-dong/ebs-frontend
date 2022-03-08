/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-25 16:19:49
 * @modify date 2021-07-25 16:19:49
 * @desc [description]
 */
// export const API = "https://microgenomics-test.ucalgary.ca";
export const API = "http://localhost:8000";

// Account
export const API_LOGIN = "/api/account/login";
export const API_LOGOUT = "/api/account/logout";
export const API_REGISTER = "/api/account/register";
export const API_ACCOUNT = "/api/account/account";
export const API_ACCOUNT_DELETE = "/api/account/account/delete";

// Sequence
export const API_SEQUENCE = "/api/seq/sequence";
export const API_SEQUENCE_DETAIL = "/api/seq/sequence/";
export const API_SEQUENCE_METADATA = "/api/seq/sequence/metadata";

// Isolate
export const API_ASSEMBLY = "/api/isolate/assembly";
export const API_ASSEMBLY_METADATA = "/api/isolate/assembly/metadata";
export const API_STATS = "/api/isolate/stats";
export const API_STATS_METADATA = "/api/isolate/stats/metadata";
export const API_ANNOTATION = "/api/isolate/annot";
export const API_ANNOTATION_METADATA = "/api/isolate/annot/metadata";
export const API_MLST = "/api/isolate/mlst";
export const API_MLST_METADATA = "/api/isolate/mlst/metadata";
export const API_RESISTOME = "/api/isolate/resistome";
export const API_RESISTOME_METADATA = "/api/isolate/resistome/metadata";
export const API_VIRULOME = "/api/isolate/virulome";
export const API_VIRULOME_METADATA = "/api/isolate/virulome/metadata";
export const API_PLASMID = "/api/isolate/plasmid";
export const API_PLASMID_METADATA = "/api/isolate/plasmid/metadata";
export const API_TB_SUMMARY = "/api/isolate/tbprofilesummary";
export const API_TB_SUMMARY_METADATA = "/api/isolate/tbprofilesummary/metadata";
export const API_TB_PROFILE = "/api/isolate/tbprofile";

//Metagenomes
export const API_MSEQUENCE = "/api/mseq/sequence";
export const API_MSEQUENCE_DETAIL = "/api/mseq/sequence/";
export const API_MSEQUENCE_METADATA = "/api/mseq/sequence/metadata";
