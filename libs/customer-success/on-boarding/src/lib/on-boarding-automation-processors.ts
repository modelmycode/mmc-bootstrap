import { OnBoardingSendTrialConfirmationRequestProcessor } from './send-trial-confirmation-request/on-boarding-send-trial-confirmation-request-processor' 
import { Type } from '@ebd-connect/cqrs-framework';

export const onBoardingAutomationProcessors:Type[] = [
OnBoardingSendTrialConfirmationRequestProcessor, //
  //processors
]
