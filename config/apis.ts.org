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
export const API_ASSEMBLY = "/api/isolate/gbase/assembly";
export const API_ASSEMBLY_METADATA = "/api/isolate/gbase/assembly/metadata";
export const API_ANNOTATION = "/api/isolate/gbase/annot";
export const API_ANNOTATION_METADATA = "/api/isolate/gbase/annot/metadata";
export const API_MLST = "/api/isolate/gbase/mlst";
export const API_MLST_METADATA = "/api/isolate/gbase/mlst/metadata";
export const API_RESISTOME = "/api/isolate/gbase/resistome";
export const API_RESISTOME_METADATA = "/api/isolate/gbase/resistome/metadata";
export const API_VIRULOME = "/api/isolate/gbase/virulome";
export const API_VIRULOME_METADATA = "/api/isolate/gbase/virulome/metadata";
export const API_TB_SUMMARY = "/api/isolate/tb/summary";
export const API_TB_SUMMARY_METADATA = "/api/isolate/tb/summary/metadata";
export const API_TB_PROFILE = "/api/isolate/tb/profile";
