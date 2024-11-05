import { OnBoardingSendTrialConfirmationRequest } from './send-trial-confirmation-request/on-boarding-send-trial-confirmation-request.command';
import { OnBoardingRequestTrial } from './request-trial/on-boarding-request-trial.command';
import { OnBoarding } from './on-boarding';
import {
  CommandContext,
  commandHandler,
  CommandReturnType,
} from '@ebd-connect/cqrs-framework';
import { emailService } from '@my-project/infrastructure';

export class OnBoardingApplicationService {
  //commandHandlers
  //start OnBoardingSendTrialConfirmationRequest+
  @commandHandler({ name: 'OnBoardingSendTrialConfirmationRequest' })
  async onBoardingSendTrialConfirmationRequest(command: OnBoardingSendTrialConfirmationRequest, { eventSourcing }: CommandContext) {
    await eventSourcing.load(OnBoarding, command.onBoardingId, (eventStream) =>
      eventStream.sendTrialConfirmationRequest(command, emailService.send )
    );
  }
  //end OnBoardingSendTrialConfirmationRequest+

  //start OnBoardingRequestTrial+
  @commandHandler({ name: 'OnBoardingRequestTrial' })
  async onBoardingRequestTrial(command: OnBoardingRequestTrial, { eventSourcing }: CommandContext): CommandReturnType<OnBoardingRequestTrial> {
    const onBoardingId= command?.onBoardingId ? command?.onBoardingId : crypto.randomUUID();

    await eventSourcing.create(OnBoarding, onBoardingId, (eventStream) => eventStream.requestTrial(onBoardingId, command)
  );
  return { onBoardingId };
  }
  //end OnBoardingRequestTrial+
}
