import {
  OnBoardingRequestTrial,
  OnBoardingSendTrialConfirmationRequest,
  OnBoardingTrialConfirmationRequestFailed,
  OnBoardingTrialConfirmationRequestSent,
  OnBoardingTrialRequested,
} from '..';
import {
  AggregateRoot,
  eventSourcingHandler,
} from '@ebd-connect/cqrs-framework';

export class OnBoarding extends AggregateRoot {
  private onBoardingId!: string;
  private email!: string;
  private firstName!: string;
  private lastName!: string;
  private errorMessage!: string;
  //when
  //start OnBoardingSendTrialConfirmationRequest+

  public sendTrialConfirmationRequest(
    command: OnBoardingSendTrialConfirmationRequest,
    send: { ({ email }: { email: string }) }
  ) {
    const result = send({ email: command.email });
    if (!result.errorMessage) {
      this.apply(OnBoardingTrialConfirmationRequestSent, { ...command });
    } else {
      this.apply(OnBoardingTrialConfirmationRequestFailed, {
        ...command,
        errorMessage: result.errorMessage,
      });
    }
  }
  @eventSourcingHandler({ name: 'OnBoardingTrialConfirmationRequestSent' })
  onOnBoardingTrialConfirmationRequestSent(
    event: OnBoardingTrialConfirmationRequestSent
  ) {
    this.email = event.email;
  }
  @eventSourcingHandler({ name: 'OnBoardingTrialConfirmationRequestFailed' })
  onOnBoardingTrialConfirmationRequestFailed(
    event: OnBoardingTrialConfirmationRequestFailed
  ) {
    this.email = event.email;
    this.errorMessage = event.errorMessage;
  }
  //end OnBoardingSendTrialConfirmationRequest+

  //start OnBoardingRequestTrial+
  public requestTrial(onBoardingId: string, command: OnBoardingRequestTrial) {
    this.apply(OnBoardingTrialRequested, { ...command, onBoardingId });
  }
  @eventSourcingHandler({ name: 'OnBoardingTrialRequested' })
  onOnBoardingTrialRequested(event: OnBoardingTrialRequested) {
    this.onBoardingId = event.onBoardingId;
    this.email = event.email;
    this.firstName = event.firstName;
    this.lastName = event.lastName;
  }

  //end OnBoardingRequestTrial+

  //end when
}
