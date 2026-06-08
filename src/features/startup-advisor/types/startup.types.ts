export type StartupAdvisorInput = {
  idea: string;
  location: string;
  budget: string;
  targetUsers: string;
};

export type StartupAdvisorReport = {
  marketAnalysis: string;
  productStrategy: string;
  financialPlan: string;
  riskAnalysis: string;
  finalReport: string;
};

export type StartupAdvisorState = StartupAdvisorInput &
  Partial<StartupAdvisorReport>;

export type AdvisorApiResponse =
  | {
      success: true;
      data: StartupAdvisorReport;
    }
  | {
      success: false;
      error: string;
      issues?: Record<string, string[]>;
    };
