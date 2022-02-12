/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-23 16:06:40
 * @modify date 2021-07-23 16:06:40
 * @desc [description]
 */

import { getValueFormatter } from "@nivo/core";
import { API } from "../../../../config/apis";
import { DATE_FORMAT, VIRULOME_LEGEND_POINT, RESISTOME_LEGEND_POINT } from "../../../../config/etc";
import {
  CUSTOM_HEADER_ANNOTATION,
  CUSTOM_HEADER_ASSEMBLY,
  CUSTOM_HEADER_STATS,
  CUSTOM_HEADER_MLST,
  CUSTOM_HEADER_PSUMMARY,
  CUSTOM_HEADER_RESISTOME,
  CUSTOM_HEADER_SEQUENCE,
  CUSTOM_HEADER_VIRULOME,
} from "../../../../config/headers";
import {
  FlatAnnotationWithAttr,
  FlatAssembly,
  FlatStats,
  FlatMLSTWithProfile,
  FlatPsummary,
  FlatResistomeWithProfile,
  FlatVirulomeWithProfile,
} from "../../../../models/Isolate";
import { FlatSequence } from "../../../../models/Sequence";
import {
  JIYHeaderContext,
  JIYHeaderDisplay,
  JIYOrderingContext,
  JIYRecordContext,
  JIYTabularDataContext,
  JIYURLContext,
} from "../models/JIYContexts";

function sortStrings(a: string, b: string) {
  a = a.toLowerCase();
  b = b.toLowerCase();
  return a > b ? 1 : (a < b ? -1 : 0);
}

/**
 * URLHandler
 * @param uri - URI
 * @param query - field
 * @param module - seqtype
 * @param search - search
 * @param page - page
 * @param pageSize - page_size
 * @param ordering - ordering
 * @returns - See {@link JIYURLContext}
 */
export function URLHandler(
  uri: string,
  query?: string,
  module?: string,
  search?: string,
  page?: number,
  pageSize?: number,
  ordering?: JIYOrderingContext
): JIYURLContext {
  const URI = uri + "?";

  let url = API + URI;
  
  if (query !== undefined && query !== null && query !== "") {
    //console.log("i am in handler.ts query=" + query)
    url = url + query;
  }
  if (module !== undefined && module !== null && module !== "") {
    url = url + "&seqtype=" + module;
  }
  if (search !== undefined && search !== null && search !== "") {
    url = url + "&search=" + search;
  }
  if (page !== undefined && page !== null && page !== 0) {
    url = url + "&page=" + page;
  }
  if (pageSize !== undefined && page !== null && pageSize !== 0) {
    url = url + "&page_size=" + pageSize;
  }
  if (ordering !== undefined && ordering !== null) {
    const orderingOn = ordering.column;
    if (ordering.direction === "ascending") {
      url = url + "&ordering=" + orderingOn;
    } else {
      url = url + "&ordering=-" + orderingOn;
    }
  }
  
  //console.log(API, uri, url, module)
  return {
    api: API,
    uri: uri,
    url: url,
  };
}

/**
 * SequenceDataHandler
 * @param results - Array of FlatSequence. See {@link FlatSequence}
 * @returns - See {@link JIYTabularDataContext}
 */
export function SequencesDataHandler(
  results: Array<FlatSequence>,
  invertSelection: boolean
): JIYTabularDataContext<FlatSequence> {
  const schema: Array<JIYHeaderContext> = Object.entries(
    CUSTOM_HEADER_SEQUENCE
  ).map(([, value]) => {
    return {
      name: value.name,
      value: value.value,
      alias: value.alias,
      display: value.display as JIYHeaderDisplay,
      primary: value.primary,
    };
  });

  const customized = results.map((obj) => {
    return {
      ...obj,
      DateCreated: new Date(obj.DateCreated).toLocaleDateString(
        "en-US",
        DATE_FORMAT
      ),
      LastUpdate: new Date(obj.LastUpdate).toLocaleDateString(
        "en-US",
        DATE_FORMAT
      ),
    } as FlatSequence;
  });

  const standard = schema.map((obj) => obj.value);
  const rearranged = customized.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    )
  );

  const data: Array<JIYRecordContext<FlatSequence>> = rearranged.map(
    (flatSequences: FlatSequence): JIYRecordContext<FlatSequence> => ({
      objType: "sequence",
      dynamicColumns: false,
      isSelected: invertSelection,
      data: flatSequences,
    })
    );

  return {
    headers: schema,
    records: data,
  };
}

/**
 * AssemblyDataHandler
 * @param results - Array of FlatAssembly. See {@link FlatAssembly}
 * @returns - See {@link JIYTabularDataContext}
 */
export function AssemblyDataHandler(
  results: Array<FlatAssembly>,
  invertSelection: boolean
): JIYTabularDataContext<FlatAssembly> {
  const schema: Array<JIYHeaderContext> = Object.entries(
    CUSTOM_HEADER_ASSEMBLY
  ).map(([, value]) => {
    return {
      name: value.name,
      value: value.value,
      alias: value.alias,
      display: value.display as JIYHeaderDisplay,
      primary: value.primary,
    };
  });

  const customized = results.map((obj) => {
    return {
      ...obj,
      DateCreated: new Date(obj.DateCreated).toLocaleDateString(
        "en-US",
        DATE_FORMAT
      ),
      LastUpdate: new Date(obj.LastUpdate).toLocaleDateString(
        "en-US",
        DATE_FORMAT
      ),
    } as FlatAssembly;
  });

  const standard = schema.map((obj) => obj.value);
  const rearranged = customized.map((obj) => {
    return Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    );
  });

  const data: Array<JIYRecordContext<FlatAssembly>> = rearranged.map(
    (flatAssembly: FlatAssembly): JIYRecordContext<FlatAssembly> => ({
      objType: "assembly",
      dynamicColumns: false,
      isSelected: invertSelection,
      data: flatAssembly,
    })
  );

  return {
    headers: schema,
    records: data,
  };
}


/**
 * StatsDataHandler
 * @param results - Array of FlatStats. See {@link FlatStats}
 * @returns - See {@link JIYTabularDataContext}
 */
 export function StatsDataHandler(
  results: Array<FlatStats>,
  invertSelection: boolean
): JIYTabularDataContext<FlatStats> {
  const schema: Array<JIYHeaderContext> = Object.entries(
    CUSTOM_HEADER_STATS
  ).map(([, value]) => {
    return {
      name: value.name,
      value: value.value,
      alias: value.alias,
      display: value.display as JIYHeaderDisplay,
      primary: value.primary,
    };
  });

  const customized = results.map((obj) => {
    return {
      ...obj,
      DateCreated: new Date(obj.DateCreated).toLocaleDateString(
        "en-US",
        DATE_FORMAT
      ),
      LastUpdate: new Date(obj.LastUpdate).toLocaleDateString(
        "en-US",
        DATE_FORMAT
      ),
    } as FlatStats;
  });

  const standard = schema.map((obj) => obj.value);
  const rearranged = customized.map((obj) => {
    return Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    );
  });

  const data: Array<JIYRecordContext<FlatStats>> = rearranged.map(
    (flatStats: FlatStats): JIYRecordContext<FlatStats> => ({
      objType: "stats",
      dynamicColumns: false,
      isSelected: invertSelection,
      data: flatStats,
    })
  );

  return {
    headers: schema,
    records: data,
  };
}

/**
 * AnnotationDataHandler
 * @param results - Array of FlatAnnotation. See {@link FlatAnnotation}
 * @returns - See {@link JIYTabularDataContext}
 */
export function AnnotationDataHandler(
  results: Array<FlatAnnotationWithAttr>,
  invertSelection: boolean
): JIYTabularDataContext<FlatAnnotationWithAttr> {
  const schema: Array<JIYHeaderContext> = Object.entries(
    CUSTOM_HEADER_ANNOTATION
  ).map(([, value]) => {
    return {
      name: value.name,
      value: value.value,
      alias: value.alias,
      display: value.display as JIYHeaderDisplay,
      primary: value.primary,
    };
  });

  const keyset = Array.from(
    new Set(
      [].concat(
        ...results.map((obj) => {
          return obj.attr.map((o) => o.tag);
        })
      )
    )
  );

  keyset.forEach((key) =>
    schema.push({
      name: key,
      value: key,
      alias: key,
      display: "visible" as JIYHeaderDisplay,
      primary: false,
    })
  );

  const customized = results.map((obj) => {
    keyset.forEach((key) => {
      obj[key] = obj.attr.find((o) => o.tag === key)
        ? obj.attr.find((o) => o.tag === key).value
        : "-";
    });

    return {
      ...obj,
      DateCreated: new Date(obj.DateCreated).toLocaleDateString(
        "en-US",
        DATE_FORMAT
      ),
      LastUpdate: new Date(obj.LastUpdate).toLocaleDateString(
        "en-US",
        DATE_FORMAT
      ),
    } as FlatAnnotationWithAttr;
  });

  const standard = schema.map((obj) => obj.value);
  const rearranged = customized.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    )
  );

  const data: Array<JIYRecordContext<FlatAnnotationWithAttr>> = rearranged.map(
    (flatAnnotationWithAttr: FlatAnnotationWithAttr): JIYRecordContext<FlatAnnotationWithAttr> => {
      return {
        objType: "annotation",
        dynamicColumns: true,
        isSelected: invertSelection,
        data: flatAnnotationWithAttr,
      };
    }
  );

  return {
    headers: schema,
    records: data,
  };
}

/**
 *MLSTDataHandler
 * @param results - Array of FlatMLST. See {@link FlatMLST}
 * @returns - See {@link JIYTabularDataContext}
 */
export function MLSTDataHandler(
  results: Array<FlatMLSTWithProfile>,
  invertSelection: boolean
): JIYTabularDataContext<FlatMLSTWithProfile> {
  const schema: Array<JIYHeaderContext> = Object.entries(
    CUSTOM_HEADER_MLST
  ).map(([, value]) => {
    return {
      name: value.name,
      value: value.value,
      alias: value.alias,
      display: value.display as JIYHeaderDisplay,
      primary: value.primary,
    };
  });
  
  const keyset = Array.from( 
    new Set(
      [].concat(
        ...results.map((obj) => {
          return obj.profile.map((o) => o.locus);
        })
      )
    )
  ).sort();
  
keyset.forEach((key) =>
    schema.push({
      name: key,
      value: key,
      alias: "Allele",
      display: "visible" as JIYHeaderDisplay,
      primary: false,
    })
  );
  

  const customized = results.map((obj) => {
    keyset.forEach((key) => {
      const pf = obj.profile.find((o) => o.locus === key);
      //const value = obj.profile.find((o) => o.locus === key).allele;
      if(pf){
        const value = pf.allele;
        obj[key] = value.split("_")[0] + "(" + value.split("_")[1] + ")";
        //obj[key] = pf ? value.split("_")[0] + "(" + value.split("_")[1] + ")" : "-";
      }
      else{
        obj[key] = "-"
      }
    });

    return {
      ...obj,
      DateCreated: new Date(obj.DateCreated).toLocaleDateString(
        "en-US",
        DATE_FORMAT
      ),
      LastUpdate: new Date(obj.LastUpdate).toLocaleDateString(
        "en-US",
        DATE_FORMAT
      ),
    } as FlatMLSTWithProfile;
  });

  const standard = schema.map((obj) => obj.value);
  const rearranged = customized.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    )
  );

  const data: Array<JIYRecordContext<FlatMLSTWithProfile>> = rearranged.map(
    (
      flatMLSTWithProfile: FlatMLSTWithProfile
    ): JIYRecordContext<FlatMLSTWithProfile> => ({
      objType: "mlst",
      dynamicColumns: true,
      isSelected: invertSelection,
      data: flatMLSTWithProfile,
    })
  );

  return {
    headers: schema,
    records: data,
  };
}

/**
 *
 * @param results - Array of FlatResistome. See {@link FlatResistome}
 * @returns - See {@link JIYTabularDataContext}
 */
export function ResistomeDataHandler(
  results: Array<FlatResistomeWithProfile>,
  invertSelection: boolean
): JIYTabularDataContext<FlatResistomeWithProfile> {
  const schema: Array<JIYHeaderContext> = Object.entries(
    CUSTOM_HEADER_RESISTOME
  ).map(([, value]) => {
    return {
      name: value.name,
      value: value.value,
      alias: value.alias,
      display: value.display as JIYHeaderDisplay,
      primary: value.primary,
    };
  });

  const keyset = Array.from(
    new Set(
      [].concat(
        ...results.map((obj) => {
          return obj.profile.map((o) => o.geneName);
        })
      )
    )
  ).sort();
  // console.log("print keyset..............................")
  // console.log(keyset)
  
  keyset.forEach((key) =>
    schema.push({
      name: key,
      value: key,
      alias: key,
      display: "visible" as JIYHeaderDisplay,
      primary: false,
    })
  );

  const customized = results.map((obj) => {
    
    keyset.forEach((key) => {
      const v = obj.profile.find((o) => o.geneName === key);
      obj[key] = v
        ? {
            value: v.dclass,
            style:
              v.pctCoverage == -1 || v.pctCoverage == -1.0
                ? "ebs-resistome-absent"
                : v.pctCoverage >= RESISTOME_LEGEND_POINT
                ? "ebs-resistome-ge"
                : "ebs-resistome-lt",
          }
        : {
          value: "-",
          style: "ebs-resistome-absent",
        }
        
    });

    return {
      ...obj,
      DateCreated: new Date(obj.DateCreated).toLocaleDateString(
        "en-US",
        DATE_FORMAT
      ),
      LastUpdate: new Date(obj.LastUpdate).toLocaleDateString(
        "en-US",
        DATE_FORMAT
      ),
    } as FlatResistomeWithProfile;
  });

  const standard = schema.map((obj) => obj.value);
  const rearranged = customized.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    )
  );

  const data: Array<JIYRecordContext<FlatResistomeWithProfile>> =
    rearranged.map(
      (
        FlatResistomeWithProfile: FlatResistomeWithProfile
      ): JIYRecordContext<FlatResistomeWithProfile> => ({
        objType: "resistome",
        dynamicColumns: true,
        isSelected: invertSelection,
        data: FlatResistomeWithProfile,
      })
    );

  return {
    headers: schema,
    records: data,
  };
}

/**
 * VirulomeDataHandler
 * @param results - Array of FlatVirulome. See {@link FlatVirulome}
 * @returns - See {@link JIYTabularDataContext}
 */
export function VirulomeDataHandler(
  results: Array<FlatVirulomeWithProfile>,
  invertSelection: boolean
): JIYTabularDataContext<FlatVirulomeWithProfile> {
  const schema: Array<JIYHeaderContext> = Object.entries(
    CUSTOM_HEADER_VIRULOME
  ).map(([, value]) => {
    return {
      name: value.name,
      value: value.value,
      alias: value.alias,
      display: value.display as JIYHeaderDisplay,
      primary: value.primary,
    };
  });

  const keyset = Array.from(
    new Set(
      [].concat(
        ...results.map((obj) => {
          return obj.profile.map((o) => o.geneName);
        })
      )
    )
  );//.sort(sortStrings);


  keyset.forEach((key) =>
    schema.push({
      name: key,
      value: key,
      alias: key,
      display: "visible" as JIYHeaderDisplay,
      primary: false,
    })
  );

  const customized = results.map((obj) => {
    keyset.forEach((key) => {
      const v = obj.profile.find((o) => o.geneName === key);
      
      obj[key] = v
        ? {
            value: v.pctCoverage == -1 || v.pctCoverage == -1.0 ? "-" : v.pctCoverage,
            style:
              v.pctCoverage == -1
                ? "ebs-virulome-absent"
                : v.pctCoverage >= VIRULOME_LEGEND_POINT
                ? "ebs-virulome-ge"
                : "ebs-virulome-lt",
          }
        : {
          value: "-",
          style: "ebs-virulome-absent",
        }
        console.log("print keyset *********************************************")
        console.log(key)
        console.log(obj[key])
        
    }
    
   
    );
   
    return {
      ...obj,
      DateCreated: new Date(obj.DateCreated).toLocaleDateString(
        "en-US",
        DATE_FORMAT
      ),
      LastUpdate: new Date(obj.LastUpdate).toLocaleDateString(
        "en-US",
        DATE_FORMAT
      ),
    } as FlatVirulomeWithProfile;
  });

  const standard = schema.map((obj) => obj.value);
  const rearranged = customized.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    )
  );

  const data: Array<JIYRecordContext<FlatVirulomeWithProfile>> = rearranged.map(
    (
      flatVirulomeWithProfile: FlatVirulomeWithProfile
    ): JIYRecordContext<FlatVirulomeWithProfile> => {
      return {
        objType: "virulome",
        dynamicColumns: true,
        isSelected: invertSelection,
        data: flatVirulomeWithProfile,
      };
    }
  );

  return {
    headers: schema,
    records: data,
  };
}

/**
 * ProfileSummaryDataHandler
 * @param results - Array of FlatPSummary. See {@link FlatPSummary}
 * @returns - See {@link JIYTabularDataContext}
 */
export function ProfileSummaryDataHandler(
  results: Array<FlatPsummary>,
  invertSelection: boolean
): JIYTabularDataContext<FlatPsummary> {
  const schema: Array<JIYHeaderContext> = Object.entries(
    CUSTOM_HEADER_PSUMMARY
  ).map(([, value]) => {
    return {
      name: value.name,
      value: value.value,
      alias: value.alias,
      display: value.display as JIYHeaderDisplay,
      primary: value.primary,
    };
  });
  const drugs =  [
    'rifampicin', 
    'isoniazid', 
    'pyrazinamide', 
    'ethambutol', 
    'streptomycin',  
    'fluoroquinolones', 
    'moxifloxacin',
    'ofloxacin', 
    'levofloxacin',
     'ciprofloxacin', 
     'aminoglycosides', 
     'amikacin', 
    'kanamycin',
    'capreomycin',
    'ethionamide',
    'para_aminosalicylic_acid',
    'cycloserine',
    'linezolid',
    'bedaquiline',
    'clofazimine',
    'delamanid'
  ]
  //const drugs = ['amikacin', 'aminoglycosides']
  const customized = results.map((obj) => {
  //  console.log("pppppppppppppppppppppppppppppppppppp")
  //   console.log(obj)

    drugs.forEach((key) => {
      const v = obj[key]
      obj[key] = v
        ? {
            value: v,
            style:
              v == '-'
                ? "ebs-drug_resistance-absent"
                : "ebs-drup_resistance-show"
              
          }
        : {
          value: "-",
          style: "ebs-resistome-absent",
        }
        
    });

    return {
      ...obj,
      DateCreated: new Date(obj.DateCreated).toLocaleDateString(
        "en-US",
        DATE_FORMAT
      ),
      LastUpdate: new Date(obj.LastUpdate).toLocaleDateString(
        "en-US",
        DATE_FORMAT
      ),
    } as FlatPsummary;
  });

  const standard = schema.map((obj) => obj.value);
  const rearranged = customized.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).sort(
        (a, b) => standard.indexOf(a[0]) - standard.indexOf(b[0])
      )
    )
  );

  const data: Array<JIYRecordContext<FlatPsummary>> = rearranged.map(
    (flatPsummary: FlatPsummary): JIYRecordContext<FlatPsummary> => ({
      objType: "psummary",
      dynamicColumns: false,
      isSelected: invertSelection,
      data: flatPsummary,
    })
  );

  return {
    headers: schema,
    records: data,
  };
}
