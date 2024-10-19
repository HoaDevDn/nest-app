import { UserJobRoleEnum } from '../enums/user-job-role.enum';
import { WorkerOnboardingStepEnum } from '../enums/worker-onboarding-step.enum';

export interface UserProfileMetadata {
  // define steps to create a user profile
  isUpdated?: boolean;
  userJobRole?: UserJobRoleEnum;
  workerOnboardingStep?: WorkerOnboardingStepEnum;
}
