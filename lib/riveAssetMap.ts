export type RiveFitMode = "contain" | "cover" | "layout";

/** Binds a View Model number property to page scroll (0–1 progress → min–max). */
export type RiveViewModelScrollConfig = {
  /** View model name as defined in the Rive file (e.g. "View Model 2"). */
  viewModelName: string;
  /** Number property path on the view model instance (e.g. "stateNum"). */
  stateNumPath?: string;
  /** Multiple number property paths to bind with the same scroll progress. */
  stateNumPaths?: string[];
  /** Per-path min/max ranges (processed in array order when scrolling). */
  stateNumRanges?: Array<{
    path: string;
    min: number;
    max: number;
  }>;
  /** Multiplies scroll distance needed to complete one full sequence. */
  scrollDistanceMultiplier?: number;
  min: number;
  max: number;
};

export type RiveAssetConfig = {
  src: string;
  artboard?: string;
  stateMachine?: string;
  fit?: RiveFitMode;
  /** Enables runtime auto-binding for Rive Data Binding. */
  autoBind?: boolean;
  /** When set, `stateNumPath` is driven by vertical page scroll between min and max. */
  viewModelScroll?: RiveViewModelScrollConfig;
};

export const RIVE_ASSET_MAP = {
  ColumnPC: {
    src: "/rive-files/column/column_pc.riv",
    artboard: "main",
    stateMachine: "State Machine 1",
  },
  ColumnPhone: {
    src: "/rive-files/column/column_phone.riv",
    artboard: "main",
    stateMachine: "State Machine 1",
  },
  CompanyPC: {
    src: "/rive-files/company/company_pc.riv",
    artboard: "main",
    stateMachine: "State Machine 1",
    viewModelScroll: {
      viewModelName: "ViewModel2",
      stateNumPath: "stateNum",
      min: 0,
      max: 150,
    },
  },
  CompanyPhone: {
    src: "/rive-files/company/company_phone.riv",
    artboard: "main",
    stateMachine: "State Machine 1",
    viewModelScroll: {
      viewModelName: "ViewModel2",
      stateNumPath: "stateNum",
      min: 0,
      max: 150,
    },
  },
  ExecutivePC: {
    src: "/rive-files/executive/executive_pc.riv",
    artboard: "main",
    stateMachine: "State Machine 1",
  },
  ExecutivePhone: {
    src: "/rive-files/executive/executive_phone.riv",
    artboard: "main",
    stateMachine: "State Machine 1",
  },
  Interview1PC: {
    src: "/rive-files/interview/interview_1.riv",
    artboard: "main pc",
    stateMachine: "State Machine 1",
  },
  Interview1Phone: {
    src: "/rive-files/interview/interview_1.riv",
    artboard: "main phone",
    stateMachine: "State Machine 1",
  },
  Interview2PC: {
    src: "/rive-files/interview/interview_2.riv",
    artboard: "main pc",
    stateMachine: "State Machine 1",
  },
  Interview2Phone: {
    src: "/rive-files/interview/interview_2.riv",
    artboard: "main phone",
    stateMachine: "State Machine 1",
  },
  MembersPC: {
    src: "/rive-files/member/memebers_pc.riv",
    artboard: "main",
    stateMachine: "stateMachine",
  },
  MembersPhone: {
    src: "/rive-files/member/memebers_phone.riv",
    artboard: "main",
    stateMachine: "stateMachine",
  },
  PhilosophyHeroPC: {
    src: "/rive-files/philosophy/philosphy_hero_pc.riv",
    artboard: "main",
    stateMachine: "State Machine 1",
    viewModelScroll: {
      viewModelName: "ViewModel2",
      stateNumPath: "stateNum",
      min: 0,
      max: 150,
    },
  },
  PhilosophyHeroPhone: {
    src: "/rive-files/philosophy/philosphy_hero_phone.riv",
    artboard: "main",
    stateMachine: "State Machine 1",
    viewModelScroll: {
      viewModelName: "ViewModel2",
      stateNumPath: "stateNum",
      min: 0,
      max: 150,
    },
  },
  VisionMissionValue: {
    src: "/rive-files/philosophy/vision_mission_value.riv",
    artboard: "main",
    stateMachine: "State Machine 1",
    viewModelScroll: {
      viewModelName: "ViewModel1",
      stateNumRanges: [
        { path: "number1", min: 0, max: 200 },
        { path: "number2", min: 0, max: 200 },
        { path: "number3", min: 0, max: 200 },
      ],
      scrollDistanceMultiplier: 2,
      min: 0,
      max: 600,
    },
  },
  VisionMissionValuePhone: {
    src: "/rive-files/philosophy/vision_mission_value_phone.riv",
    artboard: "main",
    stateMachine: "State Machine 1",
    viewModelScroll: {
      viewModelName: "ViewModel1",
      stateNumRanges: [
        { path: "number1", min: 0, max: 200 },
        { path: "number2", min: 0, max: 200 },
        { path: "number3", min: 0, max: 200 },
      ],
      scrollDistanceMultiplier: 2,
      min: 0,
      max: 600,
    },
  },
  ReuseFooterPhone: {
    src: "/rive-files/reuse/footer_phone.riv",
    artboard: "portrait",
    fit: "layout",
    stateMachine: "State Machine 1",
    viewModelScroll: {
      viewModelName: "FooterViewModel",
      stateNumPath: "scrollPos",
      min: 0,
      max: 150,
    },
  },
  ReuseLogo: {
    src: "/rive-files/reuse/logo.riv",
    artboard: "main",
    stateMachine: "state",
  },
  ServiceToBPC: {
    src: "/rive-files/services_to_b/service_to_b_pc.riv",
    artboard: "main",
    stateMachine: "State Machine 1",
    viewModelScroll: {
      viewModelName: "ViewModel2",
      stateNumPath: "stateNum",
      min: 0,
      max: 150,
    },
  },
  ServiceToBPhone: {
    src: "/rive-files/services_to_b/services_to_b_phone.riv",
    artboard: "main",
    stateMachine: "State Machine 1",
    viewModelScroll: {
      viewModelName: "ViewModel2",
      stateNumPath: "stateNum",
      min: 0,
      max: 150,
    },
  },
  ToBText: {
    src: "/rive-files/services_to_b/services_to_b_text.riv",
    artboard: "main",
    stateMachine: "State Machine 1",
    fit: "layout",
    viewModelScroll: {
      viewModelName: "ViewModel1",
      stateNumPath: "state",
      min: 0,
      max: 150,
    },
  },
  ToBInfinity: {
    src: "/rive-files/services_to_b/tob_infinity.riv",
    artboard: "main",
    stateMachine: "State Machine",
  },
  ToBPeopleAndWhiteLine1: {
    src: "/rive-files/services_to_b/tob_people_and_white_line_1.riv",
    artboard: "main",
    stateMachine: "stateMachine",
    fit: "layout",
  },
  ToBPeopleAndWhiteLine2: {
    src: "/rive-files/services_to_b/tob_people_and_white_line_2.riv",
    artboard: "main",
    stateMachine: "stateMachine",
    fit: "layout",
  },
  ServiceToCScenarioPC: {
    src: "/rive-files/services_to_c/serive_to_c_01_o2_03_pc.riv",
    artboard: "main",
    stateMachine: "State Machine 1",
    viewModelScroll: {
      viewModelName: "ViewModel1",
      stateNumRanges: [
        { path: "o1", min: 0, max: 200 },
        { path: "o2", min: 0, max: 200 },
        { path: "o3", min: 0, max: 200 },
      ],
      scrollDistanceMultiplier: 2,
      min: 0,
      max: 600,
    },
  },
  ServiceToCScenarioPhone: {
    src: "/rive-files/services_to_c/serive_to_c_01_o2_03_phone.riv",
    artboard: "main",
    stateMachine: "State Machine 1",
    viewModelScroll: {
      viewModelName: "ViewModel1",
      stateNumRanges: [
        { path: "o1", min: 0, max: 200 },
        { path: "o2", min: 0, max: 200 },
        { path: "o3", min: 0, max: 200 },
      ],
      scrollDistanceMultiplier: 2,
      min: 0,
      max: 600,
    },
  },
  ServicesToCPC: {
    src: "/rive-files/services_to_c/services_to_c_pc.riv",
    artboard: "main",
    stateMachine: "State Machine 1",
    viewModelScroll: {
      viewModelName: "ViewModel2",
      stateNumPath: "stateNum",
      min: 0,
      max: 150,
    },
  },
  ServicesToCPhone: {
    src: "/rive-files/services_to_c/services_to_c_phone.riv",
    artboard: "main",
    stateMachine: "State Machine 1",
    viewModelScroll: {
      viewModelName: "ViewModel2",
      stateNumPath: "stateNum",
      min: 0,
      max: 150,
    },
  },
  ToCText: {
    src: "/rive-files/services_to_c/toCtext.riv",
    artboard: "main",
    stateMachine: "State Machine 1",
    fit: "layout",
    viewModelScroll: {
      viewModelName: "ViewModel1",
      stateNumPath: "state",
      min: 0,
      max: 150,
    },
  },
  TopArrowIcon: {
    src: "/rive-files/top/arrow_icon.riv",
    artboard: "Box_Cursor",
    stateMachine: "Box_Cursor_SM",
    autoBind: true,
  },
  TopPhilosophy: {
    src: "/rive-files/top/philosophy_executive_member.riv",
    artboard: "PHILOSOPHY",
    stateMachine: "State Machine 1",
    fit: "contain",
    autoBind: true,
  },
  TopExecutive: {
    src: "/rive-files/top/philosophy_executive_member.riv",
    artboard: "EXECTIVE",
    stateMachine: "State Machine 1",
    fit: "contain",
    autoBind: true,
  },
  TopMember: {
    src: "/rive-files/top/philosophy_executive_member.riv",
    artboard: "MEMBER",
    stateMachine: "State Machine 1",
    fit: "contain",
    autoBind: true,
  },
} as const satisfies Record<string, RiveAssetConfig>;

export type RiveAssetKey = keyof typeof RIVE_ASSET_MAP;
