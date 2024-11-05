import { Event } from '@ebd-connect/cqrs-framework';

export class OnBoardingTrialConfirmationRequestFailed implements Event {
  constructor(
    public readonly onBoardingId : string,
    public readonly email : string,
    public readonly errorMessage: string,
  ) {}
}
